import type { AxiosResponse } from 'axios';
import axiosInstance from '../../axios.config';
import type { PaginatedResponse } from '@/types/common';
import { CreateOrderDto, ListOrdersParams, Order, OrderStatus } from '@/types/order';

const mapOrder = (item: Order & { tenant?: Order['tenant']; partner?: Order['partner'] }): Order => ({
  ...item,
  orderNumber: item.orderNo,
  totalAmount: item.items.reduce(
    (sum, row) => sum + Number(row.unitPrice) * row.quantity,
    0,
  ),
  items: item.items.map((row) => ({
    ...row,
    price: Number(row.unitPrice),
    product: row.product,
  })),
  tenant: item.tenant,
  partner: item.partner,
});

function buildListParams(params: ListOrdersParams): Record<string, string | number> {
  const query: Record<string, string | number> = {};
  if (params.page != null) query.page = params.page;
  if (params.limit != null) query.limit = params.limit;
  if (params.tenantId != null) query.tenantId = params.tenantId;
  if (params.partnerId) query.partnerId = params.partnerId;
  if (params.orderNo?.trim()) query.orderNo = params.orderNo.trim();
  return query;
}

export const orderService = {
  async getPaginated(params: ListOrdersParams = {}): Promise<PaginatedResponse<Order>> {
    const result = (await axiosInstance.get('/orders', {
      params: buildListParams(params),
    })) as unknown as PaginatedResponse<Order>;

    return {
      ...result,
      data: result.data.map(mapOrder),
    };
  },

  async exportCsv(params: Pick<ListOrdersParams, 'tenantId' | 'partnerId'> = {}): Promise<void> {
    const response = (await axiosInstance.get('/orders/export', {
      params: buildListParams(params),
      responseType: 'blob',
    })) as AxiosResponse<Blob>;

    const blob = response.data;
    const disposition = response.headers['content-disposition'] as string | undefined;
    const filenameMatch = disposition?.match(/filename="?([^";\n]+)"?/i);
    const filename = filenameMatch?.[1] ?? `orders-export-${Date.now()}.csv`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  async getById(id: string): Promise<Order> {
    const data = (await axiosInstance.get(`/orders/${id}`)) as unknown as Order;
    return mapOrder(data);
  },

  async create(data: CreateOrderDto): Promise<Order> {
    const payload = {
      tenantId: Number(data.tenantId),
      partnerId: data.partnerId,
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      items: data.items,
    };
    const created = (await axiosInstance.post('/orders', payload)) as unknown as Order;
    return mapOrder(created);
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const updated = (await axiosInstance.patch(`/orders/${id}/status`, {
      status,
    })) as unknown as Order;
    return mapOrder(updated);
  },
};

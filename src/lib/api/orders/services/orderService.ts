import axiosInstance from '../../axios.config';
import { CreateOrderDto, Order, OrderStatus } from '@/types/order';

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
  })),
  tenant: item.tenant,
  partner: item.partner,
});

export const orderService = {
  async getAll(): Promise<Order[]> {
    const data = (await axiosInstance.get('/orders')) as unknown as Order[];
    return data.map(mapOrder);
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

import axiosInstance from '../../axios.config';
import { CreateOrderDto, Order, OrderStatus } from '@/types/order';

const mapOrder = (item: Order): Order => ({
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
    const created = (await axiosInstance.post('/orders', data)) as unknown as Order;
    return mapOrder(created);
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const updated = (await axiosInstance.patch(`/orders/${id}/status`, {
      status,
    })) as unknown as Order;
    return mapOrder(updated);
  },
};

import axiosInstance from '../../axios.config';
import { Order, OrderStatus } from '@/types/order';

export const orderService = {
  async getAll(): Promise<Order[]> {
    const response = await axiosInstance.get('/orders');
    return response.data;
  },

  async getById(id: string): Promise<Order> {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = await axiosInstance.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

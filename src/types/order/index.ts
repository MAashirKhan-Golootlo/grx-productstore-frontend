import { Product } from '../product';
import { User } from '../auth';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

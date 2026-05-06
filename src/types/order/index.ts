import type { Product } from '../product';
import type { User } from '../auth';

export enum OrderStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  orderNo: string;
  orderNumber: string;
  tenantId: string;
  partnerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  user?: User;
  shippingAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  tenantId: string;
  partnerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

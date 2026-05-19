import type { Product } from '../product';
import type { User } from '../auth';
import type { Tenant } from '../tenant';
import type { Partner } from '../partner';

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
  tenantId: number;
  partnerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  user?: User;
  shippingAddress?: string;
  customerId?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
  tenant?: Tenant;
  partner?: Partner;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  tenantId: string;
  partnerId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface ListOrdersParams {
  page?: number;
  limit?: number;
  tenantId?: number;
  partnerId?: string;
  orderNo?: string;
}

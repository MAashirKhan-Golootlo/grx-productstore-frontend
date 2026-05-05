import * as yup from 'yup';
import { OrderStatus } from '@/types/order';

export const orderStatusSchema = yup.object().shape({
  status: yup
    .mixed<OrderStatus>()
    .oneOf(Object.values(OrderStatus))
    .required('Status is required'),
});

export const orderSchema = yup.object().shape({
  shippingAddress: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .required('Shipping address is required'),
  // Items validation would typically be handled in a cart/checkout flow
});

export type OrderStatusFormData = yup.InferType<typeof orderStatusSchema>;
export type OrderFormData = yup.InferType<typeof orderSchema>;

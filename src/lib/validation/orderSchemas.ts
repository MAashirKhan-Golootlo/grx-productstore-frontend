import * as yup from 'yup';
import { OrderStatus } from '@/types/order';

export const orderStatusSchema = yup.object().shape({
  status: yup
    .mixed<OrderStatus>()
    .oneOf(Object.values(OrderStatus))
    .required('Status is required'),
});

export const orderItemSchema = yup.object().shape({
  productId: yup.string().required('Product is required'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .required('Quantity is required'),
  unitPrice: yup
    .number()
    .typeError('Unit price must be a number')
    .min(0, 'Unit price cannot be negative')
    .required('Unit price is required'),
});

export const orderSchema = yup.object().shape({
  tenantId: yup.string().required('Tenant ID is required'),
  partnerId: yup.string().required('Partner ID is required'),
  items: yup
    .array()
    .of(orderItemSchema)
    .min(1, 'At least one item is required')
    .required('Items are required'),
});

export type OrderStatusFormData = yup.InferType<typeof orderStatusSchema>;
export type OrderFormData = yup.InferType<typeof orderSchema>;

import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .required('Name is required'),
  sku: yup
    .string()
    .min(3, 'SKU must be at least 3 characters')
    .required('SKU is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  currency: yup
    .string()
    .length(3, 'Currency must be a 3-letter code')
    .uppercase('Currency must be uppercase')
    .required('Currency is required'),
  categoryId: yup.string().required('Category is required'),
  description: yup.string().max(500, 'Description must be at most 500 characters').optional(),
});

export type ProductFormData = yup.InferType<typeof productSchema>;

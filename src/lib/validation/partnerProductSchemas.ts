import * as yup from 'yup';

export const partnerProductSchema = yup.object().shape({
  partnerId: yup.string().required('Partner is required'),
  productId: yup.string().required('Product is required'),
  tenantId: yup.string().optional(),
  allocatedStock: yup
    .number()
    .typeError('Allocated stock must be a number')
    .min(0, 'Allocated stock cannot be negative')
    .required('Allocated stock is required'),
  partnerPrice: yup
    .number()
    .typeError('Partner price must be a number')
    .min(0, 'Partner price cannot be negative')
    .required('Partner price is required'),
  currency: yup
    .string()
    .length(3, 'Currency must be a 3-letter code')
    .uppercase('Currency must be uppercase')
    .required('Currency is required'),
});

export type PartnerProductFormData = yup.InferType<typeof partnerProductSchema>;

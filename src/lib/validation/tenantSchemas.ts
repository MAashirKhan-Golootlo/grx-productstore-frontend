import * as yup from 'yup';

export const tenantSchema = yup.object().shape({
  code: yup
    .string()
    .min(2, 'Code must be at least 2 characters')
    .required('Code is required'),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
});

export type TenantFormData = yup.InferType<typeof tenantSchema>;

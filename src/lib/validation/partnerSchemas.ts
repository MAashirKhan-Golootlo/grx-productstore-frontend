import * as yup from 'yup';

export const partnerSchema = yup.object().shape({
  code: yup
    .string()
    .min(2, 'Code must be at least 2 characters')
    .required('Code is required'),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  contactEmail: yup
    .string()
    .email('Invalid email address')
    .required('Contact email is required'),
});

export type PartnerFormData = yup.InferType<typeof partnerSchema>;

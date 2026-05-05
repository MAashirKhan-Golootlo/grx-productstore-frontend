import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  slug: yup
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .matches(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens')
    .required('Slug is required'),
  description: yup
    .string()
    .max(200, 'Description must be at most 200 characters')
    .default(''),
  isActive: yup.boolean().required().default(true),
});

export type CategoryFormData = yup.InferType<typeof categorySchema>;

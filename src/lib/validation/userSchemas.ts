import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .when('$isEdit', {
      is: false,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.optional(),
    }),
  isActive: yup.boolean().default(true),
});

export type UserFormData = yup.InferType<typeof userSchema>;

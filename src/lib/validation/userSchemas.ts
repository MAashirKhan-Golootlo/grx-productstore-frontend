import * as yup from 'yup';
import { UserRole } from '@/types/user';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .required('Role is required'),
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

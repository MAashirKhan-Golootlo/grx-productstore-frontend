import type { User } from '../auth';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER',
}

export interface ManagedUser extends User {
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface CreateUserDto {
  email: string;
  fullName?: string;
  name?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateUserDto {
  email?: string;
  fullName?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

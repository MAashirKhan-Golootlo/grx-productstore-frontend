import type { User } from '../auth';

export interface ManagedUser extends User {
  name?: string;
  isActive?: boolean;
}

export interface CreateUserDto {
  email: string;
  fullName?: string;
  name?: string;
  password?: string;
  isActive?: boolean;
}

export interface UpdateUserDto {
  email?: string;
  fullName?: string;
  name?: string;
  isActive?: boolean;
}

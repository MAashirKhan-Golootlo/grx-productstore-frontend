import { User } from '../auth';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER',
}

export interface ManagedUser extends User {
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  isActive?: boolean;
}

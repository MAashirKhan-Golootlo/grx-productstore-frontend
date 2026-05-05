import axiosInstance from '../../axios.config';
import type { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    const response = await axiosInstance.post('/auth/register', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};


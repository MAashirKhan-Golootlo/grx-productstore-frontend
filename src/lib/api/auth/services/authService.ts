import axiosInstance from '../../axios.config';
import type { AuthTokenResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { API_ENDPOINTS } from '@/constants';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokenResponse> {
    return (await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials)) as unknown as AuthTokenResponse;
  },

  async register(credentials: RegisterCredentials): Promise<AuthTokenResponse> {
    return (await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, credentials)) as unknown as AuthTokenResponse;
  },
};


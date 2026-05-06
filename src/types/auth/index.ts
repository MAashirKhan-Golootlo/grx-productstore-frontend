export type RecordStatus = 'active' | 'inactive';

export interface User {
  id: string;
  email: string;
  fullName: string;
  name?: string;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthTokenResponse {
  accessToken: string;
}

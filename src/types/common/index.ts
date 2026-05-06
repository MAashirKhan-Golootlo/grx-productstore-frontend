// Common types used across the application
export interface ApiResponse<T> {
  success: boolean;
  path: string;
  timestamp: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


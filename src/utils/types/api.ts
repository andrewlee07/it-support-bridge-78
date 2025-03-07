
// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  statusCode: number;
  data?: T;
}

// PaginatedResponse
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

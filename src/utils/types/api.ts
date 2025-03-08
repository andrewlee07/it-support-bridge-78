
// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
  status?: number; // Add this for backward compatibility
  data?: T;
}

// PaginatedResponse
export interface PaginatedResponse<T> {
  items: T[];
  data?: T[]; // Add this for backward compatibility
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

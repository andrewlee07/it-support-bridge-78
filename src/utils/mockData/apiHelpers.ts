
import { ApiResponse, PaginatedResponse } from '../types';

// Simulate API responses with optional status code
export const simulateApiResponse = <T>(data: T, error?: string, statusCode: number = 200): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (error) {
        resolve({
          success: false,
          error,
          message: error,
          statusCode: statusCode || 400 // Default to 400 for errors
        });
      } else {
        resolve({
          success: true,
          data,
          message: 'Operation successful',
          statusCode: statusCode
        });
      }
    }, 500);
  });
};

// Simulate paginated API responses
export const simulatePaginatedResponse = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedItems = items.slice(startIndex, endIndex);
      const total = items.length;
      
      resolve({
        items: paginatedItems,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }, 500);
  });
};

// Add the missing delay function
export const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

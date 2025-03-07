
import { ApiResponse, PaginatedResponse } from '../types';

// Simulate API responses
export const simulateApiResponse = <T>(data: T, delay: number = 500): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        message: 'Operation successful'
      });
    }, delay);
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

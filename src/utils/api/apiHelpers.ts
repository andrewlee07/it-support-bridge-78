
import { ApiResponse } from '../types';

// Helper to create a consistent API success response
export function createApiSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null
  };
}

// Helper to create a consistent API error response
export function createApiErrorResponse<T>(message: string, code: number = 500): ApiResponse<T> {
  return {
    success: false,
    data: null,
    error: {
      message,
      code
    }
  };
}

// Function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

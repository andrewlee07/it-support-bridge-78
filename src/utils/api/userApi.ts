
import { User, ApiResponse, PaginatedResponse } from '../types';
import { mockUsers, getUserById, simulateApiResponse, simulatePaginatedResponse } from '../mockData';

// User API
export const userApi = {
  // Get all users with optional pagination
  getUsers: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<User>> => {
    return simulatePaginatedResponse(mockUsers, page, limit);
  },
  
  // Get a specific user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const user = getUserById(id);
    
    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }
    
    return simulateApiResponse(user);
  },
};

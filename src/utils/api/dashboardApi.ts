
import { ApiResponse } from '../types';
import { getDashboardStats, simulateApiResponse } from '../mockData';

// Dashboard API
export const dashboardApi = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    const stats = getDashboardStats();
    return simulateApiResponse(stats);
  },
};

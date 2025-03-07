
import { SLA, ApiResponse } from '../types';
import { mockSLAs, simulateApiResponse } from '../mockData';

// SLA API
export const slaApi = {
  // Get all SLAs
  getSLAs: async (): Promise<ApiResponse<SLA[]>> => {
    return simulateApiResponse(mockSLAs);
  },
};

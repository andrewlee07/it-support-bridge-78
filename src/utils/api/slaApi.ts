import { SLA, ApiResponse } from '../types';
import { mockSLAs, simulateApiResponse } from '../mockData';

// SLA API
export const slaApi = {
  // Get all SLAs
  getAllSLAs: async (): Promise<ApiResponse<SLA[]>> => {
    return simulateApiResponse(mockSLAs);
  },
  
  // Get a single SLA by ID
  getSLA: async (id: string): Promise<ApiResponse<SLA | null>> => {
    const sla = mockSLAs.find(s => s.id === id);
    return simulateApiResponse(sla || null);
  },
  
  // Create a new SLA
  createSLA: async (data: Omit<SLA, 'id'>): Promise<ApiResponse<SLA>> => {
    const newSLA: SLA = {
      id: `sla-${Date.now()}`,
      ...data
    };
    return simulateApiResponse(newSLA);
  },
  
  // Update an existing SLA
  updateSLA: async (id: string, data: Partial<SLA>): Promise<ApiResponse<SLA>> => {
    const slaIndex = mockSLAs.findIndex(s => s.id === id);
    if (slaIndex === -1) {
      return {
        success: false,
        message: "SLA not found",
        statusCode: 404,
        error: "Not found"
      };
    }
    
    const updatedSLA: SLA = {
      ...mockSLAs[slaIndex],
      ...data
    };
    
    return simulateApiResponse(updatedSLA);
  },
  
  // Legacy method - keeping for backward compatibility
  getSLAs: async (): Promise<ApiResponse<SLA[]>> => {
    return simulateApiResponse(mockSLAs);
  }
};

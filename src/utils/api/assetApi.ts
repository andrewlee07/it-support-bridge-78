
import { Asset, ApiResponse, PaginatedResponse } from '../types';
import { mockAssets, getAssetById, simulateApiResponse, simulatePaginatedResponse } from '../mockData';

// Asset API
export const assetApi = {
  // Get all assets with optional pagination
  getAssets: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Asset>> => {
    return simulatePaginatedResponse(mockAssets, page, limit);
  },
  
  // Get a specific asset by ID
  getAssetById: async (id: string): Promise<ApiResponse<Asset>> => {
    const asset = getAssetById(id);
    
    if (!asset) {
      return {
        success: false,
        error: 'Asset not found',
      };
    }
    
    return simulateApiResponse(asset);
  },
};

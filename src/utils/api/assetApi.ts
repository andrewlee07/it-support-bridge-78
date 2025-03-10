
import { Asset, ApiResponse } from '../types';
import { mockAssets, generateAssetId } from '../mockData';
import { createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';

const assetApi = {
  getAssets: async (): Promise<ApiResponse<Asset[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return createApiSuccessResponse(mockAssets as Asset[]);
  },

  getAssetById: async (id: string): Promise<ApiResponse<Asset | null>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const asset = mockAssets.find(asset => asset.id === id);
    if (!asset) {
      return createApiErrorResponse<Asset | null>('Asset not found', 404);
    }
    return createApiSuccessResponse(asset as Asset);
  },

  createAsset: async (asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt' | 'audit'>): Promise<ApiResponse<Asset>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const now = new Date();
    const newAsset: Asset = {
      id: generateAssetId(),
      ...asset,
      createdAt: now,
      updatedAt: now,
      audit: []
    };
    mockAssets.push(newAsset as any);
    return createApiSuccessResponse(newAsset);
  },

  updateAsset: async (id: string, updates: Partial<Asset>): Promise<ApiResponse<Asset | null>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAssets.findIndex(asset => asset.id === id);
    if (index === -1) {
      return createApiErrorResponse<Asset | null>('Asset not found', 404);
    }
    
    const updatedAsset = {
      ...mockAssets[index],
      ...updates,
      updatedAt: new Date()
    } as Asset;
    
    mockAssets[index] = updatedAsset as any;
    return createApiSuccessResponse(updatedAsset);
  },

  deleteAsset: async (id: string): Promise<ApiResponse<boolean>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAssets.findIndex(asset => asset.id === id);
    if (index === -1) {
      return createApiErrorResponse<boolean>('Asset not found', 404);
    }
    mockAssets.splice(index, 1);
    return createApiSuccessResponse(true);
  }
};

export default assetApi;

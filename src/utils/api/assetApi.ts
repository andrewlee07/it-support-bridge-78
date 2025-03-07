import { Asset, ApiResponse } from '../types';
import { mockAssets, generateAssetId, delay } from '../mockData';
import { createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';

const assetApi = {
  getAssets: async (): Promise<ApiResponse<Asset[]>> => {
    await delay(500);
    return createApiSuccessResponse(mockAssets);
  },

  getAssetById: async (id: string): Promise<ApiResponse<Asset | null>> => {
    await delay(500);
    const asset = mockAssets.find(asset => asset.id === id);
    if (!asset) {
      return createApiErrorResponse<Asset | null>('Asset not found', 404);
    }
    return createApiSuccessResponse(asset);
  },

  createAsset: async (asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt' | 'audit'>): Promise<ApiResponse<Asset>> => {
    await delay(500);
    const newAsset: Asset = {
      id: generateAssetId(),
      ...asset,
      createdAt: new Date(),
      updatedAt: new Date(),
      audit: []
    };
    mockAssets.push(newAsset);
    return createApiSuccessResponse(newAsset);
  },

  updateAsset: async (id: string, updates: Partial<Asset>): Promise<ApiResponse<Asset | null>> => {
    await delay(500);
    const index = mockAssets.findIndex(asset => asset.id === id);
    if (index === -1) {
      return createApiErrorResponse<Asset | null>('Asset not found', 404);
    }
    mockAssets[index] = { ...mockAssets[index], ...updates, updatedAt: new Date() };
    return createApiSuccessResponse(mockAssets[index]);
  },

  deleteAsset: async (id: string): Promise<ApiResponse<boolean>> => {
    await delay(500);
    const index = mockAssets.findIndex(asset => asset.id === id);
    if (index === -1) {
      return createApiErrorResponse<boolean>('Asset not found', 404);
    }
    mockAssets.splice(index, 1);
    return createApiSuccessResponse(true);
  }
};

export default assetApi;

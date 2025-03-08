
import { StatusSynchronizationSettings, defaultStatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { delay } from '@/utils/mockData/apiHelpers';
import { ApiResponse } from '@/utils/types/api';
import { toast } from 'sonner';

// Mock storage - in a real app this would be API calls
let syncSettings: StatusSynchronizationSettings = { ...defaultStatusSynchronizationSettings };

// Get current settings
export const getStatusSynchronizationSettings = async (): Promise<ApiResponse<StatusSynchronizationSettings>> => {
  await delay(300);
  return {
    success: true,
    data: syncSettings,
    status: 200,
    statusCode: 200
  };
};

// Update settings
export const updateStatusSynchronizationSettings = async (
  settings: StatusSynchronizationSettings
): Promise<ApiResponse<StatusSynchronizationSettings>> => {
  await delay(500);
  
  // Update settings
  syncSettings = {
    ...settings
  };
  
  return {
    success: true,
    data: syncSettings,
    status: 200,
    statusCode: 200
  };
};

// Apply status synchronization when a release status changes
export const synchronizeReleaseStatus = async (
  releaseId: string, 
  newStatus: string
): Promise<ApiResponse<{ updatedItems: number }>> => {
  await delay(500);
  
  // Get current settings
  if (!syncSettings.enableCascadingUpdates) {
    return {
      success: true,
      data: { updatedItems: 0 },
      status: 200,
      statusCode: 200
    };
  }
  
  // In a real app, this would update all linked items in the database
  // For this mock version, we'll just return a success response
  // but reference the backlogApi in the implementation
  const { backlogItems } = await import('@/utils/mockData/backlog/backlogItems');
  
  const updatedCount = backlogItems.filter(item => item.releaseId === releaseId).length;
  
  if (updatedCount > 0 && syncSettings.notifyOnStatusChange) {
    toast.info(`${updatedCount} items updated due to release status change`);
  }
  
  return {
    success: true,
    data: { updatedItems: updatedCount },
    status: 200,
    statusCode: 200
  };
};

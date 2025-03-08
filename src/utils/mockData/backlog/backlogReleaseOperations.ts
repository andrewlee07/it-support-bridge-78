
import { BacklogItem } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';

// Assign a backlog item to a release
export const assignToRelease = (
  itemId: string,
  releaseId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].releaseId = releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

// Remove a backlog item from a release
export const removeFromRelease = (itemId: string): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  delete backlogItems[itemIndex].releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

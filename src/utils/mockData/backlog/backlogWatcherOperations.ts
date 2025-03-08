
import { BacklogItem } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';

// Add a watcher to a backlog item
export const addWatcher = (
  itemId: string,
  userId: string
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
  
  if (!backlogItems[itemIndex].watchers) {
    backlogItems[itemIndex].watchers = [];
  }
  
  if (!backlogItems[itemIndex].watchers?.includes(userId)) {
    backlogItems[itemIndex].watchers!.push(userId);
  }
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

// Remove a watcher from a backlog item
export const removeWatcher = (
  itemId: string,
  userId: string
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
  
  backlogItems[itemIndex].watchers = backlogItems[itemIndex].watchers?.filter(
    watcher => watcher !== userId
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

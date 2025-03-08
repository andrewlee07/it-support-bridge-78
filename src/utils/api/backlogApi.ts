
import { 
  backlogItems,
  fetchBacklogItems, 
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats,
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher,
  deleteBacklogItem
} from '../mockData/backlog';

import { BacklogItem, BacklogItemStatus, BacklogStats } from '../types/backlogTypes';
import { ApiResponse } from '../types';

// Function to get backlog items by release ID
const getBacklogItemsByReleaseId = (releaseId: string): ApiResponse<BacklogItem[]> => {
  const items = backlogItems.filter(item => item.releaseId === releaseId);
  return {
    success: true,
    data: items,
    status: 200,
    statusCode: 200
  };
};

// Re-export all functionality
export {
  // Core data
  backlogItems,
  
  // Core operations
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats,
  getBacklogItemsByReleaseId,
  deleteBacklogItem,
  
  // Enhanced feature operations
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

// Create a default export with all functions
export default {
  backlogItems,
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats,
  getBacklogItemsByReleaseId,
  deleteBacklogItem,
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

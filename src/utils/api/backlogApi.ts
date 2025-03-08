
import { 
  backlogItems,
  fetchBacklogItems, 
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats,
  getBacklogItemsByReleaseId,
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
  getBacklogItemsByReleaseId, // Export this function
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
  getBacklogItemsByReleaseId, // Add to default export
  deleteBacklogItem,
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

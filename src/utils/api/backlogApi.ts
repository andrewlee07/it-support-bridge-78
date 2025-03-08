
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
  removeWatcher
} from '../mockData/backlog';

import { BacklogItem, BacklogItemStatus, BacklogStats } from '../types/backlogTypes';
import { ApiResponse } from '../types';

// Re-export all functionality
export {
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
  removeWatcher
};

// Create a default export with all functions
export default {
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
  removeWatcher
};

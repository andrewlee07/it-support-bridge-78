
import { 
  fetchBacklogItems, 
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
} from '../mockData/backlogItems';

import { BacklogItem, BacklogItemStatus, BacklogStats } from '../types/backlogTypes';
import { ApiResponse } from '../types';

// Re-export all functionality
export {
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
};

// Create a default export with all functions
export default {
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
};

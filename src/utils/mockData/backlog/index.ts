
// Re-export all backlog-related mock data functions and constants
import { backlogItems, generateBacklogItemId } from './backlogItems';
import {
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
} from './backlogOperations';
import {
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
} from './enhancedFeatures';

// Export all functionality
export {
  // Core data
  backlogItems,
  generateBacklogItemId,
  
  // Core operations
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats,
  
  // Enhanced feature operations
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

// Default export
export default {
  backlogItems,
  generateBacklogItemId,
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

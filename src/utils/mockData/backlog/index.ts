
// Re-export all backlog-related mock data functions and constants
import { backlogItems, generateBacklogItemId } from './backlogItems';

// Import from core operations
import {
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  getBacklogItemsByReleaseId,
  getBacklogStats,
  deleteBacklogItem
} from './backlogCoreOperations';

// Import from release operations
import {
  assignToRelease,
  removeFromRelease
} from './backlogReleaseOperations';

// Import from attachment operations
import {
  addAttachment,
  removeAttachment
} from './backlogAttachmentOperations';

// Import from comment operations
import {
  addComment,
  updateComment,
  deleteComment
} from './backlogCommentOperations';

// Import from watcher operations
import {
  addWatcher,
  removeWatcher
} from './backlogWatcherOperations';

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

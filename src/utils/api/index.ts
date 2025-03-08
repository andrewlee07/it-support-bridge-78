
// Import and re-export all API functionality from separate modules
import * as releaseApi from './releaseApi';
import * as ticketApi from './ticketApi';
import * as userApi from './userApi';

// Re-export namespaces
export { releaseApi, ticketApi, userApi };

// Import backlog API with explicit named imports to avoid conflicts
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
  deleteBacklogItem,
  addAttachment,
  removeAttachment,
  addComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
} from './backlogApi';

// Re-export backlog functions with renamed comment function to avoid conflicts
export {
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
  addComment as addBacklogComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

// For backward compatibility
export default {
  release: releaseApi,
  ticket: ticketApi,
  user: userApi,
  backlog: {
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
  }
};

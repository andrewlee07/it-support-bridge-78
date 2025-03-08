
// Import and re-export all API functionality from separate modules
import * as releaseApi from './releaseApi';
import * as testApi from './testApi';
import * as ticketApi from './ticketApi';
import * as userApi from './userApi';
import * as configApi from './configApi';
import * as searchApi from './searchApi';
import * as testIntegration from './test-integration';

// Re-export namespaces
export { releaseApi, testApi, ticketApi, userApi, configApi, searchApi, testIntegration };

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
  addComment as addBacklogComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
} from './backlogApi';

// Re-export backlog functions with renamed comment function
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
  addBacklogComment,
  updateComment,
  deleteComment,
  addWatcher,
  removeWatcher
};

// For backward compatibility
export default {
  release: releaseApi,
  test: testApi,
  ticket: ticketApi,
  user: userApi,
  config: configApi,
  search: searchApi,
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
    addComment: addBacklogComment,
    updateComment,
    deleteComment,
    addWatcher,
    removeWatcher
  }
};


import { Release, ReleaseStatus, ReleaseItem, ApiResponse } from './types';

// Import functionality from separate modules
import { 
  getReleases, 
  getReleaseById, 
  getReleaseMetrics,
  mockReleases as queryMockReleases 
} from './releaseQueries';

import { 
  createRelease, 
  updateRelease, 
  updateReleaseStatus, 
  updateReleaseApproval,
  mockReleases as mutationMockReleases
} from './releaseMutations';

import { 
  addItemToRelease, 
  removeItemFromRelease,
  mockReleases as itemMockReleases
} from './releaseItemOperations';

// Export all functionality
export {
  getReleases,
  getReleaseById,
  createRelease,
  updateRelease,
  updateReleaseStatus,
  updateReleaseApproval,
  addItemToRelease,
  removeItemFromRelease,
  getReleaseMetrics,
};

// Export default object with all functions
export default {
  getReleases,
  getReleaseById,
  createRelease,
  updateRelease,
  updateReleaseStatus,
  updateReleaseApproval,
  addItemToRelease,
  removeItemFromRelease,
  getReleaseMetrics
};

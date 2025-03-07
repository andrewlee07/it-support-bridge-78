
import { Release, ReleaseStatus, ReleaseItem, ApiResponse } from '@/utils/types';

// Import functionality from separate modules
import { 
  getReleases, 
  getReleaseById, 
  getReleaseMetrics,
  mockReleases
} from './releaseQueries';

import { 
  createRelease, 
  updateRelease, 
  updateReleaseStatus, 
  updateReleaseApproval
} from './releaseMutations';

import { 
  addItemToRelease, 
  removeItemFromRelease
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
  mockReleases
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

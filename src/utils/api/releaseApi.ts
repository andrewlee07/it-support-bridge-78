
// This file now serves as a re-export to maintain backward compatibility
// Import from the new modular structure and re-export everything
import {
  getReleases,
  getReleaseById,
  createRelease,
  updateRelease,
  updateReleaseStatus,
  updateReleaseApproval,
  addItemToRelease,
  removeItemFromRelease,
  getReleaseMetrics,
} from './release';

// Re-export all functionality
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

// Default export
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

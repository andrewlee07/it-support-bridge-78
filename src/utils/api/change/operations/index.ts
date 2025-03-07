
import { createChangeRequest } from './createChangeRequest';
import { getChangeRequests } from './getChangeRequests';
import { getChangeRequestById } from './getChangeRequestById';
import { updateChangeRequest } from './updateChangeRequest';

// Export the organized change request API
export const changeRequestApi = {
  createChangeRequest,
  getChangeRequests,
  getChangeRequestById,
  updateChangeRequest
};

// Export individual functions for direct usage
export {
  createChangeRequest,
  getChangeRequests,
  getChangeRequestById,
  updateChangeRequest
};

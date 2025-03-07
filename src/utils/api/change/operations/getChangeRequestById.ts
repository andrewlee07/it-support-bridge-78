
import { 
  ChangeRequest, 
  ApiResponse 
} from '../../../types';
import { simulateApiResponse, createApiErrorResponse } from '../../../mockData/apiHelpers';
import { getChangeRequests } from '../store';

// Get a specific change request by ID
export const getChangeRequestById = async (id: string): Promise<ApiResponse<ChangeRequest>> => {
  // Handle partial ID search
  let change: ChangeRequest | undefined;
  
  if (id.startsWith('CHG')) {
    // Exact ID search
    change = getChangeRequests().find(c => c.id === id);
  } else {
    // Partial ID search - look for any change that contains this ID segment
    change = getChangeRequests().find(c => c.id.toLowerCase().includes(id.toLowerCase()));
  }
  
  if (!change) {
    return createApiErrorResponse('Change request not found', 404);
  }
  
  return simulateApiResponse(change);
};

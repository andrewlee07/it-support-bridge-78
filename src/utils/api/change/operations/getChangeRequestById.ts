
import { 
  ChangeRequest, 
  ApiResponse 
} from '../../../types';
import { simulateApiResponse, createApiErrorResponse } from '../../../mockData/apiHelpers';
import { getChangeRequests } from '../store';

// Get a specific change request by ID
export const getChangeRequestById = async (id: string): Promise<ApiResponse<ChangeRequest>> => {
  if (!id) {
    return createApiErrorResponse('Change request ID is required', 400);
  }

  try {
    // Get all change requests from the store
    const allChanges = getChangeRequests();
    
    // Handle exact ID search
    if (id.startsWith('CHG')) {
      const change = allChanges.find(c => c.id === id);
      if (change) {
        return simulateApiResponse(change);
      }
    } 
    
    // Handle partial ID search as fallback (case insensitive)
    const change = allChanges.find(c => 
      c.id.toLowerCase().includes(id.toLowerCase())
    );
    
    if (change) {
      return simulateApiResponse(change);
    }
    
    return createApiErrorResponse('Change request not found', 404);
  } catch (error) {
    console.error('Error retrieving change request:', error);
    return createApiErrorResponse('Error retrieving change request', 500);
  }
};

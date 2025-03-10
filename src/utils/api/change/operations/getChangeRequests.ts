
import { 
  ChangeRequest, 
  ChangeStatus, 
  PaginatedResponse
} from '../../../types';
import { simulatePaginatedResponse } from '../../../mockData/apiHelpers';
import { getChangeRequests as getChangeRequestsFromStore } from '../store';

// Get all change requests with optional pagination
export const getChangeRequests = async (
  page: number = 1,
  limit: number = 10,
  filters?: {
    status?: ChangeStatus[];
    createdBy?: string;
    fromDate?: Date;
    toDate?: Date;
    search?: string;
    assignedToUserId?: string; // Adding this parameter to support the hook
  }
): Promise<PaginatedResponse<ChangeRequest>> => {
  let filteredChanges = [...getChangeRequestsFromStore()];
  
  // Apply filters
  if (filters) {
    if (filters.status && filters.status.length > 0) {
      filteredChanges = filteredChanges.filter(c => filters.status!.includes(c.status));
    }
    
    if (filters.createdBy) {
      filteredChanges = filteredChanges.filter(c => c.createdBy === filters.createdBy);
    }
    
    if (filters.assignedToUserId) {
      // Filter by assigned user if provided
      filteredChanges = filteredChanges.filter(c => c.implementor === filters.assignedToUserId);
    }
    
    if (filters.fromDate) {
      filteredChanges = filteredChanges.filter(c => new Date(c.createdAt) >= new Date(filters.fromDate!));
    }
    
    if (filters.toDate) {
      filteredChanges = filteredChanges.filter(c => new Date(c.createdAt) <= new Date(filters.toDate!));
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredChanges = filteredChanges.filter(c => 
        c.title.toLowerCase().includes(searchLower) || 
        c.description.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower) // This enables partial ID search
      );
    }
  }
  
  // Sort by created date (newest first)
  filteredChanges.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return simulatePaginatedResponse(filteredChanges, page, limit);
};


import { v4 as uuidv4 } from 'uuid';
import { 
  ChangeRequest, 
  ChangeStatus,
  ApiResponse, 
  PaginatedResponse
} from '../../types';
import { simulateApiResponse, simulatePaginatedResponse } from '../../mockData/apiHelpers';
import { addAuditEntry } from '../../auditUtils';
import { getUserById } from '../../mockData';
import { 
  getChangeRequests, 
  setChangeRequests, 
  updateChangeRequest,
  generateChangeId
} from './store';

// Change request operations
export const changeRequestApi = {
  // Get all change requests with optional pagination
  getChangeRequests: async (
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: ChangeStatus[];
      createdBy?: string;
      fromDate?: Date;
      toDate?: Date;
      search?: string;
    }
  ): Promise<PaginatedResponse<ChangeRequest>> => {
    let filteredChanges = [...getChangeRequests()];
    
    // Apply filters
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filteredChanges = filteredChanges.filter(c => filters.status!.includes(c.status));
      }
      
      if (filters.createdBy) {
        filteredChanges = filteredChanges.filter(c => c.createdBy === filters.createdBy);
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
  },
  
  // Get a specific change request by ID
  getChangeRequestById: async (id: string): Promise<ApiResponse<ChangeRequest>> => {
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
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    return simulateApiResponse(change);
  },
  
  // Create a new change request
  createChangeRequest: async (
    data: {
      title: string;
      description: string;
      category: string;
      priority: string;
      changeCategory?: string;
      startDate: Date;
      endDate: Date;
      implementationPlan: string;
      rollbackPlan: string;
      approverRoles?: string[];
      createdBy: string;
    }
  ): Promise<ApiResponse<ChangeRequest>> => {
    const newId = generateChangeId();
    const now = new Date();
    
    const newChangeRequest: ChangeRequest = {
      id: newId,
      title: data.title,
      description: data.description,
      status: 'draft',
      priority: data.priority as any,
      category: data.changeCategory as any, // Using the changeCategory field for ChangeRequest.category
      type: 'change',
      createdBy: data.createdBy,
      createdAt: now,
      updatedAt: now,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      riskScore: 0,
      riskLevel: 'low',
      assessmentAnswers: [],
      implementationPlan: data.implementationPlan,
      rollbackPlan: data.rollbackPlan,
      approverRoles: data.approverRoles as any[] || ['it'],
      audit: [
        {
          id: uuidv4(),
          entityId: newId,
          entityType: 'change',
          message: 'Change request created',
          performedBy: data.createdBy,
          timestamp: now
        }
      ]
    };
    
    const currentChangeRequests = getChangeRequests();
    const updatedChangeRequests = [...currentChangeRequests, newChangeRequest];
    setChangeRequests(updatedChangeRequests);
    
    return simulateApiResponse(newChangeRequest);
  },
  
  // Update an existing change request
  updateChangeRequest: async (
    id: string,
    data: Partial<ChangeRequest>,
    userId: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeRequests = getChangeRequests();
    
    // Handle partial ID search for update
    let changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1 && !id.startsWith('CHG')) {
      // Try partial match if exact match fails and it's not already a full ID
      changeIndex = changeRequests.findIndex(c => 
        c.id.toLowerCase().includes(id.toLowerCase())
      );
    }
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    const now = new Date();
    
    // Create audit entry for the update
    let auditMessage = 'Change request updated';
    
    // Special handling for status changes
    if (data.status && data.status !== existingChange.status) {
      auditMessage = `Status changed from ${existingChange.status} to ${data.status}`;
      
      // If approving, set approvedBy and approvedAt
      if (data.status === 'approved' && existingChange.status === 'submitted') {
        data.approvedBy = userId;
        data.approvedAt = now;
      }
    }
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      auditMessage,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      ...data,
      updatedAt: now,
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
};

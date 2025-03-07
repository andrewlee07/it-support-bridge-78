
import { 
  ChangeRequest, 
  ApiResponse 
} from '../../../types';
import { simulateApiResponse, createApiErrorResponse } from '../../../mockData/apiHelpers';
import { addAuditEntry } from '../../../auditUtils';
import { getChangeRequests, updateChangeRequest as updateChangeRequestInStore } from '../store';

// Update an existing change request
export const updateChangeRequest = async (
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
    return createApiErrorResponse('Change request not found', 404);
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
  
  updateChangeRequestInStore(changeIndex, updatedChange);
  
  return simulateApiResponse(updatedChange);
};

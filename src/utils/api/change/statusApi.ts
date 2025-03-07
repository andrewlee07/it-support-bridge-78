
import { v4 as uuidv4 } from 'uuid';
import { ChangeRequest, ApiResponse, ClosureReason } from '../../types';
import { simulateApiResponse } from '../../mockData/apiHelpers';
import { addAuditEntry } from '../../auditUtils';
import { getUserById } from '../../mockData';
import { getChangeRequests, updateChangeRequest } from './store';

// Change status operations
export const statusApi = {
  // Submit a change request (changes status from draft to submitted)
  submitChangeRequest: async (
    id: string,
    userId: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeRequests = getChangeRequests();
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'draft') {
      return {
        success: false,
        error: 'Only draft change requests can be submitted',
      };
    }
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      'Change request submitted for approval',
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'submitted',
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
  
  // Approve a change request
  approveChangeRequest: async (
    id: string,
    userId: string,
    assignTo?: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeRequests = getChangeRequests();
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'submitted') {
      return {
        success: false,
        error: 'Only submitted change requests can be approved',
      };
    }
    
    const now = new Date();
    const approver = getUserById(userId);
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Change request approved by ${approver?.name || 'Unknown'}`,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'approved',
      approvedBy: userId,
      approvedAt: now,
      assignedTo: assignTo || existingChange.assignedTo,
      updatedAt: now,
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
  
  // Reject a change request
  rejectChangeRequest: async (
    id: string,
    userId: string,
    reason: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeRequests = getChangeRequests();
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'submitted') {
      return {
        success: false,
        error: 'Only submitted change requests can be rejected',
      };
    }
    
    const rejector = getUserById(userId);
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Change request rejected by ${rejector?.name || 'Unknown'}: ${reason}`,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'cancelled',
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
  
  // Close a change request with a specific reason
  closeChangeRequest: async (
    id: string,
    userId: string,
    closureReason: ClosureReason,
    notes?: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeRequests = getChangeRequests();
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'in-progress') {
      return {
        success: false,
        error: 'Only in-progress change requests can be closed',
      };
    }
    
    // Determine final status based on closure reason
    let finalStatus: 'completed' | 'failed';
    if (closureReason === 'failed' || closureReason === 'rolled-back') {
      finalStatus = 'failed';
    } else {
      finalStatus = 'completed';
    }
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Change request closed as ${closureReason}${notes ? ': ' + notes : ''}`,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: finalStatus,
      closureReason: closureReason,
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
};

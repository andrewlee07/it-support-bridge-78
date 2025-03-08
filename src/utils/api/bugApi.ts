
// src/utils/api/bugApi.ts

import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage of bugs
const mockBugs: Bug[] = [];

// Get all bugs with optional filters
export const fetchBugs = (
  filters?: {
    status?: BugStatus | BugStatus[];
    severity?: string;
    priority?: string;
    releaseId?: string;
    relatedBacklogItemId?: string;
  }
): PaginatedResponse<Bug> => {
  let filteredBugs = [...mockBugs];
  
  if (filters) {
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      filteredBugs = filteredBugs.filter(bug => statuses.includes(bug.status as BugStatus));
    }
    
    if (filters.severity) {
      filteredBugs = filteredBugs.filter(bug => bug.severity === filters.severity);
    }
    
    if (filters.priority) {
      filteredBugs = filteredBugs.filter(bug => bug.priority === filters.priority);
    }
    
    if (filters.releaseId) {
      filteredBugs = filteredBugs.filter(bug => bug.releaseId === filters.releaseId);
    }
    
    if (filters.relatedBacklogItemId) {
      filteredBugs = filteredBugs.filter(bug => bug.relatedBacklogItemId === filters.relatedBacklogItemId);
    }
  }
  
  return {
    items: filteredBugs,
    data: filteredBugs, // For backward compatibility
    total: filteredBugs.length,
    page: 1,
    limit: filteredBugs.length,
    totalPages: 1
  };
};

// Get bug by ID
export const fetchBugById = (id: string): ApiResponse<Bug> => {
  const bug = mockBugs.find(b => b.id === id);
  
  if (!bug) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      statusCode: 404
    };
  }
  
  return {
    success: true,
    data: bug,
    status: 200,
    statusCode: 200
  };
};

// Create a new bug
export const createBug = (
  bugData: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>
): ApiResponse<Bug> => {
  const newBug: Bug = {
    id: uuidv4(),
    ...bugData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockBugs.push(newBug);
  
  return {
    success: true,
    data: newBug,
    status: 201,
    statusCode: 201
  };
};

// Update an existing bug
export const updateBug = (
  id: string,
  updates: Partial<Bug>
): ApiResponse<Bug> => {
  const bugIndex = mockBugs.findIndex(bug => bug.id === id);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      statusCode: 404
    };
  }
  
  const updatedBug = {
    ...mockBugs[bugIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  mockBugs[bugIndex] = updatedBug;
  
  return {
    success: true,
    data: updatedBug,
    status: 200,
    statusCode: 200
  };
};

// Get bugs by release ID
export const getBugsByReleaseId = (releaseId: string): ApiResponse<Bug[]> => {
  const bugs = mockBugs.filter(bug => bug.releaseId === releaseId);
  
  return {
    success: true,
    data: bugs,
    status: 200,
    statusCode: 200
  };
};

// Get bugs by backlog item ID
export const getBugsByBacklogItemId = (
  backlogItemId: string
): ApiResponse<Bug[]> => {
  const bugs = mockBugs.filter(bug => bug.relatedBacklogItemId === backlogItemId);
  
  return {
    success: true,
    data: bugs,
    status: 200,
    statusCode: 200
  };
};

// Change bug status
export const changeBugStatus = (
  id: string,
  newStatus: BugStatus
): ApiResponse<Bug> => {
  const bugIndex = mockBugs.findIndex(bug => bug.id === id);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      statusCode: 404
    };
  }
  
  mockBugs[bugIndex].status = newStatus;
  mockBugs[bugIndex].updatedAt = new Date();
  
  return {
    success: true,
    data: mockBugs[bugIndex],
    status: 200,
    statusCode: 200
  };
};

// Delete a bug
export const deleteBug = (id: string): ApiResponse<boolean> => {
  const bugIndex = mockBugs.findIndex(bug => bug.id === id);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      statusCode: 404,
      data: false
    };
  }
  
  mockBugs.splice(bugIndex, 1);
  
  return {
    success: true,
    data: true,
    status: 200,
    statusCode: 200
  };
};

// Export all functions to make them available to components
export default {
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug,
  getBugsByReleaseId,
  getBugsByBacklogItemId,
  changeBugStatus,
  deleteBug
};

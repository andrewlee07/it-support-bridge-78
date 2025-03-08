
import { Bug, ApiResponse, BugStatus } from '@/utils/types';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '@/utils/mockData/apiHelpers';
import { mockBugs } from '@/utils/mockData/bugs';

// Get all bugs
export const getAllBugs = async (): Promise<ApiResponse<Bug[]>> => {
  await delay();
  return createApiSuccessResponse(mockBugs);
};

// Get bug by ID
export const getBugById = async (id: string): Promise<ApiResponse<Bug>> => {
  await delay();
  const bug = mockBugs.find(b => b.id === id);
  
  if (!bug) {
    return createApiErrorResponse("Bug not found", 404);
  }
  
  return createApiSuccessResponse(bug);
};

// Create new bug
export const createBug = async (bugData: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Bug>> => {
  await delay();
  
  const newBug: Bug = {
    id: `BUG-${mockBugs.length + 1001}`,
    ...bugData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockBugs.push(newBug);
  
  return createApiSuccessResponse(newBug);
};

// Update bug status
export const updateBugStatus = async (id: string, status: BugStatus): Promise<ApiResponse<Bug>> => {
  await delay();
  
  const bugIndex = mockBugs.findIndex(b => b.id === id);
  
  if (bugIndex === -1) {
    return createApiErrorResponse("Bug not found", 404);
  }
  
  const updatedBug = {
    ...mockBugs[bugIndex],
    status,
    updatedAt: new Date()
  };
  
  mockBugs[bugIndex] = updatedBug;
  
  return createApiSuccessResponse(updatedBug);
};

// Update bug
export const updateBug = async (id: string, bugData: Partial<Bug>): Promise<ApiResponse<Bug>> => {
  await delay();
  
  const bugIndex = mockBugs.findIndex(b => b.id === id);
  
  if (bugIndex === -1) {
    return createApiErrorResponse("Bug not found", 404);
  }
  
  const updatedBug = {
    ...mockBugs[bugIndex],
    ...bugData,
    updatedAt: new Date()
  };
  
  mockBugs[bugIndex] = updatedBug;
  
  return createApiSuccessResponse(updatedBug);
};

// Get bugs by release ID
export const getBugsByReleaseId = async (releaseId: string): Promise<ApiResponse<Bug[]>> => {
  await delay();
  
  const bugs = mockBugs.filter(b => b.releaseId === releaseId);
  
  return createApiSuccessResponse(bugs);
};

// Delete bug
export const deleteBug = async (id: string): Promise<ApiResponse<void>> => {
  await delay();
  
  const bugIndex = mockBugs.findIndex(b => b.id === id);
  
  if (bugIndex === -1) {
    return createApiErrorResponse("Bug not found", 404);
  }
  
  mockBugs.splice(bugIndex, 1);
  
  return createApiSuccessResponse(undefined);
};

export default {
  getAllBugs,
  getBugById,
  createBug,
  updateBugStatus,
  updateBug,
  getBugsByReleaseId,
  deleteBug
};

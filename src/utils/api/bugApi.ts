
import { ApiResponse } from '@/utils/types';
import { Bug } from '@/utils/types/test/bug';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '@/utils/mockData/apiHelpers';

// In-memory storage
let bugs: Bug[] = [];

export const fetchBugs = async (
  params: { 
    releaseId?: string;
    testCaseId?: string;
    assignedTo?: string;
    status?: string;
  } = {}
): Promise<ApiResponse<Bug[]>> => {
  await delay(300);
  
  try {
    let filteredBugs = [...bugs];
    
    if (params.releaseId) {
      filteredBugs = filteredBugs.filter(bug => bug.releaseId === params.releaseId);
    }
    
    if (params.testCaseId) {
      filteredBugs = filteredBugs.filter(bug => bug.relatedTestCase === params.testCaseId);
    }
    
    if (params.assignedTo) {
      filteredBugs = filteredBugs.filter(bug => bug.assignedDeveloper === params.assignedTo);
    }
    
    if (params.status) {
      filteredBugs = filteredBugs.filter(bug => bug.status === params.status);
    }
    
    return createApiSuccessResponse(filteredBugs);
  } catch (error) {
    return createApiErrorResponse(`Failed to fetch bugs: ${error}`);
  }
};

export const fetchBugById = async (id: string): Promise<ApiResponse<Bug>> => {
  await delay(100);
  
  try {
    const bug = bugs.find(b => b.id === id);
    
    if (!bug) {
      return createApiErrorResponse('Bug not found', 404);
    }
    
    return createApiSuccessResponse(bug);
  } catch (error) {
    return createApiErrorResponse(`Failed to fetch bug: ${error}`);
  }
};

export const createBug = async (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Bug>> => {
  await delay(300);
  
  try {
    const newBug: Bug = {
      id: `bug-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...bug,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    bugs.push(newBug);
    
    return createApiSuccessResponse(newBug);
  } catch (error) {
    return createApiErrorResponse(`Failed to create bug: ${error}`);
  }
};

export const updateBug = async (id: string, bugData: Partial<Bug>): Promise<ApiResponse<Bug>> => {
  await delay(300);
  
  try {
    const index = bugs.findIndex(b => b.id === id);
    
    if (index === -1) {
      return createApiErrorResponse('Bug not found', 404);
    }
    
    const updatedBug = {
      ...bugs[index],
      ...bugData,
      updatedAt: new Date()
    };
    
    bugs[index] = updatedBug;
    
    return createApiSuccessResponse(updatedBug);
  } catch (error) {
    return createApiErrorResponse(`Failed to update bug: ${error}`);
  }
};

export const deleteBug = async (id: string): Promise<ApiResponse<void>> => {
  await delay(200);
  
  try {
    const index = bugs.findIndex(b => b.id === id);
    
    if (index === -1) {
      return createApiErrorResponse('Bug not found', 404);
    }
    
    bugs.splice(index, 1);
    
    return createApiSuccessResponse(undefined);
  } catch (error) {
    return createApiErrorResponse(`Failed to delete bug: ${error}`);
  }
};

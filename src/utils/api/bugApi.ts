
import { Bug, BugStatus } from '@/utils/types/test/bug';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { bugs } from '@/utils/mockData/bugs';

// Export the mock bugs
export const mockBugs = bugs;

// Get all bugs
export const fetchBugs = async (
  filters?: Partial<Bug>
): Promise<PaginatedResponse<Bug>> => {
  let filteredBugs = [...bugs];
  
  if (filters) {
    Object.keys(filters).forEach(key => {
      const filterKey = key as keyof Bug;
      const filterValue = filters[filterKey];
      
      if (filterValue !== undefined) {
        filteredBugs = filteredBugs.filter(bug => bug[filterKey] === filterValue);
      }
    });
  }
  
  return {
    data: filteredBugs,
    pagination: {
      total: filteredBugs.length,
      page: 1,
      pageSize: filteredBugs.length,
      totalPages: 1
    }
  };
};

// Get bug by ID
export const fetchBugById = async (bugId: string): Promise<ApiResponse<Bug>> => {
  const bug = bugs.find(b => b.id === bugId);
  
  if (!bug) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      data: null
    };
  }
  
  return {
    success: true,
    data: bug,
    status: 200
  };
};

// Update bug status
export const updateBugStatus = async (
  bugId: string, 
  newStatus: BugStatus
): Promise<ApiResponse<Bug>> => {
  const bugIndex = bugs.findIndex(b => b.id === bugId);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      data: null
    };
  }
  
  const updatedBug = {
    ...bugs[bugIndex],
    status: newStatus,
    updatedAt: new Date()
  };
  
  bugs[bugIndex] = updatedBug;
  
  return {
    success: true,
    data: updatedBug,
    status: 200
  };
};

// Get bugs by release ID
export const getBugsByReleaseId = async (
  releaseId: string
): Promise<ApiResponse<Bug[]>> => {
  const releaseBugs = bugs.filter(bug => bug.releaseId === releaseId);
  
  return {
    success: true,
    data: releaseBugs,
    status: 200
  };
};

// Create a new bug
export const createBug = async (bugData: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Bug>> => {
  const newBug: Bug = {
    id: `BUG-${bugs.length + 1}`,
    ...bugData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  bugs.push(newBug);
  
  return {
    success: true,
    data: newBug,
    status: 201
  };
};

// Update a bug
export const updateBug = async (
  bugId: string,
  bugData: Partial<Bug>
): Promise<ApiResponse<Bug>> => {
  const bugIndex = bugs.findIndex(b => b.id === bugId);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      data: null
    };
  }
  
  const updatedBug = {
    ...bugs[bugIndex],
    ...bugData,
    updatedAt: new Date()
  };
  
  bugs[bugIndex] = updatedBug;
  
  return {
    success: true,
    data: updatedBug,
    status: 200
  };
};

// Delete a bug
export const deleteBug = async (bugId: string): Promise<ApiResponse<boolean>> => {
  const bugIndex = bugs.findIndex(b => b.id === bugId);
  
  if (bugIndex === -1) {
    return {
      success: false,
      error: 'Bug not found',
      status: 404,
      data: false
    };
  }
  
  bugs.splice(bugIndex, 1);
  
  return {
    success: true,
    data: true,
    status: 200
  };
};

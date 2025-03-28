
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { Bug } from '../types/test';

export const createBugFromTicket = async (
  ticketId: string,
  data: {
    title: string;
    description: string;
    severity: string;
    priority: string;
    stepsToReproduce: string[];
  }
): Promise<ApiResponse<Bug>> => {
  try {
    await delay(800);
    
    const newBug: Bug = {
      id: `BUG-${Math.floor(Math.random() * 10000)}`,
      title: data.title,
      description: data.description,
      status: 'open',
      severity: data.severity,
      priority: data.priority,
      stepsToReproduce: data.stepsToReproduce,
      createdBy: 'user-1',
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      sourceId: ticketId,
      sourceType: 'incident',
      affectedComponents: [],
      comments: [],
      attachments: []
    };
    
    return createApiSuccessResponse(newBug);
  } catch (error) {
    return createApiErrorResponse('Failed to create bug', 500);
  }
};

export const getBugById = async (bugId: string): Promise<ApiResponse<Bug>> => {
  try {
    await delay(300);
    
    // In a real app, you would fetch this from a database
    const bug: Bug = {
      id: bugId,
      title: `Bug ${bugId}`,
      description: 'This is a sample bug description',
      status: 'open',
      severity: 'medium',
      priority: 'medium',
      stepsToReproduce: ['Step 1', 'Step 2'],
      createdBy: 'user-1',
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      sourceId: null,
      sourceType: null,
      affectedComponents: ['API', 'Database'],
      comments: [],
      attachments: []
    };
    
    return createApiSuccessResponse(bug);
  } catch (error) {
    return createApiErrorResponse('Failed to fetch bug', 500);
  }
};

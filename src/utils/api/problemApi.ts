
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { Problem } from '../types/problem';

export const createProblemFromIncident = async (
  incidentId: string,
  data: {
    title: string;
    description: string;
    priority: string;
    category: string;
  }
): Promise<ApiResponse<Problem>> => {
  try {
    await delay(800);
    
    const newProblem: Problem = {
      id: `PRB-${Math.floor(Math.random() * 10000)}`,
      title: data.title,
      description: data.description,
      status: 'new',
      priority: data.priority as any,
      category: data.category as any,
      createdBy: 'user-1',
      assignedTo: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      audit: [
        {
          id: `audit-${Date.now()}`,
          entityId: `PRB-${Math.floor(Math.random() * 10000)}`,
          entityType: 'problem',
          action: 'created',
          timestamp: new Date(),
          userId: 'user-1',
          details: 'Problem created from incident',
          oldValue: null,
          newValue: null
        }
      ],
      relatedIncidents: [incidentId]
    };
    
    return createApiSuccessResponse(newProblem);
  } catch (error) {
    return createApiErrorResponse('Failed to create problem', 500);
  }
};

export const createKnownErrorFromProblem = async (
  problemId: string,
  data: {
    title: string;
    description: string;
    symptoms: string;
    workaround: string;
  }
): Promise<ApiResponse<{ id: string; problemId: string }>> => {
  try {
    await delay(800);
    
    const knownErrorId = `KE-${Math.floor(Math.random() * 10000)}`;
    
    // In a real app, you would create the known error in a database
    return createApiSuccessResponse({
      id: knownErrorId,
      problemId
    });
  } catch (error) {
    return createApiErrorResponse('Failed to create known error', 500);
  }
};

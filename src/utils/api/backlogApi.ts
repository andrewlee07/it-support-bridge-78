
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { BacklogItem } from '../types/backlogTypes';

export const createBacklogItemFromServiceRequest = async (
  serviceRequestId: string,
  data: {
    title: string;
    description: string;
    priority: string;
    type: string;
  }
): Promise<ApiResponse<BacklogItem>> => {
  try {
    await delay(800);
    
    const newBacklogItem: BacklogItem = {
      id: `STORY-${Math.floor(Math.random() * 10000)}`,
      title: data.title,
      description: data.description,
      status: 'open',
      priority: data.priority,
      type: data.type,
      createdBy: 'user-1',
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      sourceId: serviceRequestId,
      sourceType: 'service-request',
      storyPoints: 3,
      dueDate: null,
      comments: [],
      attachments: [],
      labels: [],
      sprint: null
    };
    
    return createApiSuccessResponse(newBacklogItem);
  } catch (error) {
    return createApiErrorResponse('Failed to create backlog item', 500);
  }
};

export const addBacklogItemToRelease = async (
  backlogItemId: string,
  releaseId: string
): Promise<ApiResponse<boolean>> => {
  try {
    await delay(300);
    
    // In a real app, you would update the backlog item in a database
    return createApiSuccessResponse(true);
  } catch (error) {
    return createApiErrorResponse('Failed to add backlog item to release', 500);
  }
};

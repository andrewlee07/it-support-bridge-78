
import { BacklogItem, BacklogItemStatus, BacklogStats } from '@/utils/types/backlogTypes';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { 
  fetchBacklogItems as mockFetchBacklogItems,
  fetchBacklogItemById as mockFetchBacklogItemById,
  createBacklogItem as mockCreateBacklogItem,
  updateBacklogItem as mockUpdateBacklogItem, 
  assignToRelease as mockAssignToRelease,
  removeFromRelease as mockRemoveFromRelease,
  getBacklogStats as mockGetBacklogStats,
  getBacklogItemsByReleaseId as mockGetBacklogItemsByReleaseId,
  deleteBacklogItem as mockDeleteBacklogItem,
  addAttachment as mockAddAttachment,
  removeAttachment as mockRemoveAttachment,
  addComment as mockAddComment,
  updateComment as mockUpdateComment,
  deleteComment as mockDeleteComment,
  addWatcher as mockAddWatcher,
  removeWatcher as mockRemoveWatcher,
} from '../mockData/backlog';

// Re-export all mock functions with proper names
export const fetchBacklogItems = mockFetchBacklogItems;
export const fetchBacklogItemById = mockFetchBacklogItemById;
export const createBacklogItem = mockCreateBacklogItem;
export const updateBacklogItem = mockUpdateBacklogItem;
export const assignToRelease = mockAssignToRelease;
export const removeFromRelease = mockRemoveFromRelease;
export const getBacklogStats = mockGetBacklogStats;
export const getBacklogItemsByReleaseId = mockGetBacklogItemsByReleaseId;
export const deleteBacklogItem = mockDeleteBacklogItem;
export const addAttachment = mockAddAttachment;
export const removeAttachment = mockRemoveAttachment;
export const addComment = mockAddComment;
export const updateComment = mockUpdateComment;
export const deleteComment = mockDeleteComment;
export const addWatcher = mockAddWatcher;
export const removeWatcher = mockRemoveWatcher;

// For backward compatibility, we'll also expose backlogItems
export const backlogItems = [];

// Create a backlog item specifically from a service request 
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
      priority: data.priority as any, // Cast to work with type restrictions
      type: data.type as any, // Cast to work with type restrictions
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
      labels: []
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

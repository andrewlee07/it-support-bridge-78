
import { BacklogItem, BacklogItemStatus, BacklogStats } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';
import { backlogItems, generateBacklogItemId } from './backlogItems';
import { mockReleases } from '@/utils/api/release/mockData';

// Backlog Item API functions
export const fetchBacklogItems = async (
  releaseId?: string,
  status?: BacklogItemStatus[],
  searchQuery?: string
): Promise<ApiResponse<BacklogItem[]>> => {
  await delay(500);
  
  let filteredItems = [...backlogItems];
  
  if (releaseId) {
    filteredItems = filteredItems.filter(item => 
      releaseId === 'unassigned' 
        ? !item.releaseId 
        : item.releaseId === releaseId
    );
  }
  
  if (status && status.length > 0) {
    filteredItems = filteredItems.filter(item => status.includes(item.status));
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      item.labels.some(label => label.toLowerCase().includes(query))
    );
  }
  
  return createApiSuccessResponse(filteredItems);
};

export const fetchBacklogItemById = async (id: string): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(500);
  const item = backlogItems.find(b => b.id === id);
  if (!item) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  return createApiSuccessResponse(item);
};

export const createBacklogItem = async (
  item: Omit<BacklogItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<BacklogItem>> => {
  await delay(500);
  const newItem: BacklogItem = {
    id: generateBacklogItemId(),
    ...item,
    createdAt: new Date(),
    updatedAt: new Date(),
    // Initialize enhanced feature fields if not provided
    attachments: item.attachments || [],
    comments: item.comments || [],
    watchers: item.watchers || [],
    history: item.history || []
  };
  backlogItems.push(newItem);
  return createApiSuccessResponse(newItem);
};

export const updateBacklogItem = async (
  id: string, 
  updates: Partial<BacklogItem>
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(500);
  const index = backlogItems.findIndex(b => b.id === id);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  backlogItems[index] = { 
    ...backlogItems[index], 
    ...updates, 
    updatedAt: new Date() 
  };
  return createApiSuccessResponse(backlogItems[index]);
};

export const assignToRelease = async (
  backlogItemId: string, 
  releaseId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(500);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  // Check if the release exists
  const releaseExists = mockReleases.some(r => r.id === releaseId);
  if (!releaseExists) {
    return createApiErrorResponse<BacklogItem | null>('Release not found', 404);
  }
  
  backlogItems[index] = { 
    ...backlogItems[index], 
    releaseId, 
    updatedAt: new Date() 
  };
  return createApiSuccessResponse(backlogItems[index]);
};

export const removeFromRelease = async (
  backlogItemId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(500);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  backlogItems[index] = { 
    ...backlogItems[index], 
    releaseId: undefined, 
    updatedAt: new Date() 
  };
  return createApiSuccessResponse(backlogItems[index]);
};

export const getBacklogStats = async (): Promise<ApiResponse<BacklogStats>> => {
  await delay(500);
  
  // Group by release
  const releaseGroups = backlogItems.reduce((acc, item) => {
    const releaseId = item.releaseId || 'unassigned';
    if (!acc[releaseId]) {
      acc[releaseId] = {
        itemCount: 0,
        completedCount: 0,
        releaseName: releaseId === 'unassigned' 
          ? 'Unassigned' 
          : mockReleases.find(r => r.id === releaseId)?.title || 'Unknown Release'
      };
    }
    acc[releaseId].itemCount++;
    if (item.status === 'completed') {
      acc[releaseId].completedCount++;
    }
    return acc;
  }, {} as Record<string, { itemCount: number, completedCount: number, releaseName: string }>);
  
  // Group by assignee
  const assigneeGroups = backlogItems.reduce((acc, item) => {
    const assigneeId = item.assignee || 'unassigned';
    if (!acc[assigneeId]) {
      acc[assigneeId] = {
        itemCount: 0,
        assigneeName: assigneeId === 'unassigned' ? 'Unassigned' : assigneeId
      };
    }
    acc[assigneeId].itemCount++;
    return acc;
  }, {} as Record<string, { itemCount: number, assigneeName: string }>);
  
  const stats: BacklogStats = {
    totalItems: backlogItems.length,
    openItems: backlogItems.filter(item => item.status === 'open' || item.status === 'in-progress').length,
    completedItems: backlogItems.filter(item => item.status === 'completed').length,
    blockedItems: backlogItems.filter(item => item.status === 'blocked').length,
    byRelease: Object.entries(releaseGroups).map(([releaseId, data]) => ({
      releaseId,
      releaseName: data.releaseName,
      itemCount: data.itemCount,
      completedCount: data.completedCount
    })),
    byAssignee: Object.entries(assigneeGroups).map(([assigneeId, data]) => ({
      assigneeId,
      assigneeName: data.assigneeName,
      itemCount: data.itemCount
    }))
  };
  
  return createApiSuccessResponse(stats);
};

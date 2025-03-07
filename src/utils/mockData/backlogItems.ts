
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, BacklogItemStatus, BacklogItemPriority, BacklogItemType, BacklogStats } from '../types/backlogTypes';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { mockReleases } from '../api/release/mockData';

// Mock Backlog Items data
export let backlogItems: BacklogItem[] = [
  {
    id: 'BLGI-1001',
    title: 'Implement user authentication',
    description: 'Add login, registration, and password reset functionality',
    status: 'in-progress',
    priority: 'high',
    type: 'feature',
    creator: 'user-1',
    assignee: 'user-2',
    releaseId: mockReleases[0]?.id,
    storyPoints: 8,
    labels: ['authentication', 'security'],
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-05'),
  },
  {
    id: 'BLGI-1002',
    title: 'Fix login button styling',
    description: 'The login button is misaligned on mobile devices',
    status: 'open',
    priority: 'medium',
    type: 'bug',
    creator: 'user-2',
    relatedItemId: 'bug-1',
    relatedItemType: 'bug',
    storyPoints: 2,
    labels: ['ui', 'mobile'],
    createdAt: new Date('2023-10-03'),
    updatedAt: new Date('2023-10-03'),
  },
  {
    id: 'BLGI-1003',
    title: 'Add pagination to user list',
    description: 'Implement pagination for the user management screen',
    status: 'open',
    priority: 'medium',
    type: 'enhancement',
    creator: 'user-1',
    storyPoints: 3,
    labels: ['ui', 'performance'],
    createdAt: new Date('2023-10-04'),
    updatedAt: new Date('2023-10-04'),
  },
  {
    id: 'BLGI-1004',
    title: 'Improve error handling in API',
    description: 'Implement consistent error responses across all API endpoints',
    status: 'open',
    priority: 'high',
    type: 'technical-debt',
    creator: 'user-3',
    releaseId: mockReleases[1]?.id,
    storyPoints: 5,
    dueDate: new Date('2023-11-30'),
    labels: ['api', 'quality'],
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-10-05'),
  },
];

// Generate backlog ID
export const generateBacklogItemId = (): string => {
  const lastId = backlogItems.length > 0 
    ? parseInt(backlogItems[backlogItems.length - 1].id.split('-')[1])
    : 1000;
  return `BLGI-${lastId + 1}`;
};

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

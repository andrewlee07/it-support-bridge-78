
import { BacklogItem, BacklogItemStatus, BacklogStats } from '@/utils/types/backlogTypes';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { v4 as uuidv4 } from 'uuid';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';

// Get all backlog items
export const fetchBacklogItems = (
  releaseId?: string,
  status?: BacklogItemStatus | BacklogItemStatus[],
  searchQuery?: string
): PaginatedResponse<BacklogItem> => {
  let filteredItems = [...backlogItems];
  
  if (status) {
    if (Array.isArray(status)) {
      filteredItems = filteredItems.filter(item => status.includes(item.status));
    } else {
      filteredItems = filteredItems.filter(item => item.status === status);
    }
  }
  
  if (releaseId) {
    if (releaseId === 'unassigned') {
      filteredItems = filteredItems.filter(item => !item.releaseId);
    } else {
      filteredItems = filteredItems.filter(item => item.releaseId === releaseId);
    }
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) || 
      item.id.toLowerCase().includes(query)
    );
  }
  
  return {
    items: filteredItems,
    data: filteredItems, // For backward compatibility
    total: filteredItems.length,
    page: 1,
    limit: filteredItems.length,
    totalPages: 1,
    pagination: {
      total: filteredItems.length,
      page: 1,
      pageSize: filteredItems.length,
      totalPages: 1
    }
  };
};

// Get backlog items by release ID
export const getBacklogItemsByReleaseId = (
  releaseId: string
): ApiResponse<BacklogItem[]> => {
  const items = backlogItems.filter(item => item.releaseId === releaseId);
  
  return {
    success: true,
    data: items,
    status: 200,
    statusCode: 200
  };
};

// Get backlog item by ID
export const fetchBacklogItemById = (
  id: string
): ApiResponse<BacklogItem> => {
  const item = backlogItems.find(item => item.id === id);
  
  if (!item) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  return {
    success: true,
    data: item,
    status: 200,
    statusCode: 200
  };
};

// Create a new backlog item
export const createBacklogItem = (
  item: Omit<BacklogItem, 'id' | 'createdAt' | 'updatedAt'>
): ApiResponse<BacklogItem> => {
  const newItem: BacklogItem = {
    id: uuidv4(),
    ...item,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  backlogItems.push(newItem);
  
  return {
    success: true,
    data: newItem,
    status: 201,
    statusCode: 201
  };
};

// Update an existing backlog item
export const updateBacklogItem = (
  id: string,
  updates: Partial<BacklogItem>
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  const updatedItem: BacklogItem = {
    ...backlogItems[itemIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  backlogItems[itemIndex] = updatedItem;
  
  return {
    success: true,
    data: updatedItem,
    status: 200,
    statusCode: 200
  };
};

// Delete a backlog item
export const deleteBacklogItem = (id: string): ApiResponse<boolean> => {
  const itemIndex = backlogItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: false
    };
  }
  
  backlogItems.splice(itemIndex, 1);
  
  return {
    success: true,
    data: true,
    status: 200,
    statusCode: 200
  };
};

// Get backlog stats
export const getBacklogStats = (): ApiResponse<BacklogStats> => {
  const totalItems = backlogItems.length;
  const openItems = backlogItems.filter(item => item.status === 'open').length;
  const inProgressItems = backlogItems.filter(item => item.status === 'in-progress').length;
  const completedItems = backlogItems.filter(item => item.status === 'completed').length;
  const blockedItems = backlogItems.filter(item => item.status === 'blocked').length;
  
  const stats: BacklogStats = {
    totalItems,
    openItems,
    completedItems,
    inProgressItems,
    blockedItems
  };
  
  return {
    success: true,
    data: stats,
    status: 200,
    statusCode: 200
  };
};

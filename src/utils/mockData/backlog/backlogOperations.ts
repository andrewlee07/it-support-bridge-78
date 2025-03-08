import { BacklogItem, BacklogItemStatus, BacklogStats } from '@/utils/types/backlogTypes';
import { backlogItems } from './backlogItems';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { v4 as uuidv4 } from 'uuid';

// Get all backlog items
export const fetchBacklogItems = (
  status?: BacklogItemStatus | BacklogItemStatus[],
  releaseId?: string,
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
    filteredItems = filteredItems.filter(item => item.releaseId === releaseId);
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
    data: filteredItems,
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
    status: 200
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
      data: null
    };
  }
  
  return {
    success: true,
    data: item,
    status: 200
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
    status: 201
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
      data: null
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
    status: 200
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
      data: false
    };
  }
  
  backlogItems.splice(itemIndex, 1);
  
  return {
    success: true,
    data: true,
    status: 200
  };
};

// Assign a backlog item to a release
export const assignToRelease = (
  itemId: string,
  releaseId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  backlogItems[itemIndex].releaseId = releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Remove a backlog item from a release
export const removeFromRelease = (itemId: string): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  delete backlogItems[itemIndex].releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Get backlog stats
export const getBacklogStats = (): ApiResponse<BacklogStats> => {
  const totalItems = backlogItems.length;
  const openItems = backlogItems.filter(item => item.status === 'open').length;
  const inProgressItems = backlogItems.filter(item => item.status === 'in-progress').length;
  const completedItems = backlogItems.filter(item => item.status === 'completed').length;
  
  const stats: BacklogStats = {
    totalItems,
    openItems,
    inProgressItems,
    completedItems
  };
  
  return {
    success: true,
    data: stats,
    status: 200
  };
};

// Add an attachment to a backlog item
export const addAttachment = (
  itemId: string,
  attachment: { name: string; url: string }
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  if (!backlogItems[itemIndex].attachments) {
    backlogItems[itemIndex].attachments = [];
  }
  
  backlogItems[itemIndex].attachments!.push(attachment);
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Remove an attachment from a backlog item
export const removeAttachment = (
  itemId: string,
  attachmentUrl: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  backlogItems[itemIndex].attachments = backlogItems[itemIndex].attachments?.filter(
    attachment => attachment.url !== attachmentUrl
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Add a comment to a backlog item
export const addComment = (
  itemId: string,
  comment: { text: string; author: string }
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  if (!backlogItems[itemIndex].comments) {
    backlogItems[itemIndex].comments = [];
  }
  
  const newComment = {
    id: uuidv4(),
    ...comment,
    createdAt: new Date()
  };
  
  backlogItems[itemIndex].comments!.push(newComment);
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Update a comment on a backlog item
export const updateComment = (
  itemId: string,
  commentId: string,
  text: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  const commentIndex = backlogItems[itemIndex].comments?.findIndex(
    comment => comment.id === commentId
  );
  
  if (commentIndex === undefined || commentIndex === -1) {
    return {
      success: false,
      error: 'Comment not found',
      status: 404,
      data: null
    };
  }
  
  backlogItems[itemIndex].comments![commentIndex].text = text;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Delete a comment from a backlog item
export const deleteComment = (
  itemId: string,
  commentId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  backlogItems[itemIndex].comments = backlogItems[itemIndex].comments?.filter(
    comment => comment.id !== commentId
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Add a watcher to a backlog item
export const addWatcher = (
  itemId: string,
  userId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  if (!backlogItems[itemIndex].watchers) {
    backlogItems[itemIndex].watchers = [];
  }
  
  if (!backlogItems[itemIndex].watchers?.includes(userId)) {
    backlogItems[itemIndex].watchers!.push(userId);
  }
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

// Remove a watcher from a backlog item
export const removeWatcher = (
  itemId: string,
  userId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      data: null
    };
  }
  
  backlogItems[itemIndex].watchers = backlogItems[itemIndex].watchers?.filter(
    watcher => watcher !== userId
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200
  };
};

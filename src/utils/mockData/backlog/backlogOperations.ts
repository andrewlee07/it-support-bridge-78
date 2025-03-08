
import { BacklogItem, BacklogItemStatus, BacklogStats, Attachment, Comment } from '@/utils/types/backlogTypes';
import { backlogItems } from './backlogItems';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { v4 as uuidv4 } from 'uuid';

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
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].releaseId = releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  delete backlogItems[itemIndex].releaseId;
  
  return {
    success: true,
    data: backlogItems[itemIndex],
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
  
  const stats: BacklogStats = {
    totalItems,
    openItems,
    completedItems,
    inProgressItems
  };
  
  return {
    success: true,
    data: stats,
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  if (!backlogItems[itemIndex].attachments) {
    backlogItems[itemIndex].attachments = [];
  }
  
  // Create a proper Attachment object
  const newAttachment: Attachment = {
    id: uuidv4(),
    fileName: attachment.name,
    fileUrl: attachment.url,
    fileType: attachment.url.split('.').pop() || 'unknown',
    fileSize: 0, // We don't have this info
    uploadedBy: 'system',
    uploadedAt: new Date(),
    name: attachment.name, // For backward compatibility
    url: attachment.url // For backward compatibility
  };
  
  backlogItems[itemIndex].attachments!.push(newAttachment);
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].attachments = backlogItems[itemIndex].attachments?.filter(
    attachment => attachment.fileUrl !== attachmentUrl && attachment.url !== attachmentUrl
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  if (!backlogItems[itemIndex].comments) {
    backlogItems[itemIndex].comments = [];
  }
  
  // Create a proper Comment object
  const newComment: Comment = {
    id: uuidv4(),
    content: comment.text,
    author: comment.author,
    createdAt: new Date(),
    text: comment.text // For backward compatibility
  };
  
  backlogItems[itemIndex].comments!.push(newComment);
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
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
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].comments![commentIndex].content = text;
  backlogItems[itemIndex].comments![commentIndex].text = text; // For backward compatibility
  backlogItems[itemIndex].comments![commentIndex].updatedAt = new Date();
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].comments = backlogItems[itemIndex].comments?.filter(
    comment => comment.id !== commentId
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
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
    status: 200,
    statusCode: 200
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
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].watchers = backlogItems[itemIndex].watchers?.filter(
    watcher => watcher !== userId
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

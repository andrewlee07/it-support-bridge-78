
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, Attachment, Comment } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';
import { backlogItems } from './backlogItems';
import { createAuditEntry } from '../auditHelpers';

// Enhanced features API functions
export const addAttachment = async (
  backlogItemId: string,
  attachment: Attachment
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const attachments = backlogItems[index].attachments || [];
  
  backlogItems[index] = {
    ...backlogItems[index],
    attachments: [...attachments, attachment],
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const removeAttachment = async (
  backlogItemId: string,
  attachmentId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const attachments = backlogItems[index].attachments || [];
  
  backlogItems[index] = {
    ...backlogItems[index],
    attachments: attachments.filter(a => a.id !== attachmentId),
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const addComment = async (
  backlogItemId: string,
  comment: Comment
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const comments = backlogItems[index].comments || [];
  
  backlogItems[index] = {
    ...backlogItems[index],
    comments: [...comments, comment],
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const updateComment = async (
  backlogItemId: string,
  commentId: string,
  content: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const comments = backlogItems[index].comments || [];
  const commentIndex = comments.findIndex(c => c.id === commentId);
  
  if (commentIndex === -1) {
    return createApiErrorResponse<BacklogItem | null>('Comment not found', 404);
  }
  
  comments[commentIndex] = {
    ...comments[commentIndex],
    content,
    updatedAt: new Date()
  };
  
  backlogItems[index] = {
    ...backlogItems[index],
    comments,
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const deleteComment = async (
  backlogItemId: string,
  commentId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const comments = backlogItems[index].comments || [];
  
  backlogItems[index] = {
    ...backlogItems[index],
    comments: comments.filter(c => c.id !== commentId),
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const addWatcher = async (
  backlogItemId: string,
  userId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const watchers = backlogItems[index].watchers || [];
  
  // Only add if not already watching
  if (!watchers.includes(userId)) {
    backlogItems[index] = {
      ...backlogItems[index],
      watchers: [...watchers, userId],
      updatedAt: new Date()
    };
  }
  
  return createApiSuccessResponse(backlogItems[index]);
};

export const removeWatcher = async (
  backlogItemId: string,
  userId: string
): Promise<ApiResponse<BacklogItem | null>> => {
  await delay(300);
  const index = backlogItems.findIndex(b => b.id === backlogItemId);
  if (index === -1) {
    return createApiErrorResponse<BacklogItem | null>('Backlog item not found', 404);
  }
  
  const watchers = backlogItems[index].watchers || [];
  
  backlogItems[index] = {
    ...backlogItems[index],
    watchers: watchers.filter(id => id !== userId),
    updatedAt: new Date()
  };
  
  return createApiSuccessResponse(backlogItems[index]);
};

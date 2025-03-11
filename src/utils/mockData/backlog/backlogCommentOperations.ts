
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, Comment, BacklogItemComment } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';

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
  
  // Create a proper BacklogItemComment object
  const newComment: BacklogItemComment = {
    id: uuidv4(),
    text: comment.text,
    content: comment.text, // For forward compatibility
    author: comment.author,
    createdAt: new Date()
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
  
  backlogItems[itemIndex].comments![commentIndex].text = text;
  backlogItems[itemIndex].comments![commentIndex].content = text; // For forward compatibility
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

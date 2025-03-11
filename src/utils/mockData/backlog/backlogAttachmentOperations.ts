
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, Attachment, BacklogItemAttachment } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';

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
  
  // Create a proper BacklogItemAttachment object
  const newAttachment: BacklogItemAttachment = {
    id: uuidv4(),
    filename: attachment.name,
    url: attachment.url,
    fileUrl: attachment.url,
    fileType: attachment.url.split('.').pop() || 'unknown',
    fileSize: 0, // We don't have this info
    uploadedBy: 'system',
    uploadedAt: new Date(),
    fileName: attachment.name // For backward compatibility
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
    attachment => (attachment.fileUrl || attachment.url) !== attachmentUrl
  );
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};


import { 
  BacklogItemComment, 
  BacklogItemAttachment, 
  Comment, 
  Attachment 
} from '@/utils/types/backlogTypes';

// Function to convert BacklogItemAttachment to Attachment
export function mapBacklogAttachmentsToAttachments(backlogAttachments: BacklogItemAttachment[]): Attachment[] {
  return backlogAttachments.map(att => ({
    id: att.id,
    filename: att.filename || att.fileName || '',
    fileUrl: att.fileUrl || att.url || '',
    fileType: att.fileType || 'unknown', // Default value if not available
    fileSize: att.fileSize || 0, // Default value if not available
    uploadedBy: att.uploadedBy,
    uploadedAt: att.uploadedAt,
    // Backward compatibility fields
    fileName: att.filename || att.fileName,
    name: att.filename || att.fileName,
    url: att.fileUrl || att.url
  }));
}

// Function to convert Attachment to BacklogItemAttachment
export function mapAttachmentsToBacklogAttachments(attachments: Attachment[]): BacklogItemAttachment[] {
  return attachments.map(att => ({
    id: att.id,
    filename: att.filename,
    url: att.url || att.fileUrl, // Ensure url is always set
    uploadedBy: att.uploadedBy,
    uploadedAt: att.uploadedAt,
    fileUrl: att.fileUrl,
    fileType: att.fileType,
    fileSize: att.fileSize,
    fileName: att.fileName || att.filename
  }));
}

// Function to convert BacklogItemComment to Comment
export function mapBacklogCommentsToComments(backlogComments: BacklogItemComment[]): Comment[] {
  return backlogComments.map(comment => ({
    id: comment.id,
    content: comment.content || comment.text || '',
    text: comment.text || comment.content || '',
    author: comment.author,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentId: comment.parentId
  }));
}

// Function to convert Comments back to BacklogItemComments
export function mapCommentsToBacklogComments(comments: Comment[]): BacklogItemComment[] {
  return comments.map(comment => ({
    id: comment.id,
    text: comment.text || comment.content || '',
    content: comment.content || comment.text || '',
    author: comment.author,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentId: comment.parentId
  }));
}

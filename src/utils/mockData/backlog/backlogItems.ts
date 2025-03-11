
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, BacklogItemAttachment, BacklogItemComment } from '@/utils/types/backlogTypes';
import { mockReleases } from '@/utils/api/release/mockData';
import { sampleAttachments, sampleComments, sampleHistoryEntries } from './sampleData';

// Function to convert Attachment to BacklogItemAttachment
function convertToBacklogItemAttachment(attachment: any): BacklogItemAttachment {
  return {
    id: attachment.id,
    filename: attachment.filename || attachment.fileName || '',
    url: attachment.url || attachment.fileUrl || '',
    uploadedBy: attachment.uploadedBy,
    uploadedAt: attachment.uploadedAt,
    fileUrl: attachment.fileUrl || attachment.url || '',
    fileType: attachment.fileType || 'unknown',
    fileSize: attachment.fileSize || 0,
    fileName: attachment.fileName || attachment.filename || ''
  };
}

// Function to convert Comment to BacklogItemComment
function convertToBacklogItemComment(comment: any): BacklogItemComment {
  return {
    id: comment.id,
    text: comment.text || comment.content || '',
    content: comment.content || comment.text || '',
    author: comment.author,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentId: comment.parentId
  };
}

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
    // Enhanced features
    attachments: [convertToBacklogItemAttachment(sampleAttachments[0])],
    comments: [convertToBacklogItemComment(sampleComments[0]), convertToBacklogItemComment(sampleComments[1])],
    watchers: ['user-1', 'user-3'],
    history: sampleHistoryEntries.slice(0, 2)
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
    // Enhanced features
    attachments: [convertToBacklogItemAttachment(sampleAttachments[1])],
    comments: [convertToBacklogItemComment(sampleComments[2])],
    watchers: ['user-2'],
    history: [sampleHistoryEntries[1]]
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
    // Enhanced features
    watchers: ['user-1', 'user-2', 'user-3']
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
    // Enhanced features
    attachments: [convertToBacklogItemAttachment(sampleAttachments[2])],
    history: [sampleHistoryEntries[0]]
  },
];

// Generate backlog ID
export const generateBacklogItemId = (): string => {
  const lastId = backlogItems.length > 0 
    ? parseInt(backlogItems[backlogItems.length - 1].id.split('-')[1])
    : 1000;
  return `BLGI-${lastId + 1}`;
};


import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, BacklogItemStatus, BacklogItemPriority, BacklogItemType, BacklogStats, Attachment, Comment, HistoryEntry } from '../types/backlogTypes';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { mockReleases } from '../api/release/mockData';
import { createAuditEntry } from './auditHelpers';

// Sample attachments for demo items
const sampleAttachments: Attachment[] = [
  {
    id: 'att-1',
    fileName: 'requirements.pdf',
    fileUrl: '/files/requirements.pdf',
    fileType: 'application/pdf',
    fileSize: 2453000,
    uploadedBy: 'user-1',
    uploadedAt: new Date('2023-10-02'),
  },
  {
    id: 'att-2',
    fileName: 'mockup.png',
    fileUrl: '/files/mockup.png',
    fileType: 'image/png',
    fileSize: 1250000,
    uploadedBy: 'user-2',
    uploadedAt: new Date('2023-10-03'),
  },
  {
    id: 'att-3',
    fileName: 'api-specs.json',
    fileUrl: '/files/api-specs.json',
    fileType: 'application/json',
    fileSize: 15200,
    uploadedBy: 'user-3',
    uploadedAt: new Date('2023-10-04'),
  }
];

// Sample comments for demo items
const sampleComments: Comment[] = [
  {
    id: 'comment-1',
    content: 'We need to consider mobile responsiveness for this feature.',
    author: 'user-1',
    createdAt: new Date('2023-10-02T10:30:00'),
  },
  {
    id: 'comment-2',
    content: 'I agree. Let me check with the design team.',
    author: 'user-2',
    createdAt: new Date('2023-10-02T11:15:00'),
    parentId: 'comment-1'
  },
  {
    id: 'comment-3',
    content: 'The design team confirmed they will provide mobile mockups by tomorrow.',
    author: 'user-2',
    createdAt: new Date('2023-10-03T09:45:00'),
  }
];

// Sample history entries
const sampleHistoryEntries: HistoryEntry[] = [
  {
    id: 'history-1',
    field: 'status',
    previousValue: 'open',
    newValue: 'in-progress',
    changedBy: 'user-2',
    changedAt: new Date('2023-10-01T14:20:00')
  },
  {
    id: 'history-2',
    field: 'priority',
    previousValue: 'medium',
    newValue: 'high',
    changedBy: 'user-1',
    changedAt: new Date('2023-10-03T10:15:00')
  },
  {
    id: 'history-3',
    field: 'assignee',
    previousValue: null,
    newValue: 'user-2',
    changedBy: 'user-1',
    changedAt: new Date('2023-10-04T16:30:00')
  }
];

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
    attachments: [sampleAttachments[0]],
    comments: [sampleComments[0], sampleComments[1]],
    watchers: ['user-1', 'user-3'],
    history: [sampleHistoryEntries[0], sampleHistoryEntries[2]]
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
    attachments: [sampleAttachments[1]],
    comments: [sampleComments[2]],
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
    attachments: [sampleAttachments[2]],
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

// New functions for enhanced features
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

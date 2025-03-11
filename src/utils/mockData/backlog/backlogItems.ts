
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem, BacklogItemAttachment, BacklogItemComment } from '@/utils/types/backlogTypes';
import { mockReleases } from '@/utils/api/release/mockData';
import { sampleAttachments, sampleComments, sampleHistoryEntries } from './sampleData';
import { addDays, subDays } from 'date-fns';

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

// Get current date for creating relative dates in the sample data
const today = new Date();

// Define color themes for backlog items
export const backlogColorThemes = {
  default: {
    feature: "bg-blue-500",
    bug: "bg-red-500",
    enhancement: "bg-green-500",
    "technical-debt": "bg-purple-500",
    task: "bg-yellow-500"
  },
  pastel: {
    feature: "bg-blue-300",
    bug: "bg-red-300",
    enhancement: "bg-green-300",
    "technical-debt": "bg-purple-300",
    task: "bg-yellow-300"
  },
  vibrant: {
    feature: "bg-blue-600",
    bug: "bg-red-600",
    enhancement: "bg-green-600",
    "technical-debt": "bg-purple-600",
    task: "bg-amber-600"
  },
  status: {
    "open": "bg-gray-500",
    "in-progress": "bg-blue-500",
    "ready": "bg-yellow-500",
    "blocked": "bg-red-500",
    "completed": "bg-green-500",
    "deferred": "bg-purple-500"
  }
};

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
    createdAt: subDays(today, 30),
    updatedAt: subDays(today, 25),
    dueDate: addDays(today, 14),
    dependsOn: [],
    customColor: "",
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
    createdAt: subDays(today, 28),
    updatedAt: subDays(today, 28),
    dueDate: addDays(today, 7),
    dependsOn: ['BLGI-1001'],
    customColor: "",
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
    createdAt: subDays(today, 20),
    updatedAt: subDays(today, 20),
    dueDate: addDays(today, 21),
    dependsOn: ['BLGI-1001'],
    customColor: "",
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
    dueDate: addDays(today, 30),
    labels: ['api', 'quality'],
    createdAt: subDays(today, 15),
    updatedAt: subDays(today, 15),
    dependsOn: [],
    customColor: "",
    // Enhanced features
    attachments: [convertToBacklogItemAttachment(sampleAttachments[2])],
    history: [sampleHistoryEntries[0]]
  },
  // Adding more items with due dates to make the timeline more interesting
  {
    id: 'BLGI-1005',
    title: 'Implement dashboard analytics',
    description: 'Create analytics dashboard with charts and KPIs',
    status: 'in-progress',
    priority: 'high',
    type: 'feature',
    creator: 'user-1',
    assignee: 'user-3',
    storyPoints: 13,
    labels: ['analytics', 'dashboard', 'frontend'],
    createdAt: subDays(today, 40),
    updatedAt: subDays(today, 5),
    dueDate: addDays(today, 10),
    dependsOn: ['BLGI-1004'],
    customColor: "bg-teal-500",
  },
  {
    id: 'BLGI-1006',
    title: 'Optimize database queries',
    description: 'Improve performance of slow queries on the users table',
    status: 'ready',
    priority: 'medium',
    type: 'technical-debt',
    creator: 'user-2',
    assignee: 'user-1',
    storyPoints: 5,
    labels: ['performance', 'database'],
    createdAt: subDays(today, 25),
    updatedAt: subDays(today, 10),
    dueDate: addDays(today, 3),
    dependsOn: [],
    customColor: "",
  },
  {
    id: 'BLGI-1007',
    title: 'Implement dark mode',
    description: 'Add support for dark mode throughout the application',
    status: 'completed',
    priority: 'low',
    type: 'enhancement',
    creator: 'user-3',
    assignee: 'user-3',
    storyPoints: 8,
    labels: ['ui', 'design'],
    createdAt: subDays(today, 50),
    updatedAt: subDays(today, 2),
    dueDate: subDays(today, 2),
    dependsOn: [],
    customColor: "",
  },
  {
    id: 'BLGI-1008',
    title: 'Fix user profile photo upload',
    description: 'Photos are not being resized correctly when uploaded',
    status: 'blocked',
    priority: 'high',
    type: 'bug',
    creator: 'user-1',
    assignee: 'user-2',
    storyPoints: 3,
    labels: ['bug', 'user-profile', 'fileupload'],
    createdAt: subDays(today, 10),
    updatedAt: subDays(today, 8),
    dueDate: addDays(today, 5),
    dependsOn: ['BLGI-1002'],
    customColor: "bg-pink-500",
  },
  {
    id: 'BLGI-1009',
    title: 'Implement notification system',
    description: 'Create real-time notification system with websockets',
    status: 'in-progress',
    priority: 'high',
    type: 'feature',
    creator: 'user-3',
    assignee: 'user-1',
    storyPoints: 13,
    labels: ['notifications', 'real-time'],
    createdAt: subDays(today, 35),
    updatedAt: subDays(today, 15),
    dueDate: addDays(today, 25),
    dependsOn: ['BLGI-1001', 'BLGI-1005'],
    customColor: "",
  },
  {
    id: 'BLGI-1010',
    title: 'Upgrade React version',
    description: 'Update React to the latest version and fix any compatibility issues',
    status: 'deferred',
    priority: 'medium',
    type: 'technical-debt',
    creator: 'user-2',
    storyPoints: 5,
    labels: ['dependencies', 'technical'],
    createdAt: subDays(today, 60),
    updatedAt: subDays(today, 30),
    dueDate: addDays(today, 45),
    dependsOn: [],
    customColor: "",
  },
  {
    id: 'BLGI-1011',
    title: 'Add export to CSV functionality',
    description: 'Allow users to export data tables to CSV format',
    status: 'ready',
    priority: 'medium',
    type: 'enhancement',
    creator: 'user-1',
    assignee: 'user-3',
    storyPoints: 5,
    labels: ['export', 'data'],
    createdAt: subDays(today, 15),
    updatedAt: subDays(today, 10),
    dueDate: addDays(today, 8),
    dependsOn: [],
    customColor: "bg-indigo-400",
  },
  {
    id: 'BLGI-1012',
    title: 'Fix permission issues in admin panel',
    description: 'Some users with admin role cannot access certain settings',
    status: 'in-progress',
    priority: 'critical',
    type: 'bug',
    creator: 'user-3',
    assignee: 'user-2',
    storyPoints: 8,
    labels: ['security', 'permissions', 'admin'],
    createdAt: subDays(today, 5),
    updatedAt: subDays(today, 3),
    dueDate: addDays(today, 2),
    dependsOn: ['BLGI-1001'],
    customColor: "",
  },
  {
    id: 'BLGI-1013',
    title: 'Implement multi-factor authentication',
    description: 'Add support for MFA using authenticator apps',
    status: 'open',
    priority: 'high',
    type: 'feature',
    creator: 'user-2',
    storyPoints: 13,
    labels: ['security', 'authentication'],
    createdAt: subDays(today, 12),
    updatedAt: subDays(today, 12),
    dueDate: addDays(today, 40),
    dependsOn: ['BLGI-1001'],
    customColor: "",
  },
  {
    id: 'BLGI-1014',
    title: 'Create onboarding tutorial',
    description: 'Design and implement an interactive onboarding tutorial for new users',
    status: 'open',
    priority: 'medium',
    type: 'feature',
    creator: 'user-1',
    storyPoints: 8,
    labels: ['ux', 'onboarding'],
    createdAt: subDays(today, 8),
    updatedAt: subDays(today, 8),
    dueDate: addDays(today, 30),
    dependsOn: [],
    customColor: "bg-emerald-500",
  },
  {
    id: 'BLGI-1015',
    title: 'Optimize image loading performance',
    description: 'Implement lazy loading and image optimization for better performance',
    status: 'ready',
    priority: 'medium',
    type: 'enhancement',
    creator: 'user-3',
    assignee: 'user-1',
    storyPoints: 5,
    labels: ['performance', 'images'],
    createdAt: subDays(today, 18),
    updatedAt: subDays(today, 7),
    dueDate: addDays(today, 15),
    dependsOn: ['BLGI-1008'],
    customColor: "",
  },
  // Additional items for the timeline
  {
    id: 'BLGI-1016',
    title: 'Implement API rate limiting',
    description: 'Add rate limiting to prevent API abuse and improve security',
    status: 'open',
    priority: 'medium',
    type: 'technical-debt',
    creator: 'user-2',
    storyPoints: 5,
    labels: ['api', 'security'],
    createdAt: subDays(today, 14),
    updatedAt: subDays(today, 14),
    dueDate: addDays(today, 18),
    dependsOn: ['BLGI-1004'],
    customColor: "",
  },
  {
    id: 'BLGI-1017',
    title: 'Create user activity dashboard',
    description: 'Build an admin dashboard showing user activity metrics',
    status: 'open',
    priority: 'low',
    type: 'feature',
    creator: 'user-1',
    storyPoints: 8,
    labels: ['dashboard', 'admin'],
    createdAt: subDays(today, 10),
    updatedAt: subDays(today, 10),
    dueDate: addDays(today, 35),
    dependsOn: ['BLGI-1005'],
    customColor: "",
  },
  {
    id: 'BLGI-1018',
    title: 'Fix navigation sidebar responsiveness',
    description: 'Sidebar doesn\'t collapse properly on smaller screens',
    status: 'ready',
    priority: 'medium',
    type: 'bug',
    creator: 'user-3',
    assignee: 'user-2',
    storyPoints: 3,
    labels: ['ui', 'responsive'],
    createdAt: subDays(today, 7),
    updatedAt: subDays(today, 5),
    dueDate: addDays(today, 4),
    dependsOn: [],
    customColor: "",
  },
  {
    id: 'BLGI-1019',
    title: 'Add keyboard shortcuts',
    description: 'Implement keyboard shortcuts for common actions',
    status: 'in-progress',
    priority: 'low',
    type: 'enhancement',
    creator: 'user-2',
    assignee: 'user-1',
    storyPoints: 3,
    labels: ['ux', 'accessibility'],
    createdAt: subDays(today, 20),
    updatedAt: subDays(today, 15),
    dueDate: addDays(today, 7),
    dependsOn: [],
    customColor: "bg-cyan-500",
  },
  {
    id: 'BLGI-1020',
    title: 'Implement content moderation system',
    description: 'Create system to filter inappropriate content in user-generated content',
    status: 'open',
    priority: 'high',
    type: 'feature',
    creator: 'user-1',
    storyPoints: 13,
    labels: ['moderation', 'security'],
    createdAt: subDays(today, 5),
    updatedAt: subDays(today, 5),
    dueDate: addDays(today, 25),
    dependsOn: [],
    customColor: "",
  }
];

// Generate backlog ID
export const generateBacklogItemId = (): string => {
  const lastId = backlogItems.length > 0 
    ? parseInt(backlogItems[backlogItems.length - 1].id.split('-')[1])
    : 1000;
  return `BLGI-${lastId + 1}`;
};

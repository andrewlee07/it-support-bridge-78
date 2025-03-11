
import { Attachment, HistoryEntry, Comment } from '@/utils/types/backlogTypes';

// Sample attachments for demo items
export const sampleAttachments: Attachment[] = [
  {
    id: 'att-1',
    filename: 'requirements.pdf',
    fileUrl: '/files/requirements.pdf',
    fileType: 'application/pdf',
    fileSize: 2453000,
    uploadedBy: 'user-1',
    uploadedAt: new Date('2023-10-02'),
    // Backward compatibility
    fileName: 'requirements.pdf',
    name: 'requirements.pdf',
    url: '/files/requirements.pdf'
  },
  {
    id: 'att-2',
    filename: 'mockup.png',
    fileUrl: '/files/mockup.png',
    fileType: 'image/png',
    fileSize: 1250000,
    uploadedBy: 'user-2',
    uploadedAt: new Date('2023-10-03'),
    // Backward compatibility
    fileName: 'mockup.png',
    name: 'mockup.png',
    url: '/files/mockup.png'
  },
  {
    id: 'att-3',
    filename: 'api-specs.json',
    fileUrl: '/files/api-specs.json',
    fileType: 'application/json',
    fileSize: 15200,
    uploadedBy: 'user-3',
    uploadedAt: new Date('2023-10-04'),
    // Backward compatibility
    fileName: 'api-specs.json',
    name: 'api-specs.json',
    url: '/files/api-specs.json'
  }
];

// Sample comments for demo items
export const sampleComments: Comment[] = [
  {
    id: 'comment-1',
    content: 'We need to consider mobile responsiveness for this feature.',
    text: 'We need to consider mobile responsiveness for this feature.',
    author: 'user-1',
    createdAt: new Date('2023-10-02T10:30:00'),
  },
  {
    id: 'comment-2',
    content: 'I agree. Let me check with the design team.',
    text: 'I agree. Let me check with the design team.',
    author: 'user-2',
    createdAt: new Date('2023-10-02T11:15:00'),
    parentId: 'comment-1'
  },
  {
    id: 'comment-3',
    content: 'The design team confirmed they will provide mobile mockups by tomorrow.',
    text: 'The design team confirmed they will provide mobile mockups by tomorrow.',
    author: 'user-2',
    createdAt: new Date('2023-10-03T09:45:00'),
  }
];

// Sample history entries
export const sampleHistoryEntries: HistoryEntry[] = [
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

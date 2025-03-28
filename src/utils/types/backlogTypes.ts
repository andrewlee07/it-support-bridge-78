// Add the missing types for Attachment and Comment
export interface Attachment {
  id: string;
  filename: string;
  uploadDate: Date;
  uploadedBy: string;
  size?: number;
  type?: string;
  
  // For compatibility with existing code
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt?: Date;
  fileName?: string;
  name?: string;
  url?: string;
}

export interface Comment {
  id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
  
  // For compatibility with existing code
  content?: string;
  parentId?: string;
}

export interface Watcher {
  id: string;
  userId: string;
  itemId: string;
  createdAt: Date;
}

// For compatibility with HistoryEntry references
export interface HistoryEvent {
  id: string;
  itemId: string;
  userId: string;
  action: string;
  timestamp: Date;
  oldValue?: string;
  newValue?: string;
  field?: string;
}

export type HistoryEntry = HistoryEvent;

export type BacklogViewType = 'list' | 'kanban' | 'timeline' | 'gantt' | 'calendar';

// For BacklogTestCoverage
export interface BacklogTestCoverage {
  backlogItemId: string;
  testCases: number;
  passed: number;
  failed: number;
  blocked: number;
  notRun: number;
  totalTests?: number;
}

// For BacklogStats
export interface BacklogStats {
  total: number;
  byStatus: Record<string, number>;
  byAssignee: Record<string, number>;
  byPriority: Record<string, number>;
  byPoint: Record<string, number>;
}

// Add support for dependsOn to BacklogItem
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  storyPoints: number;
  assignee?: string;
  reporter: string;
  sprintId?: string;
  releaseId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  labels?: string[];
  attachments?: Attachment[];
  comments?: Comment[];
  watchers?: Watcher[];
  history?: HistoryEntry[];
  testCoverage?: BacklogTestCoverage;
  progress?: number;
  businessValue?: number;
  acceptanceCriteria?: string;
  isReady?: boolean;
  blockedReason?: string;
  order?: number;
  dependsOn?: string[];
  relatedTestCaseIds?: string[];
  createdBy?: string;
}

export const calculateReleaseCapacity = (points: number, velocity: number): number => {
  return Math.ceil(points / velocity);
};

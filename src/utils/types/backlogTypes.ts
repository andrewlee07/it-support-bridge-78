
export type BacklogItemStatus = 'open' | 'in-progress' | 'ready' | 'blocked' | 'completed' | 'deferred';
export type BacklogItemPriority = 'critical' | 'high' | 'medium' | 'low';
export type BacklogItemType = 'feature' | 'bug' | 'task' | 'enhancement' | 'technical-debt';

// Add missing types for test coverage
export interface BacklogTestCoverage {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  lastRun?: Date;
}

// Update Comment interface to include both text and content
export interface Comment {
  id: string;
  text?: string; // For backward compatibility
  content: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
}

// Update Attachment interface
export interface Attachment {
  id: string;
  filename: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
}

// Update HistoryEntry interface
export interface HistoryEntry {
  id: string;
  field: string;
  previousValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date;
}

export interface BacklogItemComment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string; // Add support for nested comments
}

export interface BacklogItemAttachment {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Update BacklogItem interface with missing properties
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: BacklogItemStatus;
  priority: BacklogItemPriority;
  type: BacklogItemType;
  assignee?: string;
  creator: string; // Add creator field
  releaseId?: string;
  relatedItemId?: string;
  relatedItemType?: 'bug' | 'testcase';
  createdAt: Date;
  updatedAt: Date;
  history?: HistoryEntry[];
  attachments?: BacklogItemAttachment[];
  comments?: BacklogItemComment[];
  watchers?: string[];
  sprintId?: string;
  goals?: string[];
  storyPoints?: number;
  labels?: string[]; // Add labels field
  dueDate?: Date; // Add dueDate field
  testCoverage?: BacklogTestCoverage; // Add test coverage
  relatedBugIds?: string[]; // Add related bugs
  relatedTestCaseIds?: string[]; // Add related test cases
}

export interface BacklogStats {
  totalItems: number;
  openItems: number;
  completedItems: number;
  inProgressItems: number;
  blockedItems: number;
}

// Add utility functions that were referenced
export const calculateReleaseCapacity = (backlogItems: BacklogItem[], targetCapacity: number): number => {
  const totalPoints = backlogItems.reduce((sum, item) => sum + (item.storyPoints || 0), 0);
  return targetCapacity > 0 ? Math.min((totalPoints / targetCapacity) * 100, 100) : 0;
};

export const filterBacklogItemsByRelease = (items: BacklogItem[], releaseId: string): BacklogItem[] => {
  return items.filter(item => item.releaseId === releaseId);
};

export const filterBacklogItemsByLabel = (items: BacklogItem[], label: string): BacklogItem[] => {
  return items.filter(item => item.labels?.includes(label));
};

export const filterBacklogItemsByTestCoverage = (items: BacklogItem[], minCoverage: number): BacklogItem[] => {
  return items.filter(item => {
    const coverage = item.testCoverage;
    if (!coverage) return false;
    return (coverage.passedTests / coverage.totalTests) * 100 >= minCoverage;
  });
};

export const getBacklogItemsWithoutTests = (items: BacklogItem[]): BacklogItem[] => {
  return items.filter(item => !item.testCoverage || item.testCoverage.totalTests === 0);
};

export const getBacklogItemsWithFailingTests = (items: BacklogItem[]): BacklogItem[] => {
  return items.filter(item => item.testCoverage?.failedTests > 0);
};

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  items: BacklogItem[];
  releaseId?: string;
}

export interface SprintRelease {
  id: string;
  name: string;
  plannedDate: Date;
  sprints: Sprint[];
  items: BacklogItem[];
}

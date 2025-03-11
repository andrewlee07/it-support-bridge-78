
export type BacklogItemStatus = 'open' | 'in-progress' | 'ready' | 'blocked' | 'completed' | 'deferred';
export type BacklogItemPriority = 'critical' | 'high' | 'medium' | 'low';
export type BacklogItemType = 'feature' | 'bug' | 'task' | 'enhancement' | 'technical-debt';

// Test coverage interface to match usage in TestCoverageIndicator and related components
export interface BacklogTestCoverage {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  lastRun?: Date;
  
  // Add these for backward compatibility with existing code
  coveragePercentage?: number;
  totalTestCases?: number;
  notExecutedTests?: number;
  passed?: number;
  failed?: number;
  covered?: number;
  total?: number;
  lastUpdated?: Date; // For compatibility with TraceabilityMatrix and test integration
}

// Comment interface - ensuring both text and content fields are available
export interface Comment {
  id: string;
  content: string; // Primary field for comment content
  text: string;    // For backward compatibility - making it required
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
}

// BacklogItemComment - keep both fields for compatibility
export interface BacklogItemComment {
  id: string;
  text: string;         // Primary field for backward compatibility
  content?: string;     // For forward compatibility
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;    // Add support for nested comments
}

// Attachment interface with proper naming conventions and backward compatibility
export interface Attachment {
  id: string;
  filename: string;     // Primary field
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  
  // For backward compatibility
  fileName?: string;
  name?: string;
  url?: string;
}

// BacklogItemAttachment with backward compatibility
export interface BacklogItemAttachment {
  id: string;
  filename: string;     // Align with new naming
  url: string;          // For backward compatibility
  uploadedBy: string;
  uploadedAt: Date;
  
  // Add fields to improve compatibility with Attachment
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
}

// HistoryEntry interface
export interface HistoryEntry {
  id: string;
  field: string;
  previousValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date;
}

// Update BacklogItem interface with all needed properties
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: BacklogItemStatus;
  priority: BacklogItemPriority;
  type: BacklogItemType;
  assignee?: string;
  creator: string;
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
  labels?: string[];
  dueDate?: Date;
  testCoverage?: BacklogTestCoverage;
  relatedBugIds?: string[];
  relatedTestCaseIds?: string[];
  dependsOn?: string[]; // Items this backlog item depends on
  customColor?: string; // Custom color for the item in the timeline
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
    
    // Calculate percentage based on available properties
    const total = coverage.totalTests || coverage.total || 0;
    const passed = coverage.passedTests || coverage.passed || 0;
    if (total === 0) return false;
    
    return (passed / total) * 100 >= minCoverage;
  });
};

export const getBacklogItemsWithoutTests = (items: BacklogItem[]): BacklogItem[] => {
  return items.filter(item => !item.testCoverage || item.testCoverage.totalTests === 0);
};

export const getBacklogItemsWithFailingTests = (items: BacklogItem[]): BacklogItem[] => {
  return items.filter(item => {
    const failedTests = item.testCoverage?.failedTests || item.testCoverage?.failed || 0;
    return failedTests > 0;
  });
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

export type BacklogViewType = 'kanban' | 'list' | 'timeline' | 'reporting';

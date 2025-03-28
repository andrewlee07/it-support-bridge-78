export type BacklogItemType = 'feature' | 'bug' | 'task' | 'enhancement' | 'technical-debt';
export type BacklogItemStatus = 
  'open' | 
  'in-progress' | 
  'ready' | 
  'blocked' | 
  'completed' | 
  'deferred';
export type BacklogItemPriority = 'critical' | 'high' | 'medium' | 'low';

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
  storyPoints?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
  labels: string[];
  testCoverage?: BacklogTestCoverage;
  passedTests?: number;
  failedTests?: number;
  totalTests?: number;
  attachments?: Attachment[];
  comments?: Comment[];
  watchers?: Watcher[];
  history?: HistoryEvent[];
  relatedBugIds?: string[];
}

export interface BacklogTestCoverage {
  coveragePercentage?: number;
  covered?: number;
  total?: number;
  passedTests?: number;
  failedTests?: number;
  skippedTests?: number;
  pendingTests?: number;
  tests?: any[];
  lastRun?: Date;
  passed?: number;
  failed?: number;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadDate: Date;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Watcher {
  id: string;
  userId: string;
  name: string;
  email: string;
}

export interface HistoryEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  details: string;
}

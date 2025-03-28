
// For backlog items
export type BacklogItemStatus = 'open' | 'in-progress' | 'review' | 'done' | 'blocked';
export type BacklogItemPriority = 'high' | 'medium' | 'low';
export type BacklogItemType = 'feature' | 'bug' | 'technical-debt' | 'improvement';

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: string; // Using string for flexibility
  priority: string;
  type: string;
  storyPoints?: number;
  sprint?: string | null;
  assignedTo?: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date | null;
  completedAt?: Date | null;
  comments?: any[];
  attachments?: any[];
  labels?: string[];
  sourceId?: string;
  sourceType?: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  goal: string;
  items: string[]; // Array of backlog item IDs
}

export interface BacklogTestCoverage {
  backlogItemId: string;
  totalTestCases: number;
  passedTestCases: number;
  failedTestCases: number;
  blockedTestCases: number;
  notRunTestCases: number;
  coverage: number; // Percentage
}

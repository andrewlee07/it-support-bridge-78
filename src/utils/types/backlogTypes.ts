export type BacklogItemStatus = 'open' | 'in-progress' | 'ready' | 'blocked' | 'completed' | 'deferred';
export type BacklogItemPriority = 'critical' | 'high' | 'medium' | 'low';
export type BacklogItemType = 'feature' | 'bug' | 'task' | 'enhancement' | 'technical-debt';

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: BacklogItemStatus;
  priority: BacklogItemPriority;
  type: BacklogItemType;
  assignee?: string;
  releaseId?: string;
  relatedItemId?: string;
  relatedItemType?: 'bug' | 'testcase';
  createdAt: Date;
  updatedAt: Date;
  history?: BacklogItemHistory[];
  attachments?: BacklogItemAttachment[];
  comments?: BacklogItemComment[];
  watchers?: string[];
  sprintId?: string;
  goals?: string[];
  storyPoints?: number;
}

export interface BacklogItemHistory {
  id: string;
  field: string;
  previousValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date;
}

export interface BacklogItemAttachment {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface BacklogItemComment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface BacklogStats {
  totalItems: number;
  openItems: number;
  completedItems: number;
  inProgressItems: number;
  blockedItems: number;
}

export const calculateReleaseCapacity = (backlogItems: BacklogItem[], targetCapacity: number): number => {
  const totalPoints = backlogItems.reduce((sum, item) => sum + (item.storyPoints || 0), 0);
  return targetCapacity > 0 ? Math.min((totalPoints / targetCapacity) * 100, 100) : 0;
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

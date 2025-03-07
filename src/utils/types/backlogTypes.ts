
// Backlog Item Management Types

// Status types
export type BacklogItemStatus = 'open' | 'in-progress' | 'ready' | 'blocked' | 'completed' | 'deferred';
export type BacklogItemPriority = 'critical' | 'high' | 'medium' | 'low';
export type BacklogItemType = 'feature' | 'bug' | 'task' | 'enhancement' | 'technical-debt';

// BacklogItem entity
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  status: BacklogItemStatus;
  priority: BacklogItemPriority;
  type: BacklogItemType;
  assignee?: string; // User ID
  creator: string; // User ID
  releaseId?: string; // Related Release ID
  relatedItemId?: string; // Related Bug ID or TestCase ID
  relatedItemType?: 'bug' | 'testcase';
  storyPoints?: number; // For capacity planning
  dueDate?: Date; // Important for release planning
  labels: string[]; // Tags for filtering
  createdAt: Date;
  updatedAt: Date;
}

// API response types for Backlog Management
export interface BacklogStats {
  totalItems: number;
  openItems: number;
  completedItems: number;
  blockedItems: number;
  byRelease: {
    releaseId: string;
    releaseName: string;
    itemCount: number;
    completedCount: number;
  }[];
  byAssignee: {
    assigneeId: string;
    assigneeName: string;
    itemCount: number;
  }[];
}

// For CSV Export
export interface ExportableBacklogItem extends Omit<BacklogItem, 'createdAt' | 'updatedAt' | 'dueDate'> {
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

// Helper function to calculate capacity percentage for a release
export const calculateReleaseCapacity = (
  backlogItems: BacklogItem[],
  targetCapacity: number
): number => {
  const totalPoints = backlogItems.reduce((sum, item) => sum + (item.storyPoints || 0), 0);
  return Math.min(100, Math.round((totalPoints / targetCapacity) * 100));
};

// Helper functions for filtering backlog items
export const filterBacklogItemsByRelease = (items: BacklogItem[], releaseId?: string): BacklogItem[] => {
  if (!releaseId) {
    return items.filter(item => !item.releaseId); // Unassigned items
  }
  return items.filter(item => item.releaseId === releaseId);
};

export const filterBacklogItemsByLabel = (items: BacklogItem[], label: string): BacklogItem[] => {
  return items.filter(item => item.labels.includes(label));
};

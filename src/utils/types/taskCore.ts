
// Core Task Type Definitions

// Status types
export type TaskStatus = 'new' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

// Task entity
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string; // User ID
  creator: string; // User ID
  relatedItemId?: string; // Related Incident, Service Request, etc.
  relatedItemType?: 'incident' | 'service-request' | 'task';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: TaskNote[];
  attachments?: TaskAttachment[];
}

export interface TaskNote {
  id: string;
  content: string;
  author: string; // User ID
  createdAt: Date;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Task stats for dashboard
export interface TaskStats {
  totalTasks: number;
  newTasks: number;
  inProgressTasks: number;
  onHoldTasks: number;
  completedTasks: number;
  cancelledTasks: number;
  overdueCount: number;
}

// For CSV Export
export interface ExportableTask extends Omit<Task, 'createdAt' | 'updatedAt' | 'dueDate'> {
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}


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
  // New enhanced features
  dependsOn?: string[]; // IDs of tasks this task depends on
  blockedBy?: string[]; // IDs of tasks blocking this one
  checklist?: ChecklistItem[];
  timeTracking?: TimeTracking;
  estimatedHours?: number;
  isTemplate?: boolean;
  templateId?: string; // If created from a template
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

// New interfaces for enhanced features
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimeTracking {
  totalTimeSpent: number; // In minutes
  entries: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // In minutes
  description?: string;
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

// Form values for task creation/editing
export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  relatedItemId?: string;
  relatedItemType?: 'incident' | 'service-request' | 'task';
  dueDate?: Date;
  estimatedHours?: number;
  isTemplate?: boolean;
  checklist?: ChecklistItem[];
  dependsOn?: string[];
  blockedBy?: string[];
}

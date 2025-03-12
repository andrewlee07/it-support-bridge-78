
import { User } from './user';
import { AttachmentType } from './backlogTypes';

export type TaskStatus = 'new' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type ChecklistItemStatus = 'pending' | 'completed';

export interface TaskLabel {
  id: string;
  name: string;
  color: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  timeSpent: number;
  date: string;
}

export interface ChecklistItem {
  id: string;
  content: string;
  status: ChecklistItemStatus;
  createdAt: string;
  completedAt?: string;
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
  dependencyType: 'blocks' | 'blocked-by' | 'related';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  creator: string;
  labels?: TaskLabel[];
  checklist?: ChecklistItem[];
  dependencies?: TaskDependency[];
  parentTaskId?: string;
  sprint?: string;
  estimate?: number;
  attachments?: AttachmentType[];
  relatedItems?: Array<{ id: string; type: string; title: string; }>;
  teamId?: string;
  points?: number;
  timeTracking?: {
    totalTimeSpent: number;
    entries: TimeEntry[];
  };
  watchers?: string[];
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  creator: string;
  labels?: string[];
  estimate?: number;
  parentTaskId?: string;
  sprint?: string;
  teamId?: string;
}

export interface TaskStats {
  newTasks: number;
  inProgressTasks: number;
  onHoldTasks: number;
  completedTasks: number;
  cancelledTasks: number;
  overdueCount: number;
  totalTasks: number;
}

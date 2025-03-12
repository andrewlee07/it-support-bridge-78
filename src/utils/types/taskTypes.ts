
import { User } from './user';
import { Attachment } from './backlogTypes';

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
  
  // For backward compatibility with code that uses text/completed properties
  text: string;
  completed: boolean;
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
  dependencyType: 'blocks' | 'blocked-by' | 'related';
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
  
  // For backward compatibility
  fileName?: string;
  fileUrl?: string;
  fileType?: string;
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
  attachments?: TaskAttachment[];
  relatedItems?: Array<{ id: string; type: string; title: string; }>;
  teamId?: string;
  points?: number;
  timeTracking?: {
    totalTimeSpent: number;
    entries: TimeEntry[];
  };
  watchers?: string[];
  
  // For backward compatibility with existing code
  relatedItemId?: string;
  relatedItemType?: string;
  estimatedHours?: number;
  isTemplate?: boolean;
  templateName?: string;
  dependsOn?: string[];
  blockedBy?: string[];
  notes?: any[];
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

// Re-export utility functions from taskCore
export { isTaskOverdue, isTaskDueSoon } from '../tasks/taskVisualUtils';

// Re-export the visual helpers from the task utils
export { 
  getTaskStatusVisuals,
  getTaskPriorityVisuals
} from '../tasks/taskVisualUtils';

export {
  getStatusColor as getTaskStatusColor,
  getStatusName,
  getStatusIcon,
  getNextStatuses
} from '../tasks/taskStatusUtils';

export {
  getPriorityColor as getTaskPriorityColor,
  getPriorityName,
  getPriorityIcon,
  getPriorityValue
} from '../tasks/taskPriorityUtils';


import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'new' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
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
  updatedAt?: string;
  completedAt?: string;
  checklist?: ChecklistItem[];
  attachments?: TaskAttachment[];
  parentTaskId?: string;
  dependencies?: string[];
  estimatedHours?: number;
  actualHours?: number;
  relatedItemId?: string;
  relatedItemType?: string;
  isTemplate?: boolean;
  templateName?: string;
  tags?: string[];
}

export function isTaskOverdue(task: Task): boolean {
  // If the task is already completed or cancelled, it's not overdue
  if (task.status === 'completed' || task.status === 'cancelled') {
    return false;
  }
  
  // If there's no due date, it can't be overdue
  if (!task.dueDate) {
    return false;
  }
  
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  
  // Set both dates to midnight for comparison
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return dueDate < today;
}

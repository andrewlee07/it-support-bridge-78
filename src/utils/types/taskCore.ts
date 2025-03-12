
import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'new' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string; // Make this a string to prevent type errors
  completedAt?: string;
}

export interface TaskAttachment {
  id: string;
  name: string; // Original field
  fileName?: string; // For backward compatibility
  url: string; // Original field
  fileUrl?: string; // For backward compatibility
  type: string; // Original field
  fileType?: string; // For backward compatibility
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  creator?: string;
  dueDate?: string; // Changed from Date to string
  createdAt: string; // Changed from Date to string
  updatedAt?: string; // Changed from Date to string
  completedAt?: string;
  checklist?: ChecklistItem[];
  attachments?: TaskAttachment[];
  parentTaskId?: string;
  dependencies?: string[];
  dependsOn?: string[]; // Added for backward compatibility
  blockedBy?: string[]; // Added for backward compatibility
  estimatedHours?: number;
  actualHours?: number;
  relatedItemId?: string;
  relatedItemType?: string;
  isTemplate?: boolean;
  templateName?: string;
  tags?: string[];
  notes?: any[]; // Added for notes support
  timeTracking?: {
    totalTimeSpent: number;
    entries: TimeEntry[];
  };
}

export interface TaskStats {
  totalTasks: number;
  newTasks: number;
  inProgressTasks: number;
  onHoldTasks: number;
  completedTasks: number;
  cancelledTasks: number;
  overdueCount: number;
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

// Add the missing utility function for checking if a task is due soon
export function isTaskDueSoon(task: Task, hoursThreshold: number = 24): boolean {
  // If the task is already completed or cancelled or has no due date, it's not due soon
  if (task.status === 'completed' || task.status === 'cancelled' || !task.dueDate) {
    return false;
  }
  
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  
  // Calculate the time difference in hours
  const timeDiff = dueDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  // If the due date is in the past, it's not "due soon" but "overdue"
  if (hoursDiff < 0) {
    return false;
  }
  
  // It's due soon if the difference is less than the threshold
  return hoursDiff <= hoursThreshold;
}

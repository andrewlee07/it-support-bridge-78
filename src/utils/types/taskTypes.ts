
// Task Management Types

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

// Helper functions
export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate) return false;
  if (task.status === 'completed' || task.status === 'cancelled') return false;
  return new Date(task.dueDate) < new Date();
};

export const isTaskDueSoon = (task: Task, thresholdHours: number = 24): boolean => {
  if (!task.dueDate) return false;
  if (task.status === 'completed' || task.status === 'cancelled') return false;
  
  const now = new Date();
  const due = new Date(task.dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  return diffHours > 0 && diffHours <= thresholdHours;
};

export const getTaskPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'critical': return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'high': return 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    case 'medium': return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    case 'low': return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    default: return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
};

export const getTaskStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'new': return 'text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'in-progress': return 'text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
    case 'on-hold': return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    case 'completed': return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'cancelled': return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    default: return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
};

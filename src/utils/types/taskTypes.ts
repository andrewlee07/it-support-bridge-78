
export type TaskStatus = 'open' | 'in-progress' | 'ready' | 'blocked' | 'completed' | 'deferred' | 'cancelled' | 'new' | 'on-hold';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  createdBy: string;
  assignedTo: string | null;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  completedAt: Date | null;
  estimatedHours: number;
  actualHours: number;
  attachments: any[];
  relatedItemId: string | null;
  relatedItemType: string | null;
  // Additional properties for enhanced functionality
  checklist?: ChecklistItem[];
  dependsOn?: string[];
  blockedBy?: string[];
  isTemplate?: boolean;
  templateId?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  content?: string;
  completed: boolean;
  status?: string;
  createdAt?: string;
  completedAt?: string;
}

export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadDate: Date;
  downloadUrl: string;
}

export interface TaskStats {
  total: number;
  overdue: number;
  dueToday: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  byAssignee: Record<string, number>;
  completedThisWeek: number;
  completedThisMonth: number;
  averageCompletionTime: number;
}

// Function to check if a task is overdue
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

// Function to check if a task is due soon (within the next 24 hours by default)
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

// Function to get task status color
export function getTaskStatusColor(status: TaskStatus): string {
  switch (status) {
    case 'open':
    case 'new':
      return 'blue';
    case 'in-progress':
      return 'purple';
    case 'ready':
      return 'emerald';
    case 'blocked':
    case 'on-hold':
      return 'amber';
    case 'completed':
      return 'green';
    case 'deferred':
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
}

// Function to get task priority color
export function getTaskPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'red';
    case 'high':
      return 'orange';
    case 'medium':
      return 'yellow';
    case 'low':
      return 'green';
    default:
      return 'gray';
  }
}

// Function to get visual styles for task status
export function getTaskStatusVisuals(status: TaskStatus) {
  switch (status) {
    case 'new':
    case 'open':
      return {
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
        border: 'border-blue-200 dark:border-blue-600'
      };
    case 'in-progress':
      return {
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-800',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
        border: 'border-purple-200 dark:border-purple-600'
      };
    case 'ready':
      return {
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-200 dark:text-emerald-800',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        hoverBg: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10',
        border: 'border-emerald-200 dark:border-emerald-600'
      };
    case 'blocked':
    case 'on-hold':
      return {
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-200 dark:text-amber-800',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-900/10',
        border: 'border-amber-200 dark:border-amber-600'
      };
    case 'completed':
      return {
        badge: 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-800',
        bg: 'bg-green-50 dark:bg-green-900/20',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/10',
        border: 'border-green-200 dark:border-green-600'
      };
    case 'deferred':
    case 'cancelled':
      return {
        badge: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-800',
        bg: 'bg-red-50 dark:bg-red-900/20',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/10',
        border: 'border-red-200 dark:border-red-600'
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-800',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/10',
        border: 'border-gray-200 dark:border-gray-600'
      };
  }
}

// Function to get visual styles for task priority
export function getTaskPriorityVisuals(priority: TaskPriority) {
  switch (priority) {
    case 'critical':
      return {
        badge: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-800',
        bg: 'bg-red-50 dark:bg-red-900/20',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/10',
        border: 'border-red-200 dark:border-red-600'
      };
    case 'high':
      return {
        badge: 'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-800',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/10',
        border: 'border-orange-200 dark:border-orange-600'
      };
    case 'medium':
      return {
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-800',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10',
        border: 'border-yellow-200 dark:border-yellow-600'
      };
    case 'low':
      return {
        badge: 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-800',
        bg: 'bg-green-50 dark:bg-green-900/20',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/10',
        border: 'border-green-200 dark:border-green-600'
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-800',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/10',
        border: 'border-gray-200 dark:border-gray-600'
      };
  }
}

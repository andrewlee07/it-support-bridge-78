
import { Task, TaskStatus } from '../types/taskTypes';
import { differenceInDays } from 'date-fns';

// Check if a task is overdue
export const isTaskOverdue = (task: Task): boolean => {
  if (task.status === 'completed' || task.status === 'cancelled' || !task.dueDate) {
    return false;
  }
  
  const dueDate = new Date(task.dueDate);
  return dueDate < new Date();
};

// Check if a task is due soon (within hours)
export const isTaskDueSoon = (task: Task, hoursThreshold = 24): boolean => {
  if (task.status === 'completed' || task.status === 'cancelled' || !task.dueDate) {
    return false;
  }
  
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  
  // If already overdue, it's not "due soon" - it's overdue
  if (dueDate < now) {
    return false;
  }
  
  // Calculate difference in hours
  const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffHours <= hoursThreshold;
};

// Get color for task status
export const getTaskStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'in-progress':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'on-hold':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Get status visual properties
export const getTaskStatusVisuals = (status: TaskStatus) => {
  switch (status) {
    case 'new':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        text: 'text-blue-700 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-950/10',
        border: 'border-blue-200 dark:border-blue-800',
      };
    case 'in-progress':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        text: 'text-purple-700 dark:text-purple-400',
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900',
        hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-950/10',
        border: 'border-purple-200 dark:border-purple-800',
      };
    case 'on-hold':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/20',
        text: 'text-amber-700 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900',
        hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-950/10',
        border: 'border-amber-200 dark:border-amber-800',
      };
    case 'completed':
      return {
        bg: 'bg-green-50 dark:bg-green-950/20',
        text: 'text-green-700 dark:text-green-400',
        badge: 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-950/10',
        border: 'border-green-200 dark:border-green-800',
      };
    case 'cancelled':
      return {
        bg: 'bg-gray-50 dark:bg-gray-800/20',
        text: 'text-gray-700 dark:text-gray-400',
        badge: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-800/10',
        border: 'border-gray-200 dark:border-gray-700',
      };
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-800/20',
        text: 'text-gray-700 dark:text-gray-400',
        badge: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-800/10',
        border: 'border-gray-200 dark:border-gray-700',
      };
  }
};

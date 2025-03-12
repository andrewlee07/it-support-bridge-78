
import { TaskPriority } from '../types/taskTypes';

// Get the color for a task priority
export const getTaskPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Get priority visual properties
export const getTaskPriorityVisuals = (priority: TaskPriority) => {
  switch (priority) {
    case 'critical':
      return {
        bg: 'bg-red-50 dark:bg-red-950/20',
        text: 'text-red-700 dark:text-red-400',
        badge: 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-950/10',
        border: 'border-red-200 dark:border-red-800',
      };
    case 'high':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        text: 'text-orange-700 dark:text-orange-400',
        badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/70 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900',
        hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-950/10',
        border: 'border-orange-200 dark:border-orange-800',
      };
    case 'medium':
      return {
        bg: 'bg-yellow-50 dark:bg-yellow-950/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900',
        hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-950/10',
        border: 'border-yellow-200 dark:border-yellow-800',
      };
    case 'low':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        text: 'text-blue-700 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-950/10',
        border: 'border-blue-200 dark:border-blue-800',
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

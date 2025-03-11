
import { TaskPriority } from '../types/taskCore';

// Return simple color classes for priority
export const getTaskPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'critical': return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'high': return 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    case 'medium': return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    case 'low': return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    default: return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
};

// Return more specific classes for priority visualization
export const getTaskPriorityVisuals = (priority: TaskPriority) => {
  switch (priority) {
    case 'critical':
      return {
        color: 'text-red-700 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        borderColor: 'border-red-300 dark:border-red-700',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/50',
        iconClass: 'text-red-500',
        badge: 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
        animation: 'animate-pulse'
      };
    case 'high':
      return {
        color: 'text-orange-700 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        borderColor: 'border-orange-300 dark:border-orange-700',
        hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/50',
        iconClass: 'text-orange-500',
        badge: 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
      };
    case 'medium':
      return {
        color: 'text-yellow-700 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        borderColor: 'border-yellow-300 dark:border-yellow-700',
        hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/50',
        iconClass: 'text-yellow-500',
        badge: 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      };
    case 'low':
      return {
        color: 'text-green-700 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        borderColor: 'border-green-300 dark:border-green-700',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/50',
        iconClass: 'text-green-500',
        badge: 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      };
    default:
      return {
        color: 'text-gray-700 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-900/30',
        borderColor: 'border-gray-300 dark:border-gray-700',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
        iconClass: 'text-gray-500',
        badge: 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
      };
  }
};

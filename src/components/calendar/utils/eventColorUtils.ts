
import { CalendarEvent } from '@/utils/types/calendar';

// Helper function to get event color class for internal components
export const getEventColorClass = (event: CalendarEvent): string => {
  if (event.type === 'change') {
    return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700';
  } else if (event.type === 'release') {
    return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700';
  } else {
    // Default color for any other event types
    return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700';
  }
};

// Helper function to get event color based on type and status for consistent appearance
export const getEventStatusColor = (type: string, status: string): string => {
  // Change request colors - follow style guide status colors
  if (type === 'change') {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700';
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700';
      case 'in-progress':
      case 'in progress':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700';
      case 'completed':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700';
    }
  } 
  // Release colors
  else if (type === 'release') {
    switch (status.toLowerCase()) {
      case 'planned':
        return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700';
      case 'in progress':
      case 'in-progress':
        return 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700';
      case 'deployed':
      case 'completed':
        return 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700';
    }
  }
  // Default colors
  else {
    return 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700';
  }
};

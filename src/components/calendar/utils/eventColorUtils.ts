
import { CalendarEvent } from '@/utils/types/calendar';

// Helper function to get event color class for internal components
export const getEventColorClass = (event: CalendarEvent): string => {
  if (event.type === 'change') {
    return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700';
  } else if (event.type === 'incident') {
    return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700';
  } else if (event.type === 'maintenance') {
    return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700';
  } else if (event.type === 'release') {
    return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700';
  } else {
    return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700';
  }
};

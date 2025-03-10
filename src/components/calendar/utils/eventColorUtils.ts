
import { CalendarEvent } from '@/utils/types/calendar';

// Helper function to get event color class for internal components
export const getEventColorClass = (event: CalendarEvent): string => {
  if (event.type === 'change') {
    return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700';
  } else {
    return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700';
  }
};

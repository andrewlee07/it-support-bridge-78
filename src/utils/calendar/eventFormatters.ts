
import { format } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import { ChangeRequest } from '@/utils/types/change';
import { Release } from '@/utils/types/release';

/**
 * Converts a change request to a calendar event
 */
export const changeRequestToCalendarEvent = (change: ChangeRequest): CalendarEvent => {
  return {
    id: `change-${change.id}`,
    entityId: change.id,
    title: change.title,
    description: change.description,
    date: change.startDate,
    endDate: change.endDate,
    type: 'change',
    status: change.status,
    owner: change.createdBy,
    impact: `Risk Level: ${change.riskLevel.toUpperCase()}`
  };
};

/**
 * Converts a release to a calendar event
 */
export const releaseToCalendarEvent = (release: Release): CalendarEvent => {
  // Ensure date is a Date object
  const plannedDate = release.plannedDate instanceof Date 
    ? release.plannedDate 
    : new Date(release.plannedDate);
    
  return {
    id: `release-${release.id}`,
    entityId: release.id,
    title: release.title,
    description: release.description,
    date: plannedDate,
    endDate: undefined, // Releases might not have an end date
    type: 'release',
    status: release.status,
    owner: release.owner,
    impact: `Version: ${release.version}`
  };
};

/**
 * Formats an array of calendar events for display
 */
export const formatCalendarEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.map(event => ({
    ...event,
    // Convert date strings to Date objects if needed
    date: event.date instanceof Date ? event.date : new Date(event.date),
    endDate: event.endDate ? (event.endDate instanceof Date ? event.endDate : new Date(event.endDate)) : undefined
  }));
};

/**
 * Get a descriptive label for a calendar event
 */
export const getEventLabel = (event: CalendarEvent): string => {
  const time = format(new Date(event.date), 'h:mm a');
  const typeLabel = event.type === 'change' ? 'Change' : 'Release';
  
  return `${time} - ${typeLabel} - ${event.title}`;
};

/**
 * Get color for a calendar event based on type and status
 * Colors are designed to work in both light and dark modes
 */
export const getEventColor = (event: CalendarEvent): string => {
  // Dark mode friendly color scheme based on type and status
  if (event.type === 'change') {
    switch (event.status) {
      case 'approved': return 'bg-green-100 dark:bg-green-900/60 border-green-500 text-green-800 dark:text-green-200';
      case 'submitted': return 'bg-yellow-100 dark:bg-yellow-900/60 border-yellow-500 text-yellow-800 dark:text-yellow-200';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/60 border-blue-500 text-blue-800 dark:text-blue-200';
      case 'completed': return 'bg-purple-100 dark:bg-purple-900/60 border-purple-500 text-purple-800 dark:text-purple-200';
      default: return 'bg-gray-100 dark:bg-gray-800/60 border-gray-500 text-gray-800 dark:text-gray-200';
    }
  } else {
    // Release colors
    switch (event.status) {
      case 'Planned': return 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-500 text-indigo-800 dark:text-indigo-200';
      case 'In Progress': return 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-500 text-cyan-800 dark:text-cyan-200';
      case 'Deployed': return 'bg-teal-100 dark:bg-teal-900/60 border-teal-500 text-teal-800 dark:text-teal-200';
      case 'Cancelled': return 'bg-red-100 dark:bg-red-900/60 border-red-500 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-800/60 border-gray-500 text-gray-800 dark:text-gray-200';
    }
  }
};

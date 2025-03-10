
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  addMonths,
  subMonths
} from 'date-fns';
import { CalendarEvent, CalendarFilters, CalendarViewType } from '@/utils/types/calendar';
import { changeApi } from '@/utils/api/changeApi';
import { getReleases } from '@/utils/api/releaseApi';
import { 
  changeRequestToCalendarEvent, 
  releaseToCalendarEvent, 
  formatCalendarEvents 
} from '@/utils/calendar/eventFormatters';

interface UseChangeCalendarEventsResult {
  events: CalendarEvent[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const useChangeCalendarEvents = (
  date: Date,
  view: CalendarViewType,
  filters: CalendarFilters = {}
): UseChangeCalendarEventsResult => {
  // Calculate date range based on view
  const getDateRange = () => {
    switch (view) {
      case 'day':
        return {
          start: startOfDay(date),
          end: endOfDay(date)
        };
      case 'week':
        return {
          start: startOfWeek(date),
          end: endOfWeek(date)
        };
      case 'month':
        return {
          start: startOfMonth(date),
          end: endOfMonth(date)
        };
      default:
        return {
          start: startOfMonth(date),
          end: endOfMonth(date)
        };
    }
  };

  const dateRange = getDateRange();

  // Fetch changes
  const { 
    data: changesData,
    isLoading: isLoadingChanges,
    isError: isErrorChanges,
    refetch: refetchChanges
  } = useQuery({
    queryKey: ['calendar-changes', dateRange, filters],
    queryFn: async () => {
      // In a real app, we would pass the date range to filter changes
      // Here, we'll filter on the client side since our API doesn't support this
      const response = await changeApi.getChangeRequests();
      return response.items.filter(change => {
        const changeDate = new Date(change.startDate);
        
        // Date range filter
        const isInDateRange = 
          changeDate >= dateRange.start && 
          changeDate <= dateRange.end;
        
        // Type filter
        const passesTypeFilter = 
          !filters.type || 
          filters.type === 'all' || 
          filters.type === 'change';
          
        // Status filter
        const passesStatusFilter = 
          !filters.status || 
          filters.status === 'all' || 
          change.status === filters.status;
          
        return isInDateRange && passesTypeFilter && passesStatusFilter;
      });
    }
  });

  // Fetch releases
  const { 
    data: releasesData,
    isLoading: isLoadingReleases,
    isError: isErrorReleases,
    refetch: refetchReleases
  } = useQuery({
    queryKey: ['calendar-releases', dateRange, filters],
    queryFn: async () => {
      const response = await getReleases();
      if (!response.success) {
        throw new Error('Failed to fetch releases');
      }
      
      return response.data.filter(release => {
        const releaseDate = new Date(release.plannedDate);
        
        // Date range filter
        const isInDateRange = 
          releaseDate >= dateRange.start && 
          releaseDate <= dateRange.end;
        
        // Type filter
        const passesTypeFilter = 
          !filters.type || 
          filters.type === 'all' || 
          filters.type === 'release';
          
        // Status filter - note: release status has different values than change statuses
        const passesStatusFilter = 
          !filters.status || 
          filters.status === 'all' || 
          // Map release statuses to match our filter values
          (filters.status === 'pending' && release.status === 'Planned') ||
          (filters.status === 'in-progress' && release.status === 'In Progress') ||
          (filters.status === 'completed' && release.status === 'Deployed');
          
        return isInDateRange && passesTypeFilter && passesStatusFilter;
      });
    }
  });

  // Combine and format events
  const events: CalendarEvent[] = [];
  
  if (changesData) {
    const changeEvents = changesData.map(change => changeRequestToCalendarEvent(change));
    events.push(...changeEvents);
  }
  
  if (releasesData) {
    const releaseEvents = releasesData.map(release => releaseToCalendarEvent(release));
    events.push(...releaseEvents);
  }

  // Helper to refetch both data sets
  const refetch = () => {
    refetchChanges();
    refetchReleases();
  };

  return {
    events: formatCalendarEvents(events),
    isLoading: isLoadingChanges || isLoadingReleases,
    isError: isErrorChanges || isErrorReleases,
    refetch
  };
};

export default useChangeCalendarEvents;

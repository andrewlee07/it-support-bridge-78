
import React from 'react';
import { isSameDay, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import CalendarEventTable from './CalendarEventTable';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import { getEventColorClass } from './utils/eventColorUtils';

interface CalendarViewContentProps {
  displayMode: 'calendar' | 'table' | 'split';
  date: Date;
  view: 'day' | 'week' | 'month';
  events: CalendarEvent[];
  isLoading: boolean;
  onDateSelect: (date: Date | undefined) => void;
  onEventClick: (event: CalendarEvent) => void;
  dayIsInCurrentView: (day: Date) => boolean;
  renderEvent: (day: Date) => React.ReactNode;
}

const CalendarViewContent: React.FC<CalendarViewContentProps> = ({
  displayMode,
  date,
  view,
  events,
  isLoading,
  onDateSelect,
  onEventClick,
  dayIsInCurrentView,
  renderEvent,
}) => {
  // Filter events based on the current view
  const getFilteredEvents = () => {
    if (view === 'day') {
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDay(eventDate, date);
      });
    } else if (view === 'week') {
      const weekStart = startOfWeek(date);
      const weekEnd = endOfWeek(date);
      
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return isWithinInterval(eventDate, { start: weekStart, end: weekEnd });
      });
    }
    
    return events;
  };

  // Render appropriate view based on selection
  const renderCalendarContent = () => {
    if (view === 'day') {
      return (
        <DayView
          date={date}
          events={getFilteredEvents()}
          onEventClick={onEventClick}
          getEventColorClass={getEventColorClass}
        />
      );
    } else if (view === 'week') {
      return (
        <WeekView
          date={date}
          events={getFilteredEvents()}
          onEventClick={onEventClick}
          getEventColorClass={getEventColorClass}
        />
      );
    } else {
      // Month view - uses the Calendar component
      return (
        <MonthView
          date={date}
          onDateSelect={onDateSelect}
          renderEvent={renderEvent}
        />
      );
    }
  };

  // Calculate appropriate height based on view type
  const getViewHeight = () => {
    if (view === 'day' || view === 'week') {
      return 'h-[550px]'; // Taller for day/week views
    }
    return 'h-[650px]'; // Standard height for month view
  };

  return (
    <div className={`${displayMode === 'split' ? 'grid grid-rows-2 gap-4' : ''} h-full`}>
      {(displayMode === 'calendar' || displayMode === 'split') && (
        <div className={`w-full ${getViewHeight()} overflow-auto`}>
          {renderCalendarContent()}
        </div>
      )}

      {(displayMode === 'table' || displayMode === 'split') && (
        <div className="border rounded-md overflow-hidden mt-4">
          <CalendarEventTable 
            events={view === 'day' || view === 'week' ? getFilteredEvents() : events} 
            onEventClick={onEventClick}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarViewContent;

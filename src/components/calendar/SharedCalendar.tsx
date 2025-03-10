
import React, { useState } from 'react';
import { isSameDay } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarFiltersCard from './CalendarFiltersCard';
import CalendarViewContent from './CalendarViewContent';
import CalendarEventPopover from './CalendarEventPopover';
import { useCalendarDateHelpers } from '@/hooks/useCalendarDateHelpers';
import { useChangeCalendarEvents } from '@/hooks/useChangeCalendarEvents';
import { CalendarEvent, CalendarViewType, CalendarEventType } from '@/utils/types/calendar';
import { getEventColor } from '@/utils/calendar/eventFormatters';

interface SharedCalendarProps {
  onEventClick?: (event: CalendarEvent) => void;
}

const SharedCalendar: React.FC<SharedCalendarProps> = ({ onEventClick }) => {
  // State hooks
  const [displayMode, setDisplayMode] = useState<'calendar' | 'table' | 'split'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    type: CalendarEventType | 'all';
    status: string;
  }>({
    type: 'all',
    status: 'all',
  });

  // Calendar date helpers
  const {
    date,
    setDate,
    view,
    setView,
    handlePrevious,
    handleNext,
    handleToday,
    getDateRangeText,
    dayIsInCurrentView
  } = useCalendarDateHelpers();

  // Get events based on calendar state
  const { events, isLoading, refetch } = useChangeCalendarEvents(date, view, filters);

  // Event handlers
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const handleViewChange = (newView: CalendarViewType) => {
    setView(newView);
    
    // Automatically switch to calendar or split mode when changing views
    if ((newView === 'day' || newView === 'week') && displayMode === 'table') {
      setDisplayMode('split');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'type') {
      setFilters(prev => ({ 
        ...prev, 
        [key]: value as CalendarEventType | 'all'
      }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilters({ type: 'all', status: 'all' });
  };

  const exportData = () => {
    console.log('Exporting calendar data');
  };

  // Calendar event renderer
  const renderEvent = (day: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });

    if (dayEvents.length === 0) return null;

    // Show up to 3 events per day with a "+X more" indicator if there are more
    const eventsToShow = dayEvents.slice(0, 3);
    const remainingEventsCount = dayEvents.length - eventsToShow.length;

    return (
      <div className="absolute bottom-1 left-0 right-0 flex flex-col gap-1 px-1">
        {eventsToShow.map((event, index) => (
          <div 
            key={event.id}
            className={`text-xs rounded px-1 py-0.5 truncate cursor-pointer ${getEventColor(event)}`}
            onClick={(e) => {
              e.stopPropagation();
              handleEventClick(event);
            }}
          >
            {event.title}
          </div>
        ))}
        {remainingEventsCount > 0 && (
          <div 
            className="text-xs text-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded px-1 py-0.5 truncate cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Can show a modal with all events for this day in the future
            }}
          >
            +{remainingEventsCount} more
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        date={date}
        view={view}
        displayMode={displayMode}
        showFilters={showFilters}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={handleViewChange}
        onDisplayModeChange={setDisplayMode}
        onToggleFilters={toggleFilters}
        onExport={exportData}
        getDateRangeText={getDateRangeText}
      />

      {showFilters && (
        <CalendarFiltersCard 
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          onClose={toggleFilters}
        />
      )}

      <div className="flex-grow overflow-hidden">
        <CalendarViewContent 
          displayMode={displayMode}
          date={date}
          view={view}
          events={events}
          isLoading={isLoading}
          onDateSelect={newDate => newDate && setDate(newDate)}
          onEventClick={handleEventClick}
          dayIsInCurrentView={dayIsInCurrentView}
          renderEvent={renderEvent}
        />
      </div>

      {selectedEvent && (
        <CalendarEventPopover 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default SharedCalendar;

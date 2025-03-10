
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { isSameDay, isSameMonth, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, format, addDays } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import CalendarEventTable from './CalendarEventTable';
import { DayProps } from 'react-day-picker';

interface CalendarViewContentProps {
  displayMode: 'calendar' | 'table' | 'split';
  date: Date;
  view: 'day' | 'week' | 'month' | 'timeline';
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

  // Render daily schedule for day view
  const renderDayView = () => {
    const dayEvents = getFilteredEvents();
    
    return (
      <div className="p-4 h-full">
        <h2 className="text-xl font-semibold mb-4">{format(date, 'EEEE, MMMM d, yyyy')}</h2>
        
        <div className="border rounded-md p-4">
          {dayEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No events scheduled for this day</div>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((event) => (
                <div 
                  key={event.id}
                  className="p-3 rounded-md border cursor-pointer hover:bg-gray-50"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getEventColorClass(event)}`}></div>
                    <div className="text-sm font-medium">{format(new Date(event.date), 'h:mm a')}</div>
                  </div>
                  <div className="font-medium mt-1">{event.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekStart = startOfWeek(date);
    const weekEvents = getFilteredEvents();
    
    return (
      <div className="p-4 h-full">
        <h2 className="text-xl font-semibold mb-4">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </h2>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = addDays(weekStart, index);
            const dayName = format(day, 'EEE');
            const dayNumber = format(day, 'd');
            const dayEvents = weekEvents.filter(event => isSameDay(new Date(event.date), day));
            
            return (
              <div key={index} className="border rounded-md min-h-[200px]">
                <div className={`text-center p-2 border-b ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}`}>
                  <div className="font-medium">{dayName}</div>
                  <div className="text-lg">{dayNumber}</div>
                </div>
                
                <div className="p-2">
                  {dayEvents.length === 0 ? (
                    <div className="text-xs text-gray-400 text-center py-2">No events</div>
                  ) : (
                    <div className="space-y-2">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className={`p-2 rounded text-xs cursor-pointer ${getEventColorClass(event)}`}
                          onClick={() => onEventClick(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper function to get event color class
  const getEventColorClass = (event: CalendarEvent) => {
    if (event.type === 'change') {
      return 'bg-blue-100 hover:bg-blue-200';
    } else {
      return 'bg-green-100 hover:bg-green-200';
    }
  };

  // Render appropriate view based on selection
  const renderCalendarContent = () => {
    if (view === 'day') {
      return renderDayView();
    } else if (view === 'week') {
      return renderWeekView();
    } else {
      // Month view - uses the Calendar component
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => onDateSelect(newDate)}
          className="h-full rounded-md shadow-sm border"
          components={{
            Day: ({ date: day, ...props }: DayProps) => {
              // The day can be null for placeholder days
              if (!day) return null;
              
              return (
                <div className="relative h-full w-full p-1 flex justify-center">
                  <div className="absolute top-1 right-1 text-xs font-medium">
                    {day.getDate()}
                  </div>
                  {renderEvent(day)}
                </div>
              );
            }
          }}
        />
      );
    }
  };

  return (
    <div className={displayMode === 'split' ? 'grid grid-rows-2 gap-4 h-full' : 'h-full'}>
      {(displayMode === 'calendar' || displayMode === 'split') && (
        <div className="w-full h-[650px] overflow-auto">
          {renderCalendarContent()}
        </div>
      )}

      {(displayMode === 'table' || displayMode === 'split') && (
        <div className="border rounded-md overflow-hidden">
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

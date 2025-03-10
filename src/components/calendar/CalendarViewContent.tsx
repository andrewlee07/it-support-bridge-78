
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { isSameDay } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import CalendarEventTable from './CalendarEventTable';
import { DayProps } from 'react-day-picker';

interface CalendarViewContentProps {
  displayMode: 'calendar' | 'table' | 'split';
  date: Date;
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
  events,
  isLoading,
  onDateSelect,
  onEventClick,
  dayIsInCurrentView,
  renderEvent,
}) => {
  return (
    <div className={displayMode === 'split' ? 'grid grid-rows-2 gap-4 h-full' : 'h-full'}>
      {(displayMode === 'calendar' || displayMode === 'split') && (
        <div className="w-full h-[650px] overflow-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => onDateSelect(newDate)}
            className={dayIsInCurrentView(date) ? 'h-full rounded-md shadow-sm border' : ''}
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
        </div>
      )}

      {(displayMode === 'table' || displayMode === 'split') && (
        <div className="border rounded-md overflow-hidden">
          <CalendarEventTable 
            events={events} 
            onEventClick={onEventClick}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarViewContent;

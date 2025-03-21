
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import { getEventColorClass } from '../utils/eventColorUtils';

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getEventColorClass: (event: CalendarEvent) => string;
}

const DayView: React.FC<DayViewProps> = ({
  date,
  events,
  onEventClick,
  getEventColorClass,
}) => {
  // Filter events for the current day
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return isSameDay(eventDate, date);
  });

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">{format(date, 'EEEE, MMMM d, yyyy')}</h2>
      
      <div className="border rounded-md p-4 min-h-[450px] border-gray-200">
        {dayEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No events scheduled for this day</div>
        ) : (
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <div 
                key={event.id}
                className={`p-3 rounded-md border cursor-pointer ${getEventColorClass(event)} hover:shadow-md transition-shadow`}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    event.type === 'change' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="text-sm font-medium">{format(new Date(event.date), 'h:mm a')}</div>
                </div>
                <div className="font-medium mt-1">{event.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayView;

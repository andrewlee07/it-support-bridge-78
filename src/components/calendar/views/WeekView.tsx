
import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { CalendarEvent } from '@/utils/types/calendar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getEventColorClass: (event: CalendarEvent) => string;
}

const WeekView: React.FC<WeekViewProps> = ({
  date,
  events,
  onEventClick,
  getEventColorClass,
}) => {
  const [showWorkWeek, setShowWorkWeek] = useState(false);
  const weekStart = startOfWeek(date);
  const daysToShow = showWorkWeek ? 5 : 7;
  
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </h2>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="work-week-toggle" 
            checked={showWorkWeek} 
            onCheckedChange={setShowWorkWeek}
          />
          <Label htmlFor="work-week-toggle">5-day work week</Label>
        </div>
      </div>
      
      <div className={`grid ${showWorkWeek ? 'grid-cols-5' : 'grid-cols-7'} gap-2 min-h-[450px]`}>
        {Array.from({ length: daysToShow }).map((_, index) => {
          const day = addDays(weekStart, index);
          const dayName = format(day, 'EEE');
          const dayNumber = format(day, 'd');
          const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));
          
          return (
            <div key={index} className="border rounded-md h-full border-gray-200">
              <div className={`text-center p-2 border-b ${isSameDay(day, new Date()) ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}>
                <div className="font-medium">{dayName}</div>
                <div className="text-lg">{dayNumber}</div>
              </div>
              
              <div className="p-2 overflow-y-auto max-h-[400px]">
                {dayEvents.length === 0 ? (
                  <div className="text-xs text-gray-400 text-center py-2">No events</div>
                ) : (
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`p-2 rounded text-xs cursor-pointer ${getEventColorClass(event)} hover:shadow-sm transition-shadow`}
                        onClick={() => onEventClick(event)}
                      >
                        <div className="font-medium">{format(new Date(event.date), 'h:mm a')}</div>
                        <div className="line-clamp-2">{event.title}</div>
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

export default WeekView;

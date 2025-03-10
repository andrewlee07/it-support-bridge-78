
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DayProps } from 'react-day-picker';
import { CalendarEvent } from '@/utils/types/calendar';

interface MonthViewProps {
  date: Date;
  onDateSelect: (date: Date | undefined) => void;
  renderEvent: (day: Date) => React.ReactNode;
}

const MonthView: React.FC<MonthViewProps> = ({
  date,
  onDateSelect,
  renderEvent,
}) => {
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
};

export default MonthView;

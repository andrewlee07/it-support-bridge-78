
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SharedCalendar from '@/components/calendar/SharedCalendar';
import { CalendarEvent } from '@/utils/types/calendar';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEventClick = (event: CalendarEvent) => {
    // Event handling is delegated to the SharedCalendar component
    console.log('Event clicked in parent:', event);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Change & Release Calendar</h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Forward Schedule of Change</CardTitle>
          <CardDescription>
            View and manage upcoming changes and releases in a unified calendar
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 min-h-[700px]">
          <SharedCalendar onEventClick={handleEventClick} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;

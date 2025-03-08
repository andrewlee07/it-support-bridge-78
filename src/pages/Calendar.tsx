
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              View and manage scheduled activities
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow border">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Calendar;

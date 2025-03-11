
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import MonthView from '@/components/calendar/views/MonthView';
import { useState } from 'react';

const BacklogCalendar: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderEvent = (day: Date) => {
    // This would typically render backlog items for the specified day
    return null;
  };

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Calendar</h1>
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <div className="border rounded-md p-4 bg-white dark:bg-gray-800">
            <MonthView 
              date={selectedDate}
              onDateSelect={handleDateSelect}
              renderEvent={renderEvent}
            />
          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogCalendar;

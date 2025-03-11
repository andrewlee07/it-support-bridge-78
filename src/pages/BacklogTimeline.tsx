
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';

const BacklogTimeline: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Timeline</h1>
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <div className="border rounded-md p-8 bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center h-64">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">Timeline View</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                View your backlog items in a timeline format, organized by dates and milestones.
              </p>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogTimeline;


import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import BacklogItemList from '@/components/backlog/BacklogItemList';

const BacklogList: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Items</h1>
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <BacklogItemList />
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogList;

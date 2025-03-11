
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import KanbanHeader from '@/components/backlog/kanban/header/KanbanHeader';
import { useBacklogKanban } from '@/hooks/backlog/useBacklogKanban';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';

const BacklogKanban: React.FC = () => {
  const {
    backlogItems,
    isLoading,
    viewDimension,
    handleDragEnd,
    handleEditItem,
    handleQuickStatusChange,
    handleCreateItem,
    handleViewDimensionChange,
  } = useBacklogKanban();

  const { currentView, handleViewChange } = useBacklogViews();

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <KanbanHeader 
              viewDimension={viewDimension}
              onViewDimensionChange={handleViewDimensionChange}
            />
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <div data-kanban-board>
            <KanbanBoard 
              backlogItems={backlogItems} 
              isLoading={isLoading} 
              onDragEnd={handleDragEnd}
              onEditItem={handleEditItem}
              onQuickStatusChange={handleQuickStatusChange}
              columnSize="standard"
              onCreateItem={handleCreateItem}
              viewDimension={viewDimension}
            />
          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogKanban;

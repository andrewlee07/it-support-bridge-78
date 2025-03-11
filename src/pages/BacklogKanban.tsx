
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import KanbanHeader from '@/components/backlog/kanban/header/KanbanHeader';
import { useBacklogKanban } from '@/hooks/backlog/useBacklogKanban';

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

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <KanbanHeader 
            viewDimension={viewDimension}
            onViewDimensionChange={handleViewDimensionChange}
          />

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


import React, { useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { TooltipProvider } from '@/components/ui/tooltip';

// Component imports
import KanbanBoardHeader from './components/KanbanBoardHeader';
import KanbanLoading from './components/KanbanLoading';
import KanbanDialogs from './components/KanbanDialogs';
import KanbanBoardContent from './components/KanbanBoardContent';
import { useKanbanBoard } from './hooks/useKanbanBoard';

interface KanbanBoardProps {
  backlogItems: BacklogItem[];
  isLoading: boolean;
  onDragEnd: (result: DropResult) => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  onCreateItem: (defaultStatus?: string) => void;
  viewDimension?: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  backlogItems,
  isLoading,
  onDragEnd,
  onEditItem,
  onQuickStatusChange,
  columnSize,
  onCreateItem,
  viewDimension = 'status'
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  
  const {
    collapsedColumns,
    boardConfig,
    configOpen,
    editingItem,
    setEditingItem,
    newItemDialogOpen,
    setNewItemDialogOpen,
    setConfigOpen,
    toggleColumn,
    getItemsForColumn,
    updateBoardConfig,
    handleNewItemSuccess,
    handleNewItemCancel,
    handleAddBucket,
    handleAddItem,
    handleCreateItem,
    handleAddColumn
  } = useKanbanBoard({
    backlogItems,
    viewDimension,
    onCreateItem
  });

  if (isLoading) {
    return <KanbanLoading />;
  }

  return (
    <TooltipProvider>
      <div ref={boardRef} className="h-full">
        <KanbanBoardHeader 
          onConfigOpen={() => setConfigOpen(true)} 
          onCreateItem={handleCreateItem}
          onAddColumn={handleAddColumn}
          viewDimension={viewDimension}
        />

        <KanbanBoardContent
          backlogItems={backlogItems}
          boardConfig={boardConfig}
          collapsedColumns={collapsedColumns}
          toggleColumn={toggleColumn}
          onDragEnd={onDragEnd}
          onEditItem={onEditItem}
          onQuickStatusChange={onQuickStatusChange}
          columnSize={columnSize}
          onAddItem={handleAddItem}
          getItemsForColumn={getItemsForColumn}
          viewDimension={viewDimension}
          onCreateItem={handleCreateItem}
        />

        <KanbanDialogs
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          newItemDialogOpen={newItemDialogOpen}
          setNewItemDialogOpen={setNewItemDialogOpen}
          configOpen={configOpen}
          setConfigOpen={setConfigOpen}
          boardConfig={boardConfig}
          updateBoardConfig={updateBoardConfig}
          onFormSuccess={handleNewItemSuccess}
          onFormCancel={handleNewItemCancel}
        />
      </div>
    </TooltipProvider>
  );
};

export default KanbanBoard;

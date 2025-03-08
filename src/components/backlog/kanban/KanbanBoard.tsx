
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import KanbanColumn from './KanbanColumn';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  backlogItems: BacklogItem[];
  isLoading: boolean;
  onDragEnd: (result: DropResult) => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  backlogItems,
  isLoading,
  onDragEnd,
  onEditItem,
  onQuickStatusChange,
  columnSize,
}) => {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);

  // All possible statuses for backlog items
  const statuses: BacklogItemStatus[] = ['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'];
  
  // Group items by status
  const itemsByStatus = statuses.reduce((acc, status) => {
    acc[status] = backlogItems.filter(item => item.status === status);
    return acc;
  }, {} as Record<BacklogItemStatus, BacklogItem[]>);

  const toggleColumn = (status: string) => {
    setCollapsedColumns(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={cn(
        "grid gap-4 overflow-x-auto pb-4",
        columnSize === 'compact' 
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            items={itemsByStatus[status] || []}
            isCollapsed={collapsedColumns.includes(status)}
            onToggleCollapse={() => toggleColumn(status)}
            onEditItem={onEditItem}
            onQuickStatusChange={onQuickStatusChange}
            columnSize={columnSize}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

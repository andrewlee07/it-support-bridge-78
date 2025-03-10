
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { KanbanBoardConfig, KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import KanbanColumn from '../KanbanColumn';

interface KanbanColumnsProps {
  boardConfig: KanbanBoardConfig;
  backlogItems: BacklogItem[];
  collapsedColumns: string[];
  toggleColumn: (columnId: string) => void;
  onDragEnd: (result: DropResult) => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  onAddItem: (status: string) => void;
}

const KanbanColumns: React.FC<KanbanColumnsProps> = ({
  boardConfig,
  backlogItems,
  collapsedColumns,
  toggleColumn,
  onDragEnd,
  onEditItem,
  onQuickStatusChange,
  columnSize,
  onAddItem
}) => {
  // Group items by status
  const itemsByStatus = boardConfig.columns.reduce((acc, column) => {
    acc[column.statusValue as BacklogItemStatus] = backlogItems.filter(
      item => item.status === column.statusValue
    );
    return acc;
  }, {} as Record<BacklogItemStatus, BacklogItem[]>);

  // Sort columns by order
  const sortedColumns = [...boardConfig.columns].sort((a, b) => a.order - b.order);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="relative w-full h-full overflow-hidden">
        <ScrollArea 
          orientation="horizontal" 
          className="w-full h-full pb-4"
          type="always"
        >
          <div className="flex gap-4 min-w-max pb-4 pr-4 pl-1 pt-1">
            {sortedColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                columnConfig={column}
                items={itemsByStatus[column.statusValue as BacklogItemStatus] || []}
                isCollapsed={collapsedColumns.includes(column.id)}
                onToggleCollapse={() => toggleColumn(column.id)}
                onEditItem={onEditItem}
                onQuickStatusChange={onQuickStatusChange}
                columnSize={columnSize}
                onAddItem={onAddItem}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </DragDropContext>
  );
};

export default KanbanColumns;

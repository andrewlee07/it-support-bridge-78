
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
      <div className="relative w-full overflow-hidden">
        <ScrollArea className="w-full h-full">
          <div className={cn(
            "grid gap-4 pb-4 min-w-max",
            boardConfig.layout === 'horizontal'
              ? "grid-flow-col auto-cols-[300px]"
              : columnSize === 'compact'
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
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
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </DragDropContext>
  );
};

export default KanbanColumns;


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
  getItemsForColumn?: (columnStatusValue: string, columnId: string) => BacklogItem[];
  viewDimension?: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
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
  onAddItem,
  getItemsForColumn,
  viewDimension = 'status'
}) => {
  // Group items using the provided function or by default status
  const getColumnItems = (column: KanbanColumnConfig) => {
    if (getItemsForColumn) {
      return getItemsForColumn(column.statusValue, column.id);
    }
    return backlogItems.filter(item => item.status === column.statusValue);
  };

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
          <div className={cn(
            "flex gap-4 pb-4 pr-4 pl-1 pt-1",
            boardConfig.layout === 'horizontal' ? "min-w-max" : "flex-wrap"
          )}>
            {sortedColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                columnConfig={column}
                items={getColumnItems(column)}
                isCollapsed={collapsedColumns.includes(column.id)}
                onToggleCollapse={() => toggleColumn(column.id)}
                onEditItem={onEditItem}
                onQuickStatusChange={onQuickStatusChange}
                columnSize={columnSize}
                onAddItem={onAddItem}
                viewDimension={viewDimension}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </DragDropContext>
  );
};

export default KanbanColumns;

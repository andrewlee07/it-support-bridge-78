
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import KanbanCard from './KanbanCard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';

interface KanbanColumnProps {
  columnConfig: KanbanColumnConfig;
  items: BacklogItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnConfig,
  items,
  isCollapsed,
  onToggleCollapse,
  onEditItem,
  onQuickStatusChange,
  columnSize,
}) => {
  return (
    <Card className={cn(
      "h-full flex flex-col border",
      columnConfig.color,
      columnSize === 'compact' ? "min-h-[400px]" : "min-h-[600px]"
    )}>
      <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {columnConfig.displayName}
          <span className="bg-background text-foreground rounded-full px-2 py-0.5 text-xs">
            {items.length}
          </span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-6 w-6">
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="p-2 flex-grow overflow-y-auto">
          <Droppable droppableId={columnConfig.statusValue}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "min-h-[200px] transition-colors duration-200 rounded p-1",
                  snapshot.isDraggingOver ? "bg-muted/50" : "transparent"
                )}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "mb-2 transition-transform",
                          snapshot.isDragging ? "rotate-1 scale-105" : ""
                        )}
                      >
                        <KanbanCard
                          item={item}
                          onEdit={() => onEditItem(item)}
                          onStatusChange={(newStatus) => onQuickStatusChange(item.id, newStatus)}
                          columnSize={columnSize}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      )}
    </Card>
  );
};

export default KanbanColumn;

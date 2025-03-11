
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import { Button } from '@/components/ui/button';
import KanbanCard from './KanbanCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

interface KanbanColumnProps {
  columnConfig: KanbanColumnConfig;
  items: BacklogItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  onAddItem: (status: string) => void;
  viewDimension?: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnConfig,
  items,
  isCollapsed,
  onToggleCollapse,
  onEditItem,
  onQuickStatusChange,
  columnSize,
  onAddItem,
  viewDimension = 'status'
}) => {
  // Get action label based on view dimension
  const getAddItemLabel = () => {
    switch (viewDimension) {
      case 'status':
        return `Add item as ${columnConfig.displayName}`;
      case 'sprint':
        return `Add to ${columnConfig.displayName}`;
      case 'assignee':
        return `Assign to ${columnConfig.displayName}`;
      case 'priority':
        return `Add as ${columnConfig.displayName} priority`;
      case 'label':
        return `Add with ${columnConfig.displayName} label`;
      default:
        return 'Add item';
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col border rounded-md shadow-sm bg-background",
        isCollapsed ? "w-[200px]" : columnSize === 'compact' ? "w-[280px]" : "w-[320px]"
      )}
    >
      <div 
        className={cn(
          "p-3 font-medium border-b flex items-center justify-between sticky top-0 z-10",
          columnConfig.color
        )}
      >
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 mr-1 text-muted-foreground" 
            onClick={onToggleCollapse}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <span>{columnConfig.displayName}</span>
          <span className="ml-2 text-xs bg-background/80 px-1.5 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <Droppable droppableId={columnConfig.id}>
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "flex-grow p-2 overflow-hidden",
                  snapshot.isDraggingOver && "bg-accent/50"
                )}
              >
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-2 min-h-[200px] p-1">
                    {items.map((item, index) => (
                      <KanbanCard 
                        key={item.id} 
                        item={item}
                        index={index}
                        onEdit={() => onEditItem(item)}
                        onStatusChange={(newStatus) => onQuickStatusChange(item.id, newStatus)}
                        columnSize={columnSize}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Droppable>

          <div className="p-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onAddItem(columnConfig.statusValue)}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              {getAddItemLabel()}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanbanColumn;

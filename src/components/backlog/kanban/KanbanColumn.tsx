
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import KanbanCard from './KanbanCard';
import { cn } from '@/lib/utils';
import { ViewDimension } from '@/hooks/backlog/kanban/types';

interface KanbanColumnProps {
  columnConfig: KanbanColumnConfig;
  items: BacklogItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  onAddItem: (status: string) => void;
  viewDimension: ViewDimension;
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
  viewDimension
}) => {
  const columnWidth = columnSize === 'compact' ? 'w-[220px]' : 'w-[280px]';
  
  // Get status label for button
  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <Card className={cn(
      columnWidth,
      'flex flex-col h-[calc(100vh-230px)] min-h-[400px] max-h-[800px]',
      'relative' // Add relative positioning for the dropdown
    )}>
      <CardHeader className="p-3 pb-2 flex flex-row justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{columnConfig.displayName}</span>
          <Badge variant="outline">{items.length}</Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      {!isCollapsed && (
        <>
          <CardContent className="p-0 overflow-hidden flex-1">
            <ScrollArea className="h-full">
              <Droppable droppableId={columnConfig.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-2 space-y-2 min-h-[100px]"
                  >
                    {items.map((item, index) => (
                      <KanbanCard
                        key={item.id}
                        item={item}
                        index={index}
                        onEdit={() => onEditItem(item)}
                        onStatusChange={(status) => onQuickStatusChange(item.id, status)}
                        columnSize={columnSize}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="p-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onAddItem(columnConfig.statusValue)}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add {getStatusLabel(viewDimension)} Item
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default KanbanColumn;

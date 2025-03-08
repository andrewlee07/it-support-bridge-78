
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import KanbanColumn from './KanbanColumn';
import { cn } from '@/lib/utils';
import { defaultKanbanConfig, KanbanBoardConfig, KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import { Button } from '@/components/ui/button';
import { Settings, Plus } from 'lucide-react';
import KanbanConfigDialog from './KanbanConfigDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

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
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);

  // Load configuration from localStorage if available
  useEffect(() => {
    const savedConfig = localStorage.getItem('kanbanBoardConfig');
    if (savedConfig) {
      try {
        setBoardConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Failed to parse saved kanban config:', e);
      }
    }
  }, []);

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('kanbanBoardConfig', JSON.stringify(boardConfig));
  }, [boardConfig]);

  const toggleColumn = (status: string) => {
    setCollapsedColumns(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const updateBoardConfig = (newConfig: KanbanBoardConfig) => {
    setBoardConfig(newConfig);
    setConfigOpen(false);
  };

  const handleNewItemSuccess = (item: BacklogItem) => {
    setNewItemDialogOpen(false);
    // The parent component will refresh the list through the query invalidation
  };

  const handleNewItemCancel = () => {
    setNewItemDialogOpen(false);
  };

  const handleAddBucket = () => {
    // Create a new column/bucket
    const newBucketId = uuidv4();
    const newBucketName = `Bucket ${boardConfig.columns.length + 1}`;
    const newStatusValue = `bucket-${boardConfig.columns.length + 1}`;
    
    const newColumn: KanbanColumnConfig = {
      id: newBucketId,
      displayName: newBucketName,
      statusValue: newStatusValue,
      order: boardConfig.columns.length + 1,
      color: 'bg-gray-50 dark:bg-gray-950'
    };
    
    const updatedConfig = {
      ...boardConfig,
      columns: [...boardConfig.columns, newColumn]
    };
    
    setBoardConfig(updatedConfig);
    toast.success(`New bucket "${newBucketName}" added`);
  };

  // Group items by status
  const itemsByStatus = boardConfig.columns.reduce((acc, column) => {
    acc[column.statusValue as BacklogItemStatus] = backlogItems.filter(
      item => item.status === column.statusValue
    );
    return acc;
  }, {} as Record<BacklogItemStatus, BacklogItem[]>);

  // Sort columns by order
  const sortedColumns = [...boardConfig.columns].sort((a, b) => a.order - b.order);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setNewItemDialogOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Create Backlog Item
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setConfigOpen(true)}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          Configure Board
        </Button>
      </div>

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

      <KanbanConfigDialog
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        currentConfig={boardConfig}
        onSave={updateBoardConfig}
      />

      <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Backlog Item</DialogTitle>
          </DialogHeader>
          <BacklogItemForm
            onSuccess={handleNewItemSuccess}
            onCancel={handleNewItemCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KanbanBoard;


import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListIcon, Settings } from 'lucide-react';
import { DropResult } from 'react-beautiful-dnd';
import { toast } from 'sonner';

const BacklogKanban: React.FC = () => {
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBacklogItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBacklogItems();
        setBacklogItems(response);
      } catch (error) {
        console.error('Error loading backlog items:', error);
        toast.error('Failed to load backlog items');
      } finally {
        setIsLoading(false);
      }
    };

    loadBacklogItems();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    // This would update the status of the item when dragged between columns
    console.log('Item dragged:', result);
  };

  const handleEditItem = (item: BacklogItem) => {
    // This would open the item edit dialog
    console.log('Edit item:', item);
  };

  const handleQuickStatusChange = (itemId: string, newStatus: BacklogItemStatus) => {
    // This would update the status of the item directly
    console.log('Quick status change:', itemId, newStatus);
  };

  const handleCreateItem = (defaultStatus?: string) => {
    // This would create a new item
    console.log('Create item with default status:', defaultStatus);
  };

  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Backlog Board</h1>
            <p className="text-muted-foreground">Manage your backlog items using the kanban board</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/backlog')}
            >
              <ListIcon className="mr-2 h-4 w-4" />
              List View
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.querySelector('[data-kanban-board]')?.dispatchEvent(new Event('openConfig'))}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure Board
            </Button>
          </div>
        </div>

        <div data-kanban-board>
          <KanbanBoard 
            backlogItems={backlogItems} 
            isLoading={isLoading} 
            onDragEnd={handleDragEnd}
            onEditItem={handleEditItem}
            onQuickStatusChange={handleQuickStatusChange}
            columnSize="standard"
            onCreateItem={handleCreateItem}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default BacklogKanban;

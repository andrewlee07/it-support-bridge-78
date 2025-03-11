
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import { fetchBacklogItems, updateBacklogItemStatus, createBacklogItem } from '@/utils/api/backlogApi';
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
        // Check if response is an array directly or needs to extract data property
        if (Array.isArray(response)) {
          setBacklogItems(response);
        } else if (response.data) {
          // If response is a PaginatedResponse object, extract the data property
          setBacklogItems(response.data);
        } else {
          console.error('Unexpected response format:', response);
          toast.error('Failed to load backlog items: unexpected data format');
          setBacklogItems([]);
        }
      } catch (error) {
        console.error('Error loading backlog items:', error);
        toast.error('Failed to load backlog items');
        setBacklogItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBacklogItems();
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list
    
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as BacklogItemStatus;
    
    try {
      // Find the item in the current state
      const draggedItem = backlogItems.find(item => item.id === draggableId);
      if (!draggedItem) return;
      
      // Optimistically update UI
      const updatedItems = backlogItems.map(item => 
        item.id === draggableId ? { ...item, status: newStatus } : item
      );
      setBacklogItems(updatedItems);
      
      // Update in backend
      await updateBacklogItemStatus(draggableId, newStatus);
      toast.success(`Item moved to ${newStatus}`);
    } catch (error) {
      // Revert on error
      toast.error('Failed to update item status');
      // Reload items to ensure UI consistency
      const response = await fetchBacklogItems();
      if (Array.isArray(response)) {
        setBacklogItems(response);
      } else if (response.data) {
        setBacklogItems(response.data);
      }
    }
  };

  const handleEditItem = (item: BacklogItem) => {
    // Navigate to edit page for the backlog item
    navigate(`/backlog/edit/${item.id}`, { state: { item } });
  };

  const handleQuickStatusChange = async (itemId: string, newStatus: BacklogItemStatus) => {
    try {
      // Optimistically update UI
      const updatedItems = backlogItems.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      );
      setBacklogItems(updatedItems);
      
      // Update in backend
      await updateBacklogItemStatus(itemId, newStatus);
      toast.success(`Item status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update item status');
      // Reload items to ensure UI consistency
      const response = await fetchBacklogItems();
      if (Array.isArray(response)) {
        setBacklogItems(response);
      } else if (response.data) {
        setBacklogItems(response.data);
      }
    }
  };

  const handleCreateItem = async (defaultStatus?: string) => {
    try {
      const status = defaultStatus as BacklogItemStatus || 'todo';
      // Navigate to create page with default status
      navigate('/backlog/create', { state: { defaultStatus: status } });
    } catch (error) {
      toast.error('Failed to initialize new item creation');
    }
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

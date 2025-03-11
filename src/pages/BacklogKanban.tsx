
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import { fetchBacklogItems, updateBacklogItem, createBacklogItem } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus, BacklogItemPriority } from '@/utils/types/backlogTypes';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListIcon, Settings, Filter } from 'lucide-react';
import { DropResult } from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BacklogKanban: React.FC = () => {
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewDimension, setViewDimension] = useState<'status' | 'sprint' | 'assignee' | 'priority' | 'label'>('status');
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
    
    try {
      // Find the item in the current state
      const draggedItem = backlogItems.find(item => item.id === draggableId);
      if (!draggedItem) return;
      
      // Handling depends on the view dimension
      if (viewDimension === 'status') {
        const newStatus = destination.droppableId as BacklogItemStatus;
        
        // Optimistically update UI
        const updatedItems = backlogItems.map(item => 
          item.id === draggableId ? { ...item, status: newStatus } : item
        );
        setBacklogItems(updatedItems);
        
        // Update in backend
        await updateBacklogItem(draggableId, { status: newStatus });
        toast.success(`Item moved to ${newStatus}`);
      } 
      else if (viewDimension === 'sprint') {
        const releaseId = destination.droppableId.replace('sprint-', '');
        
        // Optimistically update UI
        const updatedItems = backlogItems.map(item => 
          item.id === draggableId ? { ...item, releaseId } : item
        );
        setBacklogItems(updatedItems);
        
        // Update in backend
        await updateBacklogItem(draggableId, { releaseId });
        toast.success(`Item moved to ${destination.droppableId}`);
      }
      else if (viewDimension === 'assignee') {
        const assignee = destination.droppableId.replace('assignee-', '');
        
        // Optimistically update UI
        const updatedItems = backlogItems.map(item => 
          item.id === draggableId ? { ...item, assignee } : item
        );
        setBacklogItems(updatedItems);
        
        // Update in backend
        await updateBacklogItem(draggableId, { assignee });
        toast.success(`Item assigned to new team member`);
      }
      else if (viewDimension === 'priority') {
        const priorityValue = destination.droppableId.replace('priority-', '') as BacklogItemPriority;
        
        // Optimistically update UI
        const updatedItems = backlogItems.map(item => 
          item.id === draggableId ? { ...item, priority: priorityValue } : item
        );
        setBacklogItems(updatedItems);
        
        // Update in backend
        await updateBacklogItem(draggableId, { priority: priorityValue });
        toast.success(`Item priority changed to ${priorityValue}`);
      }
      else if (viewDimension === 'label') {
        const newLabel = destination.droppableId.replace('label-', '');
        
        // Optimistically update UI - for labels we'd typically add to an array
        const updatedItems = backlogItems.map(item => {
          if (item.id === draggableId) {
            const labels = [...(item.labels || [])];
            if (!labels.includes(newLabel)) {
              labels.push(newLabel);
            }
            return { ...item, labels };
          }
          return item;
        });
        setBacklogItems(updatedItems);
        
        // Update in backend
        const draggedItem = backlogItems.find(item => item.id === draggableId);
        if (draggedItem) {
          const updatedLabels = [...(draggedItem.labels || [])];
          if (!updatedLabels.includes(newLabel)) {
            updatedLabels.push(newLabel);
          }
          await updateBacklogItem(draggableId, { labels: updatedLabels });
          toast.success(`Item added to ${newLabel} label`);
        }
      }
    } catch (error) {
      // Revert on error
      toast.error('Failed to update item');
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
      await updateBacklogItem(itemId, { status: newStatus });
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
      const status = defaultStatus as BacklogItemStatus || 'open';
      // Navigate to create page with default status
      navigate('/backlog/create', { state: { defaultStatus: status } });
    } catch (error) {
      toast.error('Failed to initialize new item creation');
    }
  };

  const handleViewDimensionChange = (dimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label') => {
    setViewDimension(dimension);
    toast.success(`Board view changed to: By ${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`);
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
            <Select 
              value={viewDimension} 
              onValueChange={(val) => handleViewDimensionChange(val as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View dimension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">By Status</SelectItem>
                <SelectItem value="sprint">By Sprint</SelectItem>
                <SelectItem value="assignee">By Assignee</SelectItem>
                <SelectItem value="priority">By Priority</SelectItem>
                <SelectItem value="label">By Label</SelectItem>
              </SelectContent>
            </Select>
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
            viewDimension={viewDimension}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default BacklogKanban;

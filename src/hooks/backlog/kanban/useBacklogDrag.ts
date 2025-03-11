
import { BacklogItem, BacklogItemStatus, BacklogItemPriority } from '@/utils/types/backlogTypes';
import { updateBacklogItem, fetchBacklogItems } from '@/utils/api/backlogApi';
import { DropResult } from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { ViewDimension } from './types';

interface UseBacklogDragProps {
  backlogItems: BacklogItem[];
  setBacklogItems: React.Dispatch<React.SetStateAction<BacklogItem[]>>;
  viewDimension: ViewDimension;
}

/**
 * Hook for handling drag and drop operations in the backlog kanban
 */
export const useBacklogDrag = ({ backlogItems, setBacklogItems, viewDimension }: UseBacklogDragProps) => {
  
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

  return { handleDragEnd };
};

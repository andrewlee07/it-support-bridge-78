
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { updateBacklogItem, fetchBacklogItems } from '@/utils/api/backlogApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UseBacklogActionsProps {
  backlogItems: BacklogItem[];
  setBacklogItems: React.Dispatch<React.SetStateAction<BacklogItem[]>>;
}

/**
 * Hook for handling backlog item actions (edit, status change, create)
 */
export const useBacklogActions = ({ backlogItems, setBacklogItems }: UseBacklogActionsProps) => {
  const navigate = useNavigate();

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

  return {
    handleEditItem,
    handleQuickStatusChange,
    handleCreateItem
  };
};

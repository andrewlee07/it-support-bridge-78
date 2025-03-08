
import { useState, useEffect } from 'react';
import { RelatedItem } from '@/utils/types/ticket';
import { toast } from 'sonner';

interface UseRelatedItemSyncProps {
  ticketId: string;
  relatedItems?: RelatedItem[];
  onUpdateRelatedItems: (items: RelatedItem[]) => void;
}

export const useRelatedItemSync = ({
  ticketId,
  relatedItems = [],
  onUpdateRelatedItems
}: UseRelatedItemSyncProps) => {
  const [loading, setLoading] = useState(false);

  // This function would be called when a bug or backlog item status changes
  // In a real app, this would likely be triggered by a webhook or polling mechanism
  const handleItemStatusChange = (itemId: string, newStatus: string) => {
    setLoading(true);
    
    try {
      // Find the item in the related items
      const updatedItems = relatedItems.map(item => {
        if (item.id === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      
      // Update the related items
      onUpdateRelatedItems(updatedItems);
      
      // Show a toast notification about the status change
      toast.info(`Related ${itemId.startsWith('bug') ? 'bug' : 'backlog item'} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating related item status:', error);
      toast.error('Failed to update related item status');
    } finally {
      setLoading(false);
    }
  };

  // Function to check if all related items are resolved/completed
  const areAllItemsResolved = () => {
    if (!relatedItems.length) return true;
    
    return relatedItems.every(item => {
      if (item.type === 'bug') {
        return ['closed', 'resolved', 'fixed'].includes(item.status.toLowerCase());
      }
      if (item.type === 'backlogItem') {
        return ['completed', 'done', 'closed'].includes(item.status.toLowerCase());
      }
      return false;
    });
  };

  // Function to get a list of unresolved items
  const getUnresolvedItems = () => {
    return relatedItems.filter(item => {
      if (item.type === 'bug') {
        return !['closed', 'resolved', 'fixed'].includes(item.status.toLowerCase());
      }
      if (item.type === 'backlogItem') {
        return !['completed', 'done', 'closed'].includes(item.status.toLowerCase());
      }
      return false;
    });
  };

  return {
    handleItemStatusChange,
    areAllItemsResolved,
    getUnresolvedItems,
    loading
  };
};

export default useRelatedItemSync;


import React, { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogViewSelector } from '@/components/backlog/views/BacklogViewSelector';
import { useBacklogViews } from '@/hooks/backlog/useBacklogViews';
import BacklogItemList from '@/components/backlog/BacklogItemList';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { toast } from 'sonner';
import { updateBacklogItem, deleteBacklogItem } from '@/utils/api/backlogApi';

const BacklogList: React.FC = () => {
  const { currentView, handleViewChange } = useBacklogViews();
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);

  const handleCreateItem = () => {
    setIsCreating(true);
  };

  const handleEditItem = (item: BacklogItem) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async (updatedItem: BacklogItem) => {
    try {
      await updateBacklogItem(updatedItem.id, updatedItem);
      toast.success('Backlog item updated successfully');
    } catch (error) {
      console.error('Error updating backlog item:', error);
      toast.error('Failed to update backlog item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteBacklogItem(id);
      toast.success('Backlog item deleted successfully');
    } catch (error) {
      console.error('Error deleting backlog item:', error);
      toast.error('Failed to delete backlog item');
    }
  };

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Backlog Items</h1>
            <BacklogViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>

          <BacklogItemList 
            onCreateItem={handleCreateItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </TooltipProvider>
    </PageTransition>
  );
};

export default BacklogList;


import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import BacklogItemList from '@/components/backlog/BacklogItemList';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { updateBacklogItem } from '@/utils/api/backlogApi';

const Backlog: React.FC = () => {
  const { user } = useAuth();
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

  const handleFormSuccess = (item: BacklogItem) => {
    toast.success(isCreating ? 'Backlog item created' : 'Backlog item updated', {
      description: `${item.title} has been ${isCreating ? 'created' : 'updated'} successfully.`,
    });
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleFormCancel = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <PageTransition>
      <div className="container py-6">
        <BacklogItemList 
          onCreateItem={handleCreateItem} 
          onEditItem={handleEditItem}
        />

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Backlog Item</DialogTitle>
            </DialogHeader>
            <BacklogItemForm
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            {editingItem && (
              <BacklogItemForm
                initialData={editingItem}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Backlog;

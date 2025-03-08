
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { fetchBacklogItems, updateBacklogItem } from '@/utils/api/backlogApi';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import BacklogKanbanHeader from '@/components/backlog/kanban/BacklogKanbanHeader';

const BacklogKanban: React.FC = () => {
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [columnSize, setColumnSize] = useState<'compact' | 'standard'>('standard');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all backlog items
  const { data: backlogItemsResponse, isLoading, refetch } = useQuery({
    queryKey: ['backlogItems', searchQuery],
    queryFn: () => fetchBacklogItems(undefined, undefined, searchQuery),
  });

  const backlogItems = backlogItemsResponse?.data || [];

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as any;
    const backlogItem = backlogItems.find(item => item.id === draggableId);
    
    if (backlogItem && backlogItem.status !== newStatus) {
      try {
        await updateBacklogItem(draggableId, {
          ...backlogItem,
          status: newStatus
        });
        toast.success(`${backlogItem.title} moved to ${newStatus.replace('-', ' ')}`);
        refetch();
      } catch (error) {
        console.error('Error updating status:', error);
        toast.error('Failed to update item status');
      }
    }
  };

  const handleEditItem = (item: BacklogItem) => {
    setEditingItem(item);
  };

  const handleViewTable = () => {
    navigate('/backlog');
  };

  const handleQuickStatusChange = async (itemId: string, newStatus: any) => {
    const backlogItem = backlogItems.find(item => item.id === itemId);
    
    if (backlogItem) {
      try {
        await updateBacklogItem(itemId, {
          ...backlogItem,
          status: newStatus
        });
        toast.success(`Status updated to ${newStatus.replace('-', ' ')}`);
        refetch();
      } catch (error) {
        console.error('Error updating status:', error);
        toast.error('Failed to update item status');
      }
    }
  };

  const handleFormSuccess = () => {
    setEditingItem(null);
    refetch();
  };

  const handleFormCancel = () => {
    setEditingItem(null);
  };

  return (
    <PageTransition>
      <div className="container py-6 space-y-4">
        <BacklogKanbanHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onViewTable={handleViewTable}
          columnSize={columnSize}
          setColumnSize={setColumnSize}
        />
        
        <KanbanBoard 
          backlogItems={backlogItems}
          isLoading={isLoading}
          onDragEnd={handleDragEnd}
          onEditItem={handleEditItem}
          onQuickStatusChange={handleQuickStatusChange}
          columnSize={columnSize}
        />

        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Backlog Item</DialogTitle>
            </DialogHeader>
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

export default BacklogKanban;

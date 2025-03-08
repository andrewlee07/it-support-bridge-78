
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { fetchBacklogItems, updateBacklogItem } from '@/utils/api/backlogApi';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import BacklogKanbanHeader from '@/components/backlog/kanban/BacklogKanbanHeader';

const BacklogKanban: React.FC = () => {
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [columnSize, setColumnSize] = useState<'compact' | 'standard'>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);

  // Fetch all backlog items
  const { data: backlogItemsResponse, isLoading, refetch } = useQuery({
    queryKey: ['backlogItems', searchQuery],
    queryFn: () => fetchBacklogItems(undefined, undefined, searchQuery),
  });

  const backlogItems = backlogItemsResponse?.data || backlogItemsResponse?.items || [];

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
    setNewItemDialogOpen(false);
    refetch();
    toast.success('Backlog item created successfully');
  };

  const handleFormCancel = () => {
    setEditingItem(null);
    setNewItemDialogOpen(false);
  };

  const handleCreateItem = () => {
    setNewItemDialogOpen(true);
  };

  const handleAddBucket = () => {
    // This is a pass-through function that will be handled by the KanbanBoard component
    // The bucket creation logic is now in the KanbanBoard component
    const kanbanBoardComponent = document.querySelector('[data-kanban-board]');
    const event = new CustomEvent('add-bucket');
    kanbanBoardComponent?.dispatchEvent(event);
  };

  return (
    <PageTransition>
      <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
        <div className="flex-none px-4 md:px-6 py-4">
          <BacklogKanbanHeader 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onViewTable={handleViewTable}
            columnSize={columnSize}
            setColumnSize={setColumnSize}
            onCreateItem={handleCreateItem}
            onAddBucket={handleAddBucket}
          />
        </div>
        
        <div className="flex-grow overflow-hidden px-4 md:px-6">
          <div data-kanban-board className="h-full">
            <KanbanBoard 
              backlogItems={backlogItems}
              isLoading={isLoading}
              onDragEnd={handleDragEnd}
              onEditItem={handleEditItem}
              onQuickStatusChange={handleQuickStatusChange}
              columnSize={columnSize}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BacklogKanban;

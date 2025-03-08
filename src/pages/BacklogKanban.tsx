import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import PageTransition from '@/components/shared/PageTransition';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { fetchBacklogItems, updateBacklogItem } from '@/utils/api/backlogApi';
import KanbanBoard from '@/components/backlog/kanban/KanbanBoard';
import BacklogKanbanHeader from '@/components/backlog/kanban/BacklogKanbanHeader';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';

const BacklogKanban: React.FC = () => {
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [columnSize, setColumnSize] = useState<'compact' | 'standard'>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig | null>(null);
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('kanbanBoardConfig');
    if (savedConfig) {
      try {
        setBoardConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Failed to parse saved kanban config:', e);
      }
    }
  }, []);

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
    const kanbanBoardElement = document.querySelector('[data-kanban-board]');
    if (kanbanBoardElement) {
      const event = new CustomEvent('addBucket');
      kanbanBoardElement.dispatchEvent(event);
      toast.success('Adding new bucket...');
    } else {
      toast.error('Could not find the kanban board element');
    }
  };

  const handleOpenConfigDialog = () => {
    setConfigOpen(true);
    
    const kanbanBoardElement = document.querySelector('[data-kanban-board]');
    if (kanbanBoardElement) {
      const event = new CustomEvent('openConfig');
      kanbanBoardElement.dispatchEvent(event);
    }
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
            onConfigOpen={handleOpenConfigDialog}
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

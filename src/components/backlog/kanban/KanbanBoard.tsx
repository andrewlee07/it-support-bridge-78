
import React, { useState, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { defaultKanbanConfig, KanbanBoardConfig } from '@/utils/types/kanbanTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// New component imports
import KanbanBoardHeader from './components/KanbanBoardHeader';
import KanbanColumns from './components/KanbanColumns';
import KanbanLoading from './components/KanbanLoading';
import KanbanEmptyState from './components/KanbanEmptyState';
import KanbanDialogs from './components/KanbanDialogs';

interface KanbanBoardProps {
  backlogItems: BacklogItem[];
  isLoading: boolean;
  onDragEnd: (result: DropResult) => void;
  onEditItem: (item: BacklogItem) => void;
  onQuickStatusChange: (itemId: string, newStatus: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  backlogItems,
  isLoading,
  onDragEnd,
  onEditItem,
  onQuickStatusChange,
  columnSize,
}) => {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);

  // Load configuration from localStorage if available
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

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('kanbanBoardConfig', JSON.stringify(boardConfig));
  }, [boardConfig]);

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(s => s !== columnId)
        : [...prev, columnId]
    );
  };

  const updateBoardConfig = (newConfig: KanbanBoardConfig) => {
    setBoardConfig(newConfig);
    setConfigOpen(false);
  };

  const handleNewItemSuccess = () => {
    setNewItemDialogOpen(false);
    setEditingItem(null);
    // The parent component will refresh the list through the query invalidation
  };

  const handleNewItemCancel = () => {
    setNewItemDialogOpen(false);
    setEditingItem(null);
  };

  const handleAddBucket = () => {
    // Create a new column/bucket
    const newBucketId = uuidv4();
    const newBucketName = `Bucket ${boardConfig.columns.length + 1}`;
    const newStatusValue = `bucket-${boardConfig.columns.length + 1}`;
    
    const newColumn = {
      id: newBucketId,
      displayName: newBucketName,
      statusValue: newStatusValue,
      order: boardConfig.columns.length + 1,
      color: 'bg-gray-50 dark:bg-gray-950'
    };
    
    const updatedConfig = {
      ...boardConfig,
      columns: [...boardConfig.columns, newColumn]
    };
    
    setBoardConfig(updatedConfig);
    toast.success(`New bucket "${newBucketName}" added`);
  };

  const handleOpenConfigDialog = () => {
    setConfigOpen(true);
  };

  const handleCreateItem = () => {
    setNewItemDialogOpen(true);
  };

  if (isLoading) {
    return <KanbanLoading />;
  }

  return (
    <>
      <KanbanBoardHeader 
        onConfigOpen={handleOpenConfigDialog} 
        onCreateItem={handleCreateItem}
      />

      {backlogItems.length === 0 ? (
        <KanbanEmptyState onCreateItem={handleCreateItem} />
      ) : (
        <KanbanColumns
          boardConfig={boardConfig}
          backlogItems={backlogItems}
          collapsedColumns={collapsedColumns}
          toggleColumn={toggleColumn}
          onDragEnd={onDragEnd}
          onEditItem={onEditItem}
          onQuickStatusChange={onQuickStatusChange}
          columnSize={columnSize}
        />
      )}

      <KanbanDialogs
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        newItemDialogOpen={newItemDialogOpen}
        setNewItemDialogOpen={setNewItemDialogOpen}
        configOpen={configOpen}
        setConfigOpen={setConfigOpen}
        boardConfig={boardConfig}
        updateBoardConfig={updateBoardConfig}
        onFormSuccess={handleNewItemSuccess}
        onFormCancel={handleNewItemCancel}
      />
    </>
  );
};

export default KanbanBoard;

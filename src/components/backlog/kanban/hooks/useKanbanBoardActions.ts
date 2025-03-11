import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { KanbanBoardConfig, sprintColumnsConfig, defaultKanbanConfig } from '@/utils/types/kanbanTypes';
import { KanbanActions } from './types';

export const useKanbanBoardActions = (
  backlogItems: BacklogItem[],
  boardConfig: KanbanBoardConfig,
  collapsedColumns: string[],
  setCollapsedColumns: React.Dispatch<React.SetStateAction<string[]>>,
  setBoardConfig: React.Dispatch<React.SetStateAction<KanbanBoardConfig>>,
  setEditingItem: React.Dispatch<React.SetStateAction<BacklogItem | null>>,
  setNewItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setDefaultStatus: React.Dispatch<React.SetStateAction<string | undefined>>,
  viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label',
  onCreateItem: (defaultStatus?: string) => void
): KanbanActions => {

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(s => s !== columnId)
        : [...prev, columnId]
    );
  };

  const getItemsForColumn = (column: string, columnId: string) => {
    if (viewDimension === 'status') {
      return backlogItems.filter(item => item.status === column);
    } 
    else if (viewDimension === 'sprint') {
      return backlogItems.filter(item => 
        column === 'backlog' 
          ? !item.releaseId 
          : columnId === item.releaseId
      );
    }
    else if (viewDimension === 'assignee') {
      const assigneeValue = columnId.replace('assignee-', '');
      return backlogItems.filter(item => 
        assigneeValue === 'unassigned' 
          ? !item.assignee 
          : item.assignee === assigneeValue
      );
    }
    else if (viewDimension === 'priority') {
      const priority = columnId.replace('priority-', '');
      return backlogItems.filter(item => 
        priority === 'none' 
          ? !item.priority 
          : item.priority === priority
      );
    }
    else if (viewDimension === 'label') {
      const label = columnId.replace('label-', '');
      return backlogItems.filter(item => 
        label === 'No Label' 
          ? !item.labels || item.labels.length === 0 
          : item.labels && item.labels.includes(label)
      );
    }
    return [];
  };

  const updateBoardConfig = (newConfig: KanbanBoardConfig) => {
    // Check if view type changed from status to sprint or vice versa
    if (newConfig.viewType !== boardConfig.viewType) {
      // If changing to sprint view and there are no sprint columns
      if (newConfig.viewType === 'sprint' && !newConfig.columns.some(col => col.statusValue.startsWith('sprint'))) {
        // Add sprint columns
        newConfig.columns = [...sprintColumnsConfig];
      }
      else if (newConfig.viewType === 'status' && !newConfig.columns.some(col => ['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'].includes(col.statusValue))) {
        // Restore default status columns
        newConfig.columns = [...defaultKanbanConfig.columns];
      }
    }
    
    setBoardConfig(newConfig);
    setConfigOpen(false);
  };

  const handleNewItemSuccess = () => {
    setNewItemDialogOpen(false);
    setEditingItem(null);
    setDefaultStatus(undefined);
  };

  const handleNewItemCancel = () => {
    setNewItemDialogOpen(false);
    setEditingItem(null);
    setDefaultStatus(undefined);
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

  const handleAddItem = (status: string) => {
    setDefaultStatus(status);
    onCreateItem(status);
  };

  const handleCreateItem = () => {
    onCreateItem();
  };

  const setConfigOpen = (open: boolean) => {
    setNewItemDialogOpen(open);
  };

  return {
    setConfigOpen,
    setNewItemDialogOpen,
    setEditingItem,
    toggleColumn,
    getItemsForColumn,
    updateBoardConfig,
    handleNewItemSuccess,
    handleNewItemCancel,
    handleAddBucket,
    handleAddItem,
    handleCreateItem
  };
};

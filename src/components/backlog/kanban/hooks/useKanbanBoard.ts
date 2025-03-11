
import { useState, useEffect } from 'react';
import { KanbanBoardConfig, defaultKanbanConfig, sprintColumnsConfig, generateAssigneeColumns, priorityColumnsConfig, generateLabelColumns } from '@/utils/types/kanbanTypes';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface UseKanbanBoardProps {
  backlogItems: BacklogItem[];
  viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
  onCreateItem: (defaultStatus?: string) => void;
}

export function useKanbanBoard({ 
  backlogItems, 
  viewDimension, 
  onCreateItem 
}: UseKanbanBoardProps) {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<string | undefined>(undefined);

  // Generate dynamic columns based on the view dimension
  useEffect(() => {
    let newConfig: KanbanBoardConfig = {...boardConfig, viewType: viewDimension};
    
    if (viewDimension === 'status') {
      // Use default status columns
      if (!boardConfig.columns.some(col => col.id === 'open')) {
        newConfig.columns = defaultKanbanConfig.columns;
      }
    } 
    else if (viewDimension === 'sprint') {
      // Use sprint columns
      if (!boardConfig.columns.some(col => col.id.startsWith('sprint-'))) {
        newConfig.columns = sprintColumnsConfig;
      }
    }
    else if (viewDimension === 'assignee') {
      // Generate columns based on unique assignees in backlog items
      const uniqueAssignees = Array.from(
        new Set(
          backlogItems
            .filter(item => item.assignee)
            .map(item => ({
              id: item.assignee || 'unassigned',
              name: typeof item.assignee === 'string' ? item.assignee : 'Unassigned'
            }))
        )
      );
      
      // Add an unassigned column if not already included
      if (!uniqueAssignees.some(a => a.id === 'unassigned')) {
        uniqueAssignees.push({ id: 'unassigned', name: 'Unassigned' });
      }
      
      newConfig.columns = generateAssigneeColumns(uniqueAssignees);
    }
    else if (viewDimension === 'priority') {
      // Use priority columns
      newConfig.columns = priorityColumnsConfig;
    }
    else if (viewDimension === 'label') {
      // Generate columns based on unique labels in backlog items
      const allLabels = backlogItems.flatMap(item => item.labels || []);
      const uniqueLabels = Array.from(new Set(allLabels));
      
      // Add a "No Label" option
      if (uniqueLabels.length > 0 && !uniqueLabels.includes('No Label')) {
        uniqueLabels.push('No Label');
      }
      
      newConfig.columns = generateLabelColumns(uniqueLabels.length > 0 ? uniqueLabels : ['No Label']);
    }
    
    setBoardConfig(newConfig);
  }, [viewDimension, backlogItems, boardConfig]);

  // Load configuration from localStorage if available
  useEffect(() => {
    const savedConfig = localStorage.getItem('kanbanBoardConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setBoardConfig(prev => ({
          ...parsedConfig,
          viewType: viewDimension // Always use the current view dimension
        }));
        
        // Load collapsed columns from saved config
        if (parsedConfig.defaultCollapsed) {
          setCollapsedColumns(parsedConfig.defaultCollapsed);
        }
      } catch (e) {
        console.error('Failed to parse saved kanban config:', e);
      }
    }
  }, [viewDimension]);

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('kanbanBoardConfig', JSON.stringify(boardConfig));
  }, [boardConfig]);

  // Setup event listener for custom events
  useEffect(() => {
    const handleOpenConfigEvent = () => {
      setConfigOpen(true);
    };

    const boardElement = document.querySelector('[data-kanban-board]');
    if (boardElement) {
      boardElement.addEventListener('openConfig', handleOpenConfigEvent);
    }

    return () => {
      if (boardElement) {
        boardElement.removeEventListener('openConfig', handleOpenConfigEvent);
      }
    };
  }, [boardConfig]); // Re-attach when boardConfig changes

  // Group items based on the current view dimension
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

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(s => s !== columnId)
        : [...prev, columnId]
    );
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

  return {
    collapsedColumns,
    boardConfig,
    configOpen,
    newItemDialogOpen,
    editingItem,
    defaultStatus,
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
}

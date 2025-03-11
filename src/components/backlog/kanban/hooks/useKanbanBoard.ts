
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { 
  KanbanBoardConfig, 
  defaultKanbanConfig, 
  sprintColumnsConfig
} from '@/utils/types/kanbanTypes';
import { toast } from 'sonner';
import { UseKanbanBoardProps, KanbanBoardState, KanbanActions } from './types';
import { useKanbanBoardColumnConfig } from './useKanbanBoardColumnConfig';
import { useKanbanBoardActions } from './useKanbanBoardActions';

export function useKanbanBoard({ 
  backlogItems, 
  viewDimension, 
  onCreateItem 
}: UseKanbanBoardProps): KanbanBoardState & KanbanActions {
  // State
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<string | undefined>(undefined);

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

  // Get column config functionality
  const { getItemsForColumn, handleAddBucket } = useKanbanBoardColumnConfig(
    { backlogItems, viewDimension, onCreateItem },
    boardConfig,
    setBoardConfig
  );

  // Get action handlers
  const { 
    toggleColumn: actionToggleColumn,
    updateBoardConfig: actionUpdateBoardConfig,
    handleNewItemSuccess: actionHandleNewItemSuccess,
    handleNewItemCancel: actionHandleNewItemCancel,
    handleAddItem: actionHandleAddItem,
    handleCreateItem: actionHandleCreateItem
  } = useKanbanBoardActions(
    { backlogItems, viewDimension, onCreateItem },
    boardConfig,
    setBoardConfig,
    setCollapsedColumns,
    setNewItemDialogOpen,
    setEditingItem,
    setDefaultStatus,
    collapsedColumns
  );

  // Create wrapper functions to handle local state properly
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

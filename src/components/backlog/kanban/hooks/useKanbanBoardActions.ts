
import { toast } from 'sonner';
import { KanbanBoardConfig, sprintColumnsConfig, defaultKanbanConfig } from '@/utils/types/kanbanTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { UseKanbanBoardProps } from './types';

export function useKanbanBoardActions(
  props: UseKanbanBoardProps,
  boardConfig: KanbanBoardConfig,
  setBoardConfig: (config: KanbanBoardConfig) => void,
  setCollapsedColumns: (columns: string[]) => void,
  setNewItemDialogOpen: (open: boolean) => void,
  setEditingItem: (item: BacklogItem | null) => void,
  setDefaultStatus: (status: string | undefined) => void,
  collapsedColumns: string[]
) {
  const { onCreateItem } = props;

  // Setup event listener for custom events
  const setupEventListeners = (callback: () => void) => {
    const handleOpenConfigEvent = () => {
      callback();
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
  };

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns(
      collapsedColumns.includes(columnId)
        ? collapsedColumns.filter(s => s !== columnId)
        : [...collapsedColumns, columnId]
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
    setNewItemDialogOpen(true);
    onCreateItem();
  };

  const handleAddColumn = () => {
    // Open the board configuration dialog to add a column
    toast.info("Opening board configuration where you can add new columns");
    setBoardConfig({...boardConfig});
  };

  return {
    setupEventListeners,
    toggleColumn,
    updateBoardConfig,
    handleNewItemSuccess,
    handleNewItemCancel,
    handleAddItem,
    handleCreateItem,
    handleAddColumn
  };
}

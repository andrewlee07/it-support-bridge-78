
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';

export interface UseKanbanBoardProps {
  backlogItems: BacklogItem[];
  viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
  onCreateItem: (defaultStatus?: string) => void;
}

export interface KanbanBoardState {
  collapsedColumns: string[];
  boardConfig: KanbanBoardConfig;
  configOpen: boolean;
  newItemDialogOpen: boolean;
  editingItem: BacklogItem | null;
  defaultStatus: string | undefined;
}

export interface KanbanActions {
  setConfigOpen: (open: boolean) => void;
  setNewItemDialogOpen: (open: boolean) => void;
  setEditingItem: (item: BacklogItem | null) => void;
  toggleColumn: (columnId: string) => void;
  getItemsForColumn: (columnStatusValue: string, columnId: string) => BacklogItem[];
  updateBoardConfig: (newConfig: KanbanBoardConfig) => void;
  handleNewItemSuccess: () => void;
  handleNewItemCancel: () => void;
  handleAddBucket: () => void;
  handleAddItem: (status: string) => void;
  handleCreateItem: () => void;
}

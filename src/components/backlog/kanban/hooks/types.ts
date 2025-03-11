
import { BacklogItem } from "@/utils/types/backlogTypes";
import { KanbanBoardConfig } from "@/utils/types/kanbanTypes";

// Define ViewDimension directly here to avoid circular references
export type ViewDimension = 'status' | 'sprint' | 'assignee' | 'priority' | 'label';

export interface UseKanbanBoardProps {
  backlogItems: BacklogItem[];
  viewDimension: ViewDimension;
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
  handleAddColumn: () => void; // Add the missing method
}

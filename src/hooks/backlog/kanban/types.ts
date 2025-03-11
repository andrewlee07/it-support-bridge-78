
import { BacklogItem } from "@/utils/types/backlogTypes";

// Define ViewDimension directly here to avoid circular references
export type ViewDimension = 'status' | 'sprint' | 'assignee' | 'priority' | 'label' | 'release' | 'progress' | 'due-date';

export interface UseBacklogKanbanReturn {
  backlogItems: BacklogItem[];
  isLoading: boolean;
  viewDimension: ViewDimension;
  handleDragEnd: (result: any) => void;
  handleEditItem: (item: BacklogItem) => void;
  handleQuickStatusChange: (itemId: string, newStatus: string) => void;
  handleCreateItem: (defaultStatus?: string) => void;
  handleViewDimensionChange: (dimension: ViewDimension) => void;
}

// Advanced filtering types
export interface FilterPreset {
  id: string;
  name: string;
  filters: BacklogFilter[];
}

export interface BacklogFilter {
  type: 'sprint' | 'status' | 'assignee' | 'priority' | 'label' | 'release' | 'progress' | 'due-date';
  values: string[];
}

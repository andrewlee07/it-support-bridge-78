
import { BacklogItem } from "@/utils/types/backlogTypes";

// Define ViewDimension directly here to avoid circular references
export type ViewDimension = 'status' | 'sprint' | 'assignee' | 'priority' | 'label';

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

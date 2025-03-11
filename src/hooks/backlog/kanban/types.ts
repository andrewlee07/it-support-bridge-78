
import { ViewDimension } from "../useBacklogKanban";
import { BacklogItem } from "@/utils/types/backlogTypes";

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

export { ViewDimension };

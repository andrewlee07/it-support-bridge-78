
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  ListPlus 
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface KanbanBoardHeaderProps {
  onConfigOpen: () => void;
  onCreateItem: () => void;
  onAddColumn: () => void;
  viewDimension?: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
}

const KanbanBoardHeader: React.FC<KanbanBoardHeaderProps> = ({ 
  onConfigOpen, 
  onCreateItem,
  onAddColumn,
  viewDimension = 'status'
}) => {
  const dimensionLabel = {
    status: 'Status',
    sprint: 'Sprint',
    assignee: 'Assignee',
    priority: 'Priority',
    label: 'Label'
  }[viewDimension];
  
  const handleAddColumn = () => {
    toast.info("Add column functionality is not yet implemented");
    onAddColumn();
  };

  const handleCreateItem = () => {
    toast.info("Create item functionality is not yet implemented");
    onCreateItem();
  };
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <Badge variant="outline" className="mr-3 px-2 py-1">
          View: By {dimensionLabel}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Drag items between columns to update their {viewDimension.toLowerCase()}
        </span>
      </div>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddColumn}
            >
              <ListPlus className="h-4 w-4 mr-1" />
              Add Column
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a new column to your board</TooltipContent>
        </Tooltip>
        
        <Button size="sm" onClick={handleCreateItem}>
          <PlusCircle className="h-4 w-4 mr-1" />
          New Item
        </Button>
      </div>
    </div>
  );
};

export default KanbanBoardHeader;

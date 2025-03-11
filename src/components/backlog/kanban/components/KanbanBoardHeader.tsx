
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Settings, 
  ListPlus 
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

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
              onClick={onAddColumn}
            >
              <ListPlus className="h-4 w-4 mr-1" />
              Add Column
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a new column to your board</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onConfigOpen}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
          </TooltipTrigger>
          <TooltipContent>Configure board settings</TooltipContent>
        </Tooltip>
        
        <Button size="sm" onClick={onCreateItem}>
          <PlusCircle className="h-4 w-4 mr-1" />
          New Item
        </Button>
      </div>
    </div>
  );
};

export default KanbanBoardHeader;

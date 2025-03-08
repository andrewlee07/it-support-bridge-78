
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus } from 'lucide-react';

interface KanbanBoardHeaderProps {
  onConfigOpen: () => void;
  onCreateItem: () => void;
}

const KanbanBoardHeader: React.FC<KanbanBoardHeaderProps> = ({
  onConfigOpen,
  onCreateItem
}) => {
  return (
    <div className="flex justify-between mb-4">
      <Button 
        variant="default" 
        size="sm" 
        onClick={onCreateItem}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Create Backlog Item
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onConfigOpen}
        className="flex items-center gap-1"
      >
        <Settings className="h-4 w-4" />
        Configure Board
      </Button>
    </div>
  );
};

export default KanbanBoardHeader;

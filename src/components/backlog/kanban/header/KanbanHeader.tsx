
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListIcon, Sliders } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface KanbanHeaderProps {
  viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label';
  onViewDimensionChange: (dimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label') => void;
}

const KanbanHeader: React.FC<KanbanHeaderProps> = ({ 
  viewDimension, 
  onViewDimensionChange 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Backlog Board</h1>
        <p className="text-muted-foreground">Manage your backlog items using the kanban board</p>
      </div>
      <div className="flex gap-2">
        <Select 
          value={viewDimension} 
          onValueChange={(val) => onViewDimensionChange(val as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View dimension" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="status">By Status</SelectItem>
            <SelectItem value="sprint">By Sprint</SelectItem>
            <SelectItem value="assignee">By Assignee</SelectItem>
            <SelectItem value="priority">By Priority</SelectItem>
            <SelectItem value="label">By Label</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline"
          onClick={() => navigate('/backlog')}
        >
          <ListIcon className="mr-2 h-4 w-4" />
          List View
        </Button>
        <Button 
          variant="outline"
          onClick={() => document.querySelector('[data-kanban-board]')?.dispatchEvent(new Event('openConfig'))}
        >
          <Sliders className="mr-2 h-4 w-4" />
          Board Settings
        </Button>
      </div>
    </div>
  );
};

export default KanbanHeader;

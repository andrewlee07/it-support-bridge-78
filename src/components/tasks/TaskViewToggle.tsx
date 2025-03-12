
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List, Calendar } from 'lucide-react';

export type TaskViewType = 'table' | 'grid' | 'calendar';

export interface TaskViewToggleProps {
  currentView: TaskViewType;
  onViewChange: (view: TaskViewType) => void;
}

const TaskViewToggle: React.FC<TaskViewToggleProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && onViewChange(value as TaskViewType)}>
      <ToggleGroupItem value="table" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="calendar" aria-label="Calendar view">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TaskViewToggle;

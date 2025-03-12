
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Grid, List, Calendar } from 'lucide-react';

export type TaskViewType = 'grid' | 'table' | 'calendar';

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
      <ToggleGroupItem value="grid" aria-label="Grid View">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table View">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="calendar" aria-label="Calendar View">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TaskViewToggle;


import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List, Calendar } from 'lucide-react';

export type TaskViewType = 'table' | 'grid' | 'calendar';
// Export alias for backward compatibility with Tasks.tsx
export type TaskViewMode = TaskViewType;

export interface TaskViewToggleProps {
  currentView: TaskViewType;
  onViewChange: (view: TaskViewType) => void;
  // For backward compatibility with Tasks.tsx
  activeView?: TaskViewType;
}

const TaskViewToggle: React.FC<TaskViewToggleProps> = ({
  currentView,
  onViewChange,
  activeView
}) => {
  // Use activeView if provided (for backward compatibility)
  const effectiveView = activeView || currentView;
  
  const handleViewChange = (value: string) => {
    if (value) {
      onViewChange(value as TaskViewType);
    }
  };
  
  return (
    <ToggleGroup 
      type="single" 
      value={effectiveView} 
      onValueChange={handleViewChange}
    >
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

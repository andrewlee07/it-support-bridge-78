
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Grid, 
  List, 
  Calendar as CalendarIcon 
} from 'lucide-react';

export type TaskViewMode = 'grid' | 'list' | 'calendar';

interface TaskViewToggleProps {
  activeView: TaskViewMode;
  onViewChange: (view: TaskViewMode) => void;
}

const TaskViewToggle: React.FC<TaskViewToggleProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <Tabs
      value={activeView}
      onValueChange={(value) => onViewChange(value as TaskViewMode)}
      className="w-fit"
    >
      <TabsList className="grid grid-cols-3 w-auto">
        <TabsTrigger value="grid" aria-label="Grid View" className="flex items-center gap-2 px-3">
          <Grid className="h-4 w-4" />
          <span className="hidden sm:inline">Grid</span>
        </TabsTrigger>
        <TabsTrigger value="list" aria-label="List View" className="flex items-center gap-2 px-3">
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">List</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" aria-label="Calendar View" className="flex items-center gap-2 px-3">
          <CalendarIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Calendar</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TaskViewToggle;

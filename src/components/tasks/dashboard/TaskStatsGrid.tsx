
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, Clock, PauseCircle, AlertCircle } from 'lucide-react';
import { TaskStats } from '@/utils/types/taskTypes';
import { cn } from '@/lib/utils';

interface TaskStatsGridProps {
  taskStats: TaskStats | null;
  cardFilters?: string[];
  toggleCardFilter?: (filter: string) => void;
}

const TaskStatsGrid: React.FC<TaskStatsGridProps> = ({ 
  taskStats, 
  cardFilters = [], 
  toggleCardFilter = () => {} 
}) => {
  if (!taskStats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('new') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('new')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">New Tasks</p>
            <p className="text-2xl font-bold">{taskStats.newTasks}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <ClipboardList className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('in-progress') ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' : ''
        )}
        onClick={() => toggleCardFilter('in-progress')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold">{taskStats.inProgressTasks}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/20">
            <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('on-hold') ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' : ''
        )}
        onClick={() => toggleCardFilter('on-hold')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">On Hold</p>
            <p className="text-2xl font-bold">{taskStats.onHoldTasks}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900/20">
            <PauseCircle className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('overdue') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('overdue')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Overdue</p>
            <p className="text-2xl font-bold">{taskStats.overdueCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <AlertCircle className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatsGrid;

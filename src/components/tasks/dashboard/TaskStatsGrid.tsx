
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, Clock, PauseCircle, AlertCircle } from 'lucide-react';
import { TaskStats } from '@/utils/types/taskTypes';

interface TaskStatsGridProps {
  taskStats: TaskStats | null;
}

const TaskStatsGrid: React.FC<TaskStatsGridProps> = ({ taskStats }) => {
  if (!taskStats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
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

      <Card>
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

      <Card>
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

      <Card>
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

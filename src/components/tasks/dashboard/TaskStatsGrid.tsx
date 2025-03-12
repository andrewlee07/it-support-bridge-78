
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Clock, PauseCircle, AlertCircle } from 'lucide-react';
import { TaskStats } from '@/utils/types/taskTypes';

interface TaskStatsGridProps {
  taskStats: TaskStats | null;
}

const TaskStatsGrid: React.FC<TaskStatsGridProps> = ({ taskStats }) => {
  if (!taskStats) return null;

  const renderStatusCard = (title: string, count: number, icon: React.ReactNode, color: string) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={color}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {renderStatusCard(
        "New Tasks", 
        taskStats.newTasks, 
        <ClipboardList className="h-4 w-4" />, 
        "text-blue-500"
      )}
      {renderStatusCard(
        "In Progress", 
        taskStats.inProgressTasks, 
        <Clock className="h-4 w-4" />, 
        "text-purple-500"
      )}
      {renderStatusCard(
        "On Hold", 
        taskStats.onHoldTasks, 
        <PauseCircle className="h-4 w-4" />, 
        "text-yellow-500"
      )}
      {renderStatusCard(
        "Overdue", 
        taskStats.overdueCount, 
        <AlertCircle className="h-4 w-4" />, 
        "text-red-500"
      )}
    </div>
  );
};

export default TaskStatsGrid;

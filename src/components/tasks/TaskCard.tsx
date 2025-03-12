
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/utils/types/taskTypes';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Calendar, User } from 'lucide-react';
import WatchButton from '@/components/shared/WatchButton';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  // Format due date if exists
  const formattedDueDate = task.dueDate 
    ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })
    : null;
  
  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Helper function to determine priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const watchableItem = {
    id: task.id,
    type: 'task' as const,
    title: task.title,
    status: task.status,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt)
  };

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer relative" 
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <WatchButton item={watchableItem} />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{task.id}</div>
            <h3 className="text-base font-semibold leading-tight">{task.title}</h3>
          </div>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Badge className={getStatusColor(task.status)}>
            {task.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1" />
            {task.assignee ? task.assignee : 'Unassigned'}
          </div>
          {formattedDueDate && (
            <div className="flex items-center text-xs text-muted-foreground justify-end">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDueDate}
            </div>
          )}
          {!formattedDueDate && (
            <div className="flex items-center text-xs text-muted-foreground justify-end">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

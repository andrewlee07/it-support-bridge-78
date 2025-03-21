
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/utils/types/taskTypes';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Calendar, User, CheckCircle, AlertCircle, HourglassIcon, XCircle } from 'lucide-react';
import WatchButton from '@/components/shared/WatchButton';
import { getTaskStatusVisuals, getTaskPriorityVisuals } from '@/utils/types/taskTypes';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  // Format due date if exists
  const formattedDueDate = task.dueDate 
    ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })
    : null;
  
  // Get visuals using the utility functions
  const statusVisuals = getTaskStatusVisuals(task.status);
  const priorityVisuals = getTaskPriorityVisuals(task.priority);
  
  // Helper function to determine status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'in-progress':
        return <HourglassIcon className="h-3 w-3 mr-1" />;
      case 'on-hold':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3 mr-1" />;
      default:
        return <AlertCircle className="h-3 w-3 mr-1" />;
    }
  };
  
  // Format the priority label
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
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

  // Calculate progress based on checklist if available
  const checklistProgress = task.checklist?.length 
    ? Math.round((task.checklist.filter(item => item.completed).length / task.checklist.length) * 100)
    : null;

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer border-gray-200" 
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{task.id}</p>
          <h3 className="text-base font-semibold leading-tight mt-1">{task.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={priorityVisuals.badge}>
            {getPriorityLabel(task.priority)}
          </Badge>
          <WatchButton item={watchableItem} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        {checklistProgress !== null && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{checklistProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${checklistProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <Badge variant="outline" className={`${statusVisuals.badge} mt-2 gap-1 flex items-center`}>
          {getStatusIcon(task.status)}
          {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
        </Badge>
        
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

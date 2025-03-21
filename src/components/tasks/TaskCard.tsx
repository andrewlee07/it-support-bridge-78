
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/utils/types/taskTypes';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Calendar, User, CheckCircle, AlertCircle, HourglassIcon, XCircle } from 'lucide-react';
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
  
  // Helper function to determine status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new':
        return {
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <AlertCircle className="h-3 w-3 mr-1" />
        };
      case 'in-progress':
        return {
          className: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <HourglassIcon className="h-3 w-3 mr-1" />
        };
      case 'on-hold':
        return {
          className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      case 'completed':
        return {
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'cancelled':
        return {
          className: 'bg-red-50 text-red-700 border-red-200',
          icon: <XCircle className="h-3 w-3 mr-1" />
        };
      default:
        return {
          className: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: <AlertCircle className="h-3 w-3 mr-1" />
        };
    }
  };
  
  // Helper function to determine priority color
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          className: 'bg-red-50 text-red-700 border-red-200',
          label: 'Critical'
        };
      case 'high':
        return {
          className: 'bg-orange-50 text-orange-700 border-orange-200',
          label: 'High'
        };
      case 'medium':
        return {
          className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          label: 'Medium'
        };
      case 'low':
        return {
          className: 'bg-green-50 text-green-700 border-green-200',
          label: 'Low'
        };
      default:
        return {
          className: 'bg-gray-50 text-gray-700 border-gray-200',
          label: 'Unknown'
        };
    }
  };

  const statusInfo = getStatusInfo(task.status);
  const priorityInfo = getPriorityInfo(task.priority);

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
          <Badge variant="outline" className={priorityInfo.className}>
            {priorityInfo.label}
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
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${checklistProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <Badge variant="outline" className={`${statusInfo.className} mt-2 gap-1`}>
          {statusInfo.icon}
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

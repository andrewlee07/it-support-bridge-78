
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/utils/types/taskTypes';
import { CalendarDays, Clock, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns';
import { 
  getTaskStatusColor, 
  getTaskPriorityColor, 
  isTaskOverdue, 
  isTaskDueSoon,
  getTaskStatusVisuals,
  getTaskPriorityVisuals
} from '@/utils/types/taskTypes';
import { getStatusIconForTask, getPriorityIcon } from '@/components/shared/notifications/iconHelpers';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  // Helper to get appropriate due date styling
  const getDueDateColor = () => {
    if (!task.dueDate) return 'text-gray-500';
    if (isTaskOverdue(task)) return 'text-red-600 font-medium';
    if (isTaskDueSoon(task, 24)) return 'text-orange-600';
    return 'text-gray-600';
  };

  // Format the due date for display
  const formatDueDate = () => {
    if (!task.dueDate) return 'No due date';
    
    const dueDate = new Date(task.dueDate);
    
    if (isToday(dueDate)) return 'Due today';
    if (isTomorrow(dueDate)) return 'Due tomorrow';
    if (isPast(dueDate)) return `Overdue (${formatDistanceToNow(dueDate, { addSuffix: true })})`;
    
    return `Due ${formatDistanceToNow(dueDate, { addSuffix: true })}`;
  };

  // Get visual enhancements based on status and priority
  const statusVisuals = getTaskStatusVisuals(task.status);
  const priorityVisuals = getTaskPriorityVisuals(task.priority);

  // Apply animation to critical tasks that are not completed or cancelled
  const shouldAnimate = task.priority === 'critical' && 
                       task.status !== 'completed' && 
                       task.status !== 'cancelled';

  // Determine border color based on status
  const cardBorderClass = `border ${statusVisuals.borderColor}`;

  // Determine if task needs attention (overdue or critical)
  const needsAttention = isTaskOverdue(task) || task.priority === 'critical';

  return (
    <Card 
      className={`shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer ${cardBorderClass} ${shouldAnimate ? 'animate-pulse' : ''} ${statusVisuals.hoverBg}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{task.id}</div>
            <h3 className="text-base font-semibold leading-tight">{task.title}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={priorityVisuals.badge}>
              {getPriorityIcon(task.priority, { className: "h-3 w-3 mr-1" })}
              {task.priority}
            </Badge>
            {needsAttention && (
              <div className="flex items-center text-red-500 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {isTaskOverdue(task) ? 'Overdue' : 'Critical'}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Badge className={statusVisuals.badge}>
            {getStatusIconForTask(task.status, { className: "h-3 w-3 mr-1" })}
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1" />
            {task.assignee ? `Assigned` : 'Unassigned'}
          </div>
          <div className={`flex items-center text-xs justify-end ${getDueDateColor()}`}>
            <Clock className="h-3 w-3 mr-1" />
            {formatDueDate()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;


import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/utils/types/taskTypes';
import { CalendarDays, Clock, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow, isToday, isTomorrow, isPast, differenceInHours } from 'date-fns';
import { 
  getTaskStatusColor, 
  getTaskPriorityColor, 
  isTaskOverdue, 
  isTaskDueSoon,
  getTaskStatusVisuals,
  getTaskPriorityVisuals
} from '@/utils/types/taskTypes';
import { getStatusIconForTask, getPriorityIcon } from '@/components/shared/notifications/iconHelpers';
import { getUserNameById } from '@/utils/userUtils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  highlight?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, highlight = false }) => {
  // Helper to get appropriate due date styling
  const getDueDateColor = () => {
    if (!task.dueDate) return 'text-gray-500';
    
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const hoursUntilDue = differenceInHours(dueDate, now);
    
    if (isPast(dueDate)) return 'text-red-600 font-medium';
    if (isToday(dueDate)) {
      // Today but less than 4 hours away
      if (hoursUntilDue <= 4) return 'text-red-500 font-medium animate-pulse';
      // Today but more than 4 hours away
      return 'text-amber-600 font-medium';
    }
    if (isTomorrow(dueDate)) return 'text-amber-500';
    if (isTaskDueSoon(task, 48)) return 'text-orange-600';
    return 'text-gray-600';
  };

  // Format the due date for display
  const formatDueDate = () => {
    if (!task.dueDate) return 'No due date';
    
    const dueDate = new Date(task.dueDate);
    
    if (isToday(dueDate)) {
      // Format for today with hours remaining
      const now = new Date();
      const hoursLeft = Math.max(0, Math.floor(differenceInHours(dueDate, now)));
      if (hoursLeft <= 4) {
        return `Due in ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`;
      }
      return 'Due today';
    }
    
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

  // Determine if task needs attention (overdue or critical)
  const needsAttention = isTaskOverdue(task) || task.priority === 'critical';
  
  // Check if the task is due today
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));
  
  // Special styling for tasks due today
  const todayHighlightClass = isDueToday ? 'ring-2 ring-amber-400' : '';
  const highlightBorder = highlight ? 'border-blue-400 border-2' : '';

  // Get user name for assignee
  const assigneeName = getUserNameById(task.assignee);

  // Generate accessible label for the task card
  const taskStatusLabel = task.status.replace('-', ' ');
  const priorityLabel = task.priority;
  const dueDateLabel = formatDueDate();
  const accessibleLabel = `Task: ${task.title}. Status: ${taskStatusLabel}. Priority: ${priorityLabel}. ${dueDateLabel}${needsAttention ? '. Needs attention.' : ''}`;

  return (
    <Card 
      className={`shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer ${todayHighlightClass} ${highlightBorder} ${shouldAnimate ? 'animate-pulse' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={accessibleLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <CardHeader className={`pb-2 ${isDueToday ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`}>
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="text-xs text-muted-foreground mb-1" aria-hidden="true">{task.id}</div>
            <h3 className="text-base font-semibold leading-tight">{task.title}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={priorityVisuals.badge} aria-label={`Priority: ${task.priority}`}>
              {/* Use IconComponent with aria-hidden applied to the rendered element */}
              <span aria-hidden="true">
                {getPriorityIcon(task.priority, { className: "h-3 w-3 mr-1" })}
              </span>
              {task.priority}
            </Badge>
            {needsAttention && (
              <div className="flex items-center text-red-500 text-xs" aria-live="polite">
                <span aria-hidden="true">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                </span>
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
          <Badge className={statusVisuals.badge} aria-label={`Status: ${taskStatusLabel}`}>
            {/* Use IconComponent with aria-hidden applied to the rendered element */}
            <span aria-hidden="true">
              {getStatusIconForTask(task.status, { className: "h-3 w-3 mr-1" })}
            </span>
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <div className="flex items-center text-xs text-muted-foreground" aria-label={task.assignee ? `Assigned to ${assigneeName}` : 'Unassigned'}>
            <span aria-hidden="true">
              <User className="h-3 w-3 mr-1" />
            </span>
            {task.assignee ? assigneeName : 'Unassigned'}
          </div>
          <div className={`flex items-center text-xs justify-end ${getDueDateColor()}`} aria-live={isTaskOverdue(task) ? 'polite' : 'off'}>
            <span aria-hidden="true">
              <Clock className="h-3 w-3 mr-1" />
            </span>
            {formatDueDate()}
          </div>
        </div>
        {isDueToday && (
          <div className="w-full mt-2 pt-2 border-t flex justify-center">
            <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full flex items-center">
              <span aria-hidden="true">
                <CalendarDays className="h-3 w-3 mr-1" />
              </span>
              Due Today
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;


import React from 'react';
import { Task } from '@/utils/types/taskTypes';
import { Badge } from '@/components/ui/badge';
import { 
  getTaskStatusColor, 
  getTaskPriorityColor, 
  isTaskOverdue, 
  isTaskDueSoon,
  getTaskStatusVisuals,
  getTaskPriorityVisuals
} from '@/utils/types/taskTypes';
import { format, isToday, isPast } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Clock, AlertTriangle, User, Calendar } from 'lucide-react';
import { getStatusIconForTask, getPriorityIcon } from '@/components/shared/notifications/iconHelpers';

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onTaskClick }) => {
  // Helper function to render due date cell with appropriate styling
  const renderDueDate = (task: Task) => {
    if (!task.dueDate) return <span className="text-gray-500">-</span>;
    
    const dueDate = new Date(task.dueDate);
    const isOverdue = isTaskOverdue(task);
    const isDueSoon = isTaskDueSoon(task, 24);
    
    let icon = null;
    let textClass = '';
    
    if (isOverdue) {
      icon = <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />;
      textClass = 'text-red-600 font-medium';
    } else if (isDueSoon) {
      icon = <Clock className="h-4 w-4 text-amber-500 mr-1" />;
      textClass = 'text-amber-600';
    } else if (task.status === 'completed') {
      icon = <Check className="h-4 w-4 text-green-500 mr-1" />;
      textClass = 'text-green-600';
    } else {
      icon = <Calendar className="h-4 w-4 text-blue-500 mr-1" />;
      textClass = 'text-blue-600';
    }
    
    return (
      <div className={`flex items-center ${textClass}`}>
        {icon}
        <span>
          {format(dueDate, 'MMM d, yyyy')}
          {isToday(dueDate) && <span className="ml-1">(Today)</span>}
          {isPast(dueDate) && task.status !== 'completed' && task.status !== 'cancelled' && (
            <span className="ml-1">(Overdue)</span>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const statusVisuals = getTaskStatusVisuals(task.status);
            const priorityVisuals = getTaskPriorityVisuals(task.priority);
            const shouldHighlight = task.priority === 'critical' || isTaskOverdue(task);
            
            return (
              <TableRow 
                key={task.id} 
                onClick={() => onTaskClick(task.id)}
                className={`cursor-pointer ${statusVisuals.hoverBg} ${shouldHighlight ? 'border-l-4 ' + (isTaskOverdue(task) ? 'border-l-red-500' : 'border-l-orange-500') : ''}`}
              >
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {task.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusVisuals.badge}>
                    {getStatusIconForTask(task.status, { className: "h-3 w-3 mr-1" })}
                    {task.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={priorityVisuals.badge}>
                    {getPriorityIcon(task.priority, { className: "h-3 w-3 mr-1" })}
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{renderDueDate(task)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {task.assignee || 'Unassigned'}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;

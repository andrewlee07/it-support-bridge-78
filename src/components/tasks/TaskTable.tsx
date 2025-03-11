
import React from 'react';
import { Task } from '@/utils/types/taskTypes';
import { Badge } from '@/components/ui/badge';
import { getTaskStatusColor, getTaskPriorityColor, isTaskOverdue, isTaskDueSoon } from '@/utils/types/taskTypes';
import { format, isToday, isPast } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Clock, AlertTriangle } from 'lucide-react';

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
          {tasks.map((task) => (
            <TableRow 
              key={task.id} 
              onClick={() => onTaskClick(task.id)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge className={getTaskStatusColor(task.status)}>
                  {task.status.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getTaskPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>{renderDueDate(task)}</TableCell>
              <TableCell>{task.assignee || 'Unassigned'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;

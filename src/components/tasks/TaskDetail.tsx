
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, Clock, User } from 'lucide-react';
import { Task } from '@/utils/types/taskTypes';

interface TaskDetailProps {
  task: Task;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <Badge 
            variant={
              task.status === 'completed' ? 'success' :
              task.status === 'in-progress' ? 'default' :
              task.status === 'on-hold' ? 'warning' : 'secondary'
            }
          >
            {task.status}
          </Badge>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{task.assignee || 'Unassigned'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{task.estimatedHours || 0} hours</span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}</span>
            </div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
          
          {task.checklist && task.checklist.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Checklist</h3>
              <ul className="space-y-2">
                {task.checklist.map(item => (
                  <li key={item.id} className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      checked={item.completed} 
                      readOnly 
                      className="mt-1"
                    />
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDetail;

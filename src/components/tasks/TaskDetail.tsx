
import React from 'react';
import { Task, getTaskStatusVisuals, getTaskPriorityVisuals } from '@/utils/types/taskTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CheckSquare, Clock, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onEdit, onDelete }) => {
  const statusVisuals = getTaskStatusVisuals(task.status);
  const priorityVisuals = getTaskPriorityVisuals(task.priority);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <CardDescription className="mt-1">
              Task ID: {task.id}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge className={statusVisuals.badge}>{task.status}</Badge>
            <Badge className={priorityVisuals.badge}>{task.priority}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <div className="bg-muted/30 p-4 rounded-md whitespace-pre-wrap">
            {task.description || 'No description provided.'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Status</h3>
            <div className="flex items-center">
              <Badge className={statusVisuals.badge}>{task.status}</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Priority</h3>
            <div className="flex items-center">
              <Badge className={priorityVisuals.badge}>{task.priority}</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Assigned To</h3>
            <div>{task.assignedTo || 'Unassigned'}</div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Created By</h3>
            <div>{task.createdBy}</div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Created At</h3>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {format(new Date(task.createdAt), 'PPP')}
            </div>
          </div>
          
          {task.dueDate && (
            <div>
              <h3 className="text-sm font-medium mb-1">Due Date</h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {format(new Date(task.dueDate), 'PPP')}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-1">Estimated Hours</h3>
            <div>{task.estimatedHours || 'Not estimated'}</div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Actual Hours</h3>
            <div>{task.actualHours || 0}</div>
          </div>
        </div>
        
        {task.checklist && task.checklist.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Checklist</h3>
            <div className="space-y-2">
              {task.checklist.map((item) => (
                <div key={item.id} className="flex items-start">
                  <CheckSquare className={`h-5 w-5 mr-2 ${item.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  <div className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {task.relatedItemId && (
          <div>
            <h3 className="text-lg font-medium mb-2">Related Item</h3>
            <div>
              Type: {task.relatedItemType}<br />
              ID: {task.relatedItemId}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 pt-6">
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        
        {onDelete && (
          <Button variant="destructive" onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskDetail;

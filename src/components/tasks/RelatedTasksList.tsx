
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Calendar, Clock, Link, Plus } from 'lucide-react';
import { format } from 'date-fns';
import LinkTaskDialog from './LinkTaskDialog';

interface RelatedTasksListProps {
  relatedItemType: 'incident' | 'service-request' | 'problem';
  relatedItemId: string;
}

const RelatedTasksList: React.FC<RelatedTasksListProps> = ({
  relatedItemType,
  relatedItemId
}) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  useEffect(() => {
    const loadRelatedTasks = async () => {
      try {
        setLoading(true);
        // This would ideally filter by relatedItemId and relatedItemType in a real API
        const response = await fetchTasks();
        const relatedTasks = response.data.filter(task => 
          task.relatedItemId === relatedItemId && 
          task.relatedItemType === relatedItemType
        );
        setTasks(relatedTasks);
      } catch (error) {
        console.error('Error loading related tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRelatedTasks();
  }, [relatedItemId, relatedItemType]);

  const handleTaskCreated = (taskId: string) => {
    // Refresh the task list
    setTasks(prevTasks => [...prevTasks, {
      id: taskId,
      title: 'New Task', // This is a placeholder - in real world, you'd fetch the task details
      description: '',
      status: 'new',
      priority: 'medium',
      creator: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedItemId,
      relatedItemType
    }]);
  };
  
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
        {[1, 2].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Related Tasks</h3>
        <div className="flex gap-2">
          <Button 
            size="sm"
            variant="outline" 
            onClick={() => setIsLinkDialogOpen(true)}
          >
            <Link className="mr-2 h-4 w-4" />
            Link Task
          </Button>
          <Button 
            size="sm"
            onClick={() => navigate('/tasks/create', { 
              state: { 
                relatedItemType,
                relatedItemId
              } 
            })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <Card className="p-4 text-center">
          <p className="text-muted-foreground">No tasks are linked to this {relatedItemType.replace('-', ' ')} yet.</p>
          <Button 
            size="sm" 
            className="mt-2"
            onClick={() => navigate('/tasks/create', { 
              state: { 
                relatedItemType,
                relatedItemId
              } 
            })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create a Task
          </Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {tasks.map(task => (
            <Card 
              key={task.id} 
              className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1 mb-2">
                      {task.description}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="capitalize">
                  {task.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <Badge className={`
                  ${task.priority === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                  ${task.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                  ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  ${task.priority === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                `}>
                  {task.priority}
                </Badge>
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </div>
                )}
                {task.assignee && (
                  <div className="text-xs bg-muted px-2 py-0.5 rounded">
                    Assigned to: {task.assignee}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <LinkTaskDialog
        open={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        sourceType={relatedItemType}
        sourceId={relatedItemId}
        onTaskLinked={handleTaskCreated}
      />
    </div>
  );
};

export default RelatedTasksList;

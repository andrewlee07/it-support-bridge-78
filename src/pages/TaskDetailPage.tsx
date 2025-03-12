
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getUserNameById } from '@/utils/userUtils';
import { getTaskStatusVisuals, getTaskPriorityVisuals } from '@/utils/types/taskTypes';
import { format } from 'date-fns';
import TaskForm from '@/components/tasks/TaskForm';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';
import { AlertTriangle, Calendar, CheckSquare, Clock } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      try {
        if (id) {
          const response = await fetchTaskById(id);
          if (response.success && response.data) {
            setTask(response.data);
          } else {
            setError('Task not found');
          }
        } else {
          setError('Invalid task ID');
        }
      } catch (err) {
        console.error('Error loading task:', err);
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleTaskUpdated = (updatedTask: Task) => {
    setTask(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <TicketLoadingError
        returnPath="/tasks"
        entityName="Task"
      />
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <DetailBreadcrumb 
          entityName="Task"
          entityId={task.id}
          parentRoute="/tasks"
          parentName="Tasks"
        />
        <div className="mt-4">
          <TaskForm
            initialData={task}
            onTaskUpdated={handleTaskUpdated}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  const statusVisuals = getTaskStatusVisuals(task.status);
  const priorityVisuals = getTaskPriorityVisuals(task.priority);

  return (
    <PageTransition>
      <div className="container mx-auto p-4 max-w-5xl">
        <DetailBreadcrumb 
          entityName="Task"
          entityId={task.id}
          parentRoute="/tasks"
          parentName="Tasks"
        />
        
        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Task
            </Button>
            <Button onClick={() => navigate('/tasks')}>
              Back to Tasks
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{task.description}</p>
              </CardContent>
            </Card>

            {task.checklist && task.checklist.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <CheckSquare className="mr-2 h-5 w-5" />
                  <CardTitle>Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {task.checklist.map(item => (
                      <li key={item.id} className="flex items-start">
                        <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {item.completed ? '✓' : '○'}
                        </div>
                        <div className="flex-1">
                          <p className={item.completed ? 'line-through text-gray-500' : ''}>
                            {item.text}
                          </p>
                          {item.completedAt && (
                            <p className="text-xs text-gray-500">
                              Completed on {format(new Date(item.completedAt), 'MMM d, yyyy')}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {(task.dependsOn && task.dependsOn.length > 0) || (task.blockedBy && task.blockedBy.length > 0) ? (
              <Card>
                <CardHeader>
                  <CardTitle>Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  {task.dependsOn && task.dependsOn.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Depends On:</h4>
                      <div className="flex flex-wrap gap-2">
                        {task.dependsOn.map(depId => (
                          <Badge key={depId} variant="outline" className="cursor-pointer" onClick={() => navigate(`/tasks/${depId}`)}>
                            {depId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {task.blockedBy && task.blockedBy.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Blocked By:</h4>
                      <div className="flex flex-wrap gap-2">
                        {task.blockedBy.map(blockerId => (
                          <Badge key={blockerId} variant="outline" className="cursor-pointer" onClick={() => navigate(`/tasks/${blockerId}`)}>
                            {blockerId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge className={statusVisuals.badge}>{task.status}</Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Priority</p>
                  <Badge className={priorityVisuals.badge}>{task.priority}</Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assignee</p>
                  <p>{getUserNameById(task.assignee)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created By</p>
                  <p>{getUserNameById(task.creator)}</p>
                </div>
                
                {task.dueDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                      <p>{format(new Date(task.dueDate), 'PPP')}</p>
                    </div>
                  </div>
                )}

                {task.estimatedHours && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estimated Hours</p>
                      <p>{task.estimatedHours} hours</p>
                    </div>
                  </div>
                )}

                {task.relatedItemId && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Related {task.relatedItemType}</p>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate(`/${task.relatedItemType}s/${task.relatedItemId}`)}>
                      {task.relatedItemId}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p>{format(new Date(task.createdAt), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                  <p>{format(new Date(task.updatedAt), 'PPP')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TaskDetailPage;

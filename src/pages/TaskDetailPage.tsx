
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask, deleteTask } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import { getUserNameById } from '@/utils/userUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Edit, Trash2, AlertCircle, Clock, CalendarDays, CheckCircle2 } from 'lucide-react';
import { getTaskStatusVisuals, getTaskPriorityVisuals, isTaskOverdue } from '@/utils/types/taskTypes';
import PageTransition from '@/components/shared/PageTransition';

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!taskId) return;

      try {
        setLoading(true);
        const response = await fetchTaskById(taskId);
        
        if (response.success && response.data) {
          setTask(response.data);
        } else {
          setError('Task not found');
        }
      } catch (err) {
        console.error('Error loading task:', err);
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId]);

  const handleEditTask = () => {
    if (task) {
      navigate(`/tasks/edit/${task.id}`);
    }
  };

  const handleDeleteTask = async () => {
    if (!task) return;

    try {
      const response = await deleteTask(task.id);
      if (response.success) {
        toast.success('Task deleted successfully');
        navigate('/tasks');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('An error occurred while deleting the task');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[70vh]">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
        <p className="text-muted-foreground mb-4">{error || 'The task you are looking for does not exist.'}</p>
        <Button onClick={() => navigate('/tasks')}>Return to Tasks</Button>
      </div>
    );
  }

  const statusVisuals = getTaskStatusVisuals(task.status);
  const priorityVisuals = getTaskPriorityVisuals(task.priority);
  const isOverdue = isTaskOverdue(task);
  const assigneeName = getUserNameById(task.assignee);
  const creatorName = getUserNameById(task.creator);

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        {/* Task Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">{task.id}</span>
              <Badge className={priorityVisuals.badge}>
                {task.priority}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Overdue
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{task.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleEditTask}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTask}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Task Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{task.description}</p>
              </CardContent>
            </Card>

            {/* Checklist */}
            {task.checklist && task.checklist.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Checklist</CardTitle>
                  <CardDescription>
                    {task.checklist.filter(item => item.completed).length} of {task.checklist.length} completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {task.checklist.map(item => (
                      <li key={item.id} className="flex items-start gap-2">
                        <div className={`mt-1 h-4 w-4 rounded-full ${item.completed ? 'bg-green-500' : 'border border-gray-300'}`}>
                          {item.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                        <div>
                          <p className={`${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.text}
                          </p>
                          {item.completedAt && (
                            <p className="text-xs text-muted-foreground">
                              Completed {format(new Date(item.completedAt), 'MMM d, yyyy')}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`${statusVisuals.badge} w-full justify-center py-2 text-sm`}>
                  {task.status.replace('-', ' ')}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Assignee</p>
                  <p className="text-muted-foreground">{assigneeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Created By</p>
                  <p className="text-muted-foreground">{creatorName}</p>
                </div>
                {task.dueDate && (
                  <div>
                    <p className="text-sm font-medium mb-1">Due Date</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                )}
                {task.estimatedHours !== undefined && (
                  <div>
                    <p className="text-sm font-medium mb-1">Estimated Hours</p>
                    <p className="text-muted-foreground">{task.estimatedHours}</p>
                  </div>
                )}
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-1">Created</p>
                  <p className="text-muted-foreground">{format(new Date(task.createdAt), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Last Updated</p>
                  <p className="text-muted-foreground">{format(new Date(task.updatedAt), 'MMM d, yyyy')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Items */}
            {task.relatedItemId && task.relatedItemType && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {task.relatedItemType.replace('-', ' ')}
                    </Badge>
                    <span>{task.relatedItemId}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TaskDetailPage;

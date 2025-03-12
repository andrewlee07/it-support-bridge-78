import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { fetchTaskById, deleteTask } from '@/utils/api/taskApi'; // Changed from getTaskById to fetchTaskById
import { Task } from '@/utils/types/taskTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { getUserNameById } from '@/utils/userUtils';
import { toast } from 'sonner';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchTaskById(id); // Changed from getTaskById to fetchTaskById
        
        if (response.success) {
          setTask(response.data);
        } else {
          setError('Failed to load task details');
        }
      } catch (err) {
        console.error('Error loading task:', err);
        setError('An error occurred while loading the task');
      } finally {
        setLoading(false);
      }
    };
    
    loadTask();
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`);
  };
  
  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await deleteTask(id);
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
  
  const renderStatusBadge = (status: string) => {
    let color = 'bg-gray-200 text-gray-800';
    switch (status) {
      case 'new':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'in-progress':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'on-hold':
        color = 'bg-purple-100 text-purple-800';
        break;
      case 'completed':
        color = 'bg-green-100 text-green-800';
        break;
      case 'cancelled':
        color = 'bg-red-100 text-red-800';
        break;
    }
    
    return (
      <Badge variant="outline" className={`${color} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const renderPriorityBadge = (priority: string) => {
    let color = 'bg-gray-200 text-gray-800';
    switch (priority) {
      case 'critical':
        color = 'bg-red-100 text-red-800';
        break;
      case 'high':
        color = 'bg-orange-100 text-orange-800';
        break;
      case 'medium':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'low':
        color = 'bg-green-100 text-green-800';
        break;
    }
    
    return (
      <Badge variant="outline" className={`${color} border-0`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };
  
  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  if (error || !task) {
    return (
      <PageTransition>
        <div className="container mx-auto p-4">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {error || 'Task not found'}
            </AlertDescription>
          </Alert>
          
          <Button onClick={() => navigate('/tasks')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/tasks')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{task.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {renderStatusBadge(task.status)}
                    {renderPriorityBadge(task.priority)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">ID: {task.id}</div>
                  {task.dueDate && (
                    <div className="text-sm mt-1">
                      Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {task.description || 'No description provided.'}
                  </p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Details</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Assignee:</dt>
                        <dd className="font-medium">{task.assignee ? getUserNameById(task.assignee) : 'Unassigned'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Created:</dt>
                        <dd className="font-medium">{format(new Date(task.createdAt), 'MMM d, yyyy')}</dd>
                      </div>
                      {task.updatedAt && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Last updated:</dt>
                          <dd className="font-medium">{format(new Date(task.updatedAt), 'MMM d, yyyy')}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  
                  {task.checklist && task.checklist.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Checklist</h3>
                      <ul className="space-y-2">
                        {task.checklist.map((item) => (
                          <li key={item.id} className="flex items-center">
                            <span className={`mr-2 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.text}
                            </span>
                            {item.completed && <Badge>Completed</Badge>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default TaskDetailPage;

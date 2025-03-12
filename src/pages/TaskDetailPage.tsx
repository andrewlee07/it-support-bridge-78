import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { fetchTaskById } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import PageTransition from '@/components/shared/PageTransition';
import WatchButton from '@/components/shared/WatchButton';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetchTaskById(id);
        
        if (response.success && response.data) {
          setTask(response.data);
        } else {
          setError('Task not found');
        }
      } catch (err) {
        console.error('Error loading task:', err);
        setError('Failed to load task data');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800 mb-1">Error</h2>
          <p className="text-red-700">{error || 'Task not found'}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/tasks')}
          >
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  // Create watchable item for the task
  const watchableItem = task ? {
    id: task.id,
    type: 'task' as const,
    title: task.title,
    status: task.status,
    createdAt: new Date(task.createdAt),
    updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined
  } : null;

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            {watchableItem && <WatchButton item={watchableItem} variant="outline" size="sm" />}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/tasks')}>Back to Tasks</Button>
            <Button onClick={() => navigate(`/tasks/${id}/edit`)}>Edit Task</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Task description */}
            <div className="bg-card rounded-md border p-4">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground">
                {task.description || 'No description provided.'}
              </p>
            </div>

            {/* Task checklist */}
            <div className="bg-card rounded-md border p-4">
              <h2 className="text-lg font-medium mb-2">Checklist</h2>
              {task.checklist && task.checklist.length > 0 ? (
                <ul className="space-y-2">
                  {task.checklist.map(item => (
                    <li key={item.id} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={item.completed} 
                        readOnly 
                        className="h-4 w-4"
                      />
                      <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No checklist items.</p>
              )}
            </div>

            {/* Task attachments */}
            <div className="bg-card rounded-md border p-4">
              <h2 className="text-lg font-medium mb-2">Attachments</h2>
              {task.attachments && task.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {task.attachments.map(attachment => (
                    <li key={attachment.id} className="flex items-center gap-2">
                      <a 
                        href={attachment.url || attachment.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {attachment.name || attachment.fileName}
                      </a>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(attachment.size / 1024)} KB
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No attachments.</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Task details */}
            <div className="bg-card rounded-md border p-4">
              <h2 className="text-lg font-medium mb-2">Details</h2>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="font-medium capitalize">{task.status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Priority:</dt>
                  <dd className="font-medium capitalize">{task.priority}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Assignee:</dt>
                  <dd className="font-medium">{task.assignee || 'Unassigned'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Due Date:</dt>
                  <dd className="font-medium">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Created:</dt>
                  <dd className="font-medium">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </dd>
                </div>
                {task.estimatedHours && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estimated Hours:</dt>
                    <dd className="font-medium">{task.estimatedHours}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Related items */}
            {task.relatedItemId && (
              <div className="bg-card rounded-md border p-4">
                <h2 className="text-lg font-medium mb-2">Related To</h2>
                <div>
                  <span className="text-muted-foreground capitalize mr-2">
                    {task.relatedItemType?.replace(/-/g, ' ')}:
                  </span>
                  <a 
                    href={`/${task.relatedItemType}s/${task.relatedItemId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {task.relatedItemId}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TaskDetailPage;

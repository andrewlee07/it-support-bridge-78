import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import PageTransition from '@/components/shared/PageTransition';
import TaskDetail from '@/components/tasks/TaskDetail';
import { toast } from 'sonner';

const TaskDetailPage = () => {
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
        setError('Failed to load task details');
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
    // Implementation for delete functionality
    toast.success('Task deleted');
    navigate('/tasks');
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
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-medium text-red-800 mb-1">Error</h2>
          <p className="text-red-700">{error || 'Task not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <TaskDetail 
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </PageTransition>
  );
};

export default TaskDetailPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import TaskForm from '@/components/tasks/TaskForm';
import { toast } from 'sonner';

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (taskId: string) => {
    toast.success('Task created successfully');
    navigate(`/tasks/${taskId}`);
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
        <TaskForm 
          onSuccess={handleSuccess}
          onCancel={() => navigate('/tasks')}
        />
      </div>
    </PageTransition>
  );
};

export default CreateTaskPage;

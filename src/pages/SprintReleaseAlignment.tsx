
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import SprintReleaseAlignmentView from '@/components/tasks/SprintReleaseAlignmentView';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';

const SprintReleaseAlignment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const tasksResponse = await fetchTasks();
        setTasks(tasksResponse.data || []);
      } catch (error) {
        console.error('Error loading tasks:', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  const handleMoveTask = (taskId: string, sprintId: string) => {
    // In a real application, this would call an API to update the task's sprint assignment
    toast.success(`Task moved to ${sprintId}`);
    
    // For demo purposes, we'll just show a success message
    // In a real app, you would update the task with the new sprint ID
    console.log(`Moving task ${taskId} to sprint ${sprintId}`);
  };

  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sprint-Release Alignment</h1>
            <p className="text-muted-foreground">Manage tasks across sprints and releases</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/tasks')}>
              <Calendar className="mr-2 h-4 w-4" />
              Task Board
            </Button>
            <Button onClick={() => navigate('/tasks/new')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"></div>
              </div>
            ) : (
              <SprintReleaseAlignmentView 
                tasks={tasks}
                onMoveTask={handleMoveTask}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default SprintReleaseAlignment;

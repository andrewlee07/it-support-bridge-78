
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash, FileBox } from 'lucide-react';
import { Task } from '@/utils/types/taskTypes';
import { createTask } from '@/utils/api/taskApi';
import LinkTaskDialog from './LinkTaskDialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface RelatedTasksListProps {
  relatedItemId: string;
  relatedItemType: 'incident' | 'service-request' | 'task';
  onTaskClick?: (taskId: string) => void;
}

const RelatedTasksList: React.FC<RelatedTasksListProps> = ({
  relatedItemId,
  relatedItemType,
  onTaskClick
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, we would fetch related tasks based on relatedItemId and relatedItemType
    // For now, we'll just simulate a loading state
    const timer = setTimeout(() => {
      setTasks([]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [relatedItemId, relatedItemType]);

  const handleQuickCreateTask = async () => {
    if (!user) return;
    
    try {
      const response = await createTask({
        title: `Task related to ${relatedItemType} #${relatedItemId}`,
        description: `This task was automatically created from ${relatedItemType} #${relatedItemId}`,
        status: 'new',
        priority: 'medium',
        creator: user.id,
        relatedItemId,
        relatedItemType,
      });
      
      if (response.success) {
        setTasks(prevTasks => [...prevTasks, response.data]);
        toast.success('Task created successfully');
      }
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleTaskLink = (selectedTasks: Task[]) => {
    setTasks(prevTasks => [...prevTasks, ...selectedTasks]);
    setIsLinkDialogOpen(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Related Tasks</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsLinkDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Link Task
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleQuickCreateTask}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <FileBox className="h-10 w-10 mb-2 opacity-20" />
            <p>No related tasks found</p>
            <p className="text-sm">Create or link tasks to track work related to this item</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li 
                key={task.id}
                className="p-3 border rounded-md flex justify-between items-center hover:bg-accent cursor-pointer"
                onClick={() => onTaskClick && onTaskClick(task.id)}
              >
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>ID: {task.id}</span>
                    <span>•</span>
                    <span className="capitalize">Status: {task.status}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, we would have an API to remove the relationship
                    setTasks(tasks.filter(t => t.id !== task.id));
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      
      <LinkTaskDialog 
        open={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        onTasksSelected={handleTaskLink}
      />
    </Card>
  );
};

export default RelatedTasksList;

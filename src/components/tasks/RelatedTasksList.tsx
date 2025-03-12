
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Empty, Link, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/utils/types/taskTypes';
import { LinkTaskDialog } from './LinkTaskDialog';
import { useAuth } from '@/contexts/AuthContext';
import { createTask } from '@/utils/api/taskApi';
import { v4 as uuidv4 } from 'uuid';

interface RelatedTasksListProps {
  tasks: Task[];
  itemId?: string;
  itemType?: 'incident' | 'service-request' | 'task';
  onTaskAdded?: (task: Task) => void;
  title?: string;
}

export const RelatedTasksList: React.FC<RelatedTasksListProps> = ({
  tasks,
  itemId,
  itemType,
  onTaskAdded,
  title = 'Related Tasks'
}) => {
  const { user } = useAuth();
  const [relatedTasks, setRelatedTasks] = useState<Task[]>(tasks || []);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  useEffect(() => {
    setRelatedTasks(tasks || []);
  }, [tasks]);

  const handleAddTask = async () => {
    if (!itemId || !itemType || !user) return;

    // Create a new task with this item as the related item
    try {
      const now = new Date().toISOString(); // Convert to string to match Task interface
      const result = await createTask({
        title: `New task for ${itemType} ${itemId}`,
        description: `Task created from ${itemType} ${itemId}`,
        status: 'new',
        priority: 'medium',
        creator: user.id,
        createdAt: now, // Send as string
        updatedAt: now, // Send as string
        relatedItemId: itemId,
        relatedItemType: itemType
      });

      if (result.success) {
        // Use type assertion to ensure the new task conforms to Task type
        setRelatedTasks(prevTasks => [...prevTasks, result.data as Task]);
        
        if (onTaskAdded) {
          onTaskAdded(result.data);
        }
      }
    } catch (error) {
      console.error('Error creating related task:', error);
    }
  };

  const handleLinkTask = (selectedTask: Task) => {
    setRelatedTasks(prev => [...prev, selectedTask]);
    if (onTaskAdded) {
      onTaskAdded(selectedTask);
    }
    setIsLinkDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsLinkDialogOpen(true)}
          >
            <Link className="h-4 w-4 mr-2" />
            Link Existing
          </Button>
          <Button 
            size="sm" 
            variant="default" 
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {relatedTasks.length > 0 ? (
          <div className="space-y-2">
            {relatedTasks.map((task) => (
              <div 
                key={task.id} 
                className="p-3 border rounded-md flex items-center justify-between hover:bg-accent/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="capitalize">{task.status}</span>
                    <span>•</span>
                    <span className="capitalize">{task.priority}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                >
                  <a href={`/tasks/${task.id}`}>View</a>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <Empty className="h-12 w-12 mb-2 text-muted-foreground/50" />
            <h3 className="font-medium">No related tasks</h3>
            <p className="text-sm mt-1">Create or link tasks to this {itemType}</p>
          </div>
        )}
      </CardContent>
      
      <LinkTaskDialog 
        open={isLinkDialogOpen} 
        onOpenChange={setIsLinkDialogOpen}
        onTaskSelect={handleLinkTask}
        excludeTaskIds={relatedTasks.map(t => t.id)}
      />
    </Card>
  );
};

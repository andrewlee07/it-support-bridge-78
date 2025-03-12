
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Task } from '@/utils/types/taskTypes';
import { fetchTasks } from '@/utils/api/taskApi';

interface LinkTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTasksSelected: (tasks: Task[]) => void;
}

const LinkTaskDialog: React.FC<LinkTaskDialogProps> = ({
  open,
  onOpenChange,
  onTasksSelected
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  
  useEffect(() => {
    const loadTasks = async () => {
      if (!open) return;
      
      setLoading(true);
      try {
        const response = await fetchTasks(
          undefined,
          undefined,
          undefined,
          searchQuery.trim() || undefined
        );
        
        if (response.success) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [open, searchQuery]);

  const handleToggleTask = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleLinkTasks = () => {
    const selectedTasks = tasks.filter(task => selectedTaskIds.includes(task.id));
    onTasksSelected(selectedTasks);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Link Existing Tasks</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-[300px] border rounded-md">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-muted-foreground">No tasks found</p>
            </div>
          ) : (
            <ul className="divide-y">
              {tasks.map(task => (
                <li key={task.id} className="p-3 hover:bg-accent flex items-start gap-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={selectedTaskIds.includes(task.id)}
                    onCheckedChange={() => handleToggleTask(task.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`task-${task.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {task.title}
                    </label>
                    <div className="text-sm text-muted-foreground mt-1 flex gap-2 flex-wrap">
                      <span>{task.id}</span>
                      <Badge 
                        variant="outline" 
                        className="text-xs capitalize"
                      >
                        {task.status}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs capitalize"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <div className="flex justify-between w-full items-center">
            <span className="text-sm text-muted-foreground">
              {selectedTaskIds.length} task(s) selected
            </span>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                disabled={selectedTaskIds.length === 0} 
                onClick={handleLinkTasks}
              >
                Link Tasks
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTaskDialog;

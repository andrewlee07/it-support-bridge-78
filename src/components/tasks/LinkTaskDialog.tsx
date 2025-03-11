
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Task } from '@/utils/types/taskTypes';
import { fetchTasks } from '@/utils/api/taskApi';
import { toast } from 'sonner';
import { Search, Link, ExternalLink, Plus } from 'lucide-react';

interface LinkTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceType: 'incident' | 'service-request' | 'problem';
  sourceId: string;
  onTaskLinked?: (taskId: string) => void;
}

const LinkTaskDialog: React.FC<LinkTaskDialogProps> = ({
  open,
  onOpenChange,
  sourceType,
  sourceId,
  onTaskLinked
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [linkOption, setLinkOption] = useState<'existing' | 'new'>('existing');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await fetchTasks(
        undefined,
        undefined,
        undefined,
        searchQuery
      );
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error searching tasks:', error);
      toast.error('Failed to search tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkTask = () => {
    if (!selectedTaskId) {
      toast.error('Please select a task to link');
      return;
    }
    
    // Here you would call your API to link the task
    toast.success('Task linked successfully');
    onTaskLinked?.(selectedTaskId);
    onOpenChange(false);
  };

  const handleCreateNewTask = () => {
    // Close this dialog
    onOpenChange(false);
    
    // Navigate to task creation with pre-filled data
    navigate('/tasks/create', { 
      state: { 
        relatedItemType: sourceType,
        relatedItemId: sourceId
      } 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link Task</DialogTitle>
          <DialogDescription>
            Link an existing task or create a new one related to this {sourceType.replace('-', ' ')}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 my-2">
          <Button
            variant={linkOption === 'existing' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLinkOption('existing')}
            className="flex-1"
          >
            <Link className="mr-2 h-4 w-4" />
            Link Existing
          </Button>
          <Button
            variant={linkOption === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLinkOption('new')}
            className="flex-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
        
        {linkOption === 'existing' ? (
          <>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                variant="secondary"
              >
                Search
              </Button>
            </div>
            
            <div className="max-h-72 overflow-y-auto my-2">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center text-muted-foreground p-4">
                  {searchQuery ? 'No tasks found. Try a different search.' : 'Search for tasks above.'}
                </div>
              ) : (
                <div className="space-y-2">
                  <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a task" />
                    </SelectTrigger>
                    <SelectContent>
                      {tasks.map((task) => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedTaskId && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/tasks/${selectedTaskId}`)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Selected Task
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleLinkTask} disabled={!selectedTaskId}>
                Link Task
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-2">
            <p>
              Creating a new task will pre-fill the related item information.
              You'll be redirected to the task creation form.
            </p>
            
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleCreateNewTask}>
                Create New Task
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LinkTaskDialog;

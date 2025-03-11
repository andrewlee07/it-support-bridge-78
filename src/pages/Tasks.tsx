
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskTable from '@/components/tasks/TaskTable';
import TaskCalendarView from '@/components/tasks/TaskCalendarView';
import TaskForm from '@/components/tasks/TaskForm';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskViewToggle, { TaskViewMode } from '@/components/tasks/TaskViewToggle';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task, TaskStatus, TaskPriority, isTaskOverdue } from '@/utils/types/taskTypes';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [onlyOverdue, setOnlyOverdue] = useState<boolean>(false);
  const [onlyAssignedToMe, setOnlyAssignedToMe] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<TaskViewMode>('grid');
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState<boolean>(false);

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const statusFilters = statusFilter === 'all' ? undefined 
          : [statusFilter as TaskStatus];
        
        const priorityFilters = priorityFilter === 'all' ? undefined 
          : [priorityFilter as TaskPriority];
        
        const tasksResponse = await fetchTasks(
          onlyAssignedToMe ? user?.id : undefined,
          statusFilters,
          priorityFilters,
          searchQuery.trim() ? searchQuery : undefined
        );
        
        setTasks(tasksResponse.data || []);
      } catch (error) {
        console.error('Error loading tasks:', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, [searchQuery, statusFilter, priorityFilter, onlyAssignedToMe, user?.id]);

  // Apply client-side filters (overdue)
  useEffect(() => {
    let result = [...tasks];
    
    if (onlyOverdue) {
      result = result.filter(task => isTaskOverdue(task));
    }
    
    setFilteredTasks(result);
  }, [tasks, onlyOverdue]);

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleCreateTask = () => {
    setIsNewTaskDialogOpen(true);
  };

  const handleTaskCreated = (task: Task) => {
    setIsNewTaskDialogOpen(false);
    setTasks(prev => [task, ...prev]);
  };

  const handleViewChange = (newView: TaskViewMode) => {
    setViewMode(newView);
  };

  const renderTaskView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"></div>
        </div>
      );
    }
    
    if (filteredTasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h3 className="text-xl font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || onlyOverdue || onlyAssignedToMe
              ? "Try adjusting your filters"
              : "Get started by creating your first task"}
          </p>
          <Button onClick={handleCreateTask}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
      );
    }

    switch (viewMode) {
      case 'list':
        return <TaskTable tasks={filteredTasks} onTaskClick={handleTaskClick} />;
      case 'calendar':
        return <TaskCalendarView tasks={filteredTasks} onTaskClick={handleTaskClick} />;
      case 'grid':
      default:
        return <TaskGrid tasks={filteredTasks} onTaskClick={handleTaskClick} />;
    }
  };

  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage and track your tasks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/tasks/dashboard')}>
              Dashboard
            </Button>
            <Button onClick={handleCreateTask}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <TaskSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                onlyOverdue={onlyOverdue}
                onOverdueChange={setOnlyOverdue}
                onlyAssignedToMe={onlyAssignedToMe}
                onAssignedToMeChange={setOnlyAssignedToMe}
              />
              
              <div className="flex justify-end">
                <TaskViewToggle activeView={viewMode} onViewChange={handleViewChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {renderTaskView()}

        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm 
              onTaskCreated={handleTaskCreated}
              onCancel={() => setIsNewTaskDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Tasks;

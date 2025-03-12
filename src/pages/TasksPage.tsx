
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TaskTable from '@/components/tasks/TaskTable';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskCalendarView from '@/components/tasks/TaskCalendarView';
import TaskViewToggle from '@/components/tasks/TaskViewToggle';
import TaskSearch from '@/components/tasks/TaskSearch';
import TaskForm from '@/components/tasks/TaskForm';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';

type ViewType = 'table' | 'grid' | 'calendar';

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState<boolean>(false);
  const [view, setView] = useState<ViewType>('table');
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await fetchTasks(
          undefined, // assignee
          statusFilter.length > 0 ? statusFilter : undefined,
          priorityFilter.length > 0 ? priorityFilter : undefined,
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
  }, [searchQuery, statusFilter, priorityFilter]);

  const handleTaskCreated = (task: Task) => {
    setTasks(prev => [task, ...prev]);
    setIsNewTaskDialogOpen(false);
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleStatusFilterChange = (statuses: TaskStatus[]) => {
    setStatusFilter(statuses);
  };
  
  const handlePriorityFilterChange = (priorities: TaskPriority[]) => {
    setPriorityFilter(priorities);
  };

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  const renderTasksView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-64">
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter.length > 0 || priorityFilter.length > 0
              ? "No tasks match your current filters. Try adjusting your search criteria."
              : "You don't have any tasks yet. Create your first task to get started!"}
          </p>
          <Button onClick={() => setIsNewTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </div>
      );
    }

    switch (view) {
      case 'grid':
        return <TaskGrid tasks={tasks} onTaskClick={handleTaskClick} />;
      case 'calendar':
        return <TaskCalendarView tasks={tasks} onTaskClick={handleTaskClick} />;
      case 'table':
      default:
        return <TaskTable tasks={tasks} onTaskClick={handleTaskClick} />;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button onClick={() => setIsNewTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <TaskSearch 
            searchQuery={searchQuery} 
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={handlePriorityFilterChange}
          />
          
          <TaskViewToggle 
            currentView={view} 
            onViewChange={handleViewChange} 
          />
        </div>

        {renderTasksView()}

        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
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

export default TasksPage;

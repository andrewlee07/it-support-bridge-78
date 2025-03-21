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
import TaskViewToggle, { TaskViewType } from '@/components/tasks/TaskViewToggle';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task, TaskStatus, TaskPriority, isTaskOverdue } from '@/utils/types/taskTypes';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus[]>([]); 
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority[]>([]);
  const [onlyOverdue, setOnlyOverdue] = useState<boolean>(false);
  const [onlyAssignedToMe, setOnlyAssignedToMe] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<TaskViewType>('grid');
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState<boolean>(false);
  
  // Advanced filtering state
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [finishDateOption, setFinishDateOption] = useState<string>('any');
  const [customFinishDate, setCustomFinishDate] = useState<Date | undefined>(undefined);

  // Sample statistics for dashboard cards
  const totalTasks = 35;
  const activeTasks = 18;
  const overdueTasks = 7;
  const tasksDueToday = 4;

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        
        const tasksResponse = await fetchTasks(
          onlyAssignedToMe ? user?.id : undefined,
          statusFilter.length > 0 ? statusFilter : undefined,
          priorityFilter.length > 0 ? priorityFilter : undefined,
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

  // Apply client-side filters
  useEffect(() => {
    let result = [...tasks];
    
    // Apply overdue filter
    if (onlyOverdue) {
      result = result.filter(task => isTaskOverdue(task));
    }
    
    // Apply goals filter
    if (selectedGoals.length > 0) {
      // In a real app, tasks would have a goals field
      // This is a placeholder implementation
      result = result.filter(task => {
        // Mock - in reality you'd check if any of selectedGoals are in task.goals
        // For now, we'll just filter based on task.id to demonstrate
        return selectedGoals.some(goal => task.id.includes(goal.slice(-1)));
      });
    }
    
    // Apply finish date filter
    if (finishDateOption !== 'any') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      
      switch (finishDateOption) {
        case 'today':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < tomorrow;
          });
          break;
        case 'tomorrow':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const nextDay = new Date(tomorrow);
            nextDay.setDate(nextDay.getDate() + 1);
            return dueDate >= tomorrow && dueDate < nextDay;
          });
          break;
        case 'this-week':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < oneWeekLater;
          });
          break;
        case 'this-month':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < oneMonthLater;
          });
          break;
        case 'overdue':
          result = result.filter(task => isTaskOverdue(task));
          break;
        case 'no-date':
          result = result.filter(task => !task.dueDate);
          break;
        case 'custom':
          if (customFinishDate) {
            const nextDay = new Date(customFinishDate);
            nextDay.setDate(nextDay.getDate() + 1);
            result = result.filter(task => {
              if (!task.dueDate) return false;
              const dueDate = new Date(task.dueDate);
              return dueDate >= customFinishDate && dueDate < nextDay;
            });
          }
          break;
      }
    }
    
    setFilteredTasks(result);
  }, [tasks, onlyOverdue, selectedGoals, finishDateOption, customFinishDate]);

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

  const handleViewChange = (newView: TaskViewType) => {
    setViewMode(newView);
  };

  const handleStatusFilterChange = (statuses: TaskStatus[]) => {
    setStatusFilter(statuses);
  };
  
  const handlePriorityFilterChange = (priorities: TaskPriority[]) => {
    setPriorityFilter(priorities);
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(`Exporting tasks as ${type.toUpperCase()}`);
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
            {searchQuery || statusFilter.length > 0 || priorityFilter.length > 0 || onlyOverdue || onlyAssignedToMe
              || selectedGoals.length > 0 || finishDateOption !== 'any'
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
      case 'table':
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
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-secondary/50 border border-border/20 hover:bg-muted">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  Export to CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  Export to PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button onClick={handleCreateTask} className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <div className="text-4xl font-bold">{totalTasks}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                <div className="text-4xl font-bold">{activeTasks}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Overdue Tasks</p>
                <div className="text-4xl font-bold">{overdueTasks}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Due Today</p>
                <div className="text-4xl font-bold">{tasksDueToday}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and search */}
        <Card className="bg-secondary/50 border border-border/20">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <TaskSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={handlePriorityFilterChange}
                onlyOverdue={onlyOverdue}
                onOverdueChange={setOnlyOverdue}
                onlyAssignedToMe={onlyAssignedToMe}
                onAssignedToMeChange={setOnlyAssignedToMe}
                selectedGoals={selectedGoals}
                onGoalsChange={setSelectedGoals}
                finishDateOption={finishDateOption}
                onFinishDateOptionChange={setFinishDateOption}
                customFinishDate={customFinishDate}
                onCustomFinishDateChange={setCustomFinishDate}
              />
              
              <div className="flex justify-end">
                <TaskViewToggle
                  currentView={viewMode}
                  onViewChange={handleViewChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border border-border/20">
          <CardContent className="p-0">
            {renderTaskView()}
          </CardContent>
        </Card>

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

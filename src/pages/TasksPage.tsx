
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Columns, Grid3X3, List, PlusCircle, Search } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import TaskTable from '@/components/tasks/TaskTable';
import TaskGrid from '@/components/tasks/TaskGrid';
import TaskCalendarView from '@/components/tasks/TaskCalendarView';
import TaskViewToggle from '@/components/tasks/TaskViewToggle';
import TaskSearch from '@/components/tasks/TaskSearch';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';
import { useAuth } from '@/contexts/AuthContext';

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'table' | 'grid' | 'calendar'>('table');
  const [assigneeFilter, setAssigneeFilter] = useState<string | undefined>(undefined);
  const [statusFilters, setStatusFilters] = useState<TaskStatus[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<TaskPriority[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Check location state for initial filters
  useEffect(() => {
    const locationState = location.state as { filter?: string } | null;
    
    if (locationState?.filter === 'my-tasks' && user) {
      setAssigneeFilter(user.id);
    } else if (locationState?.filter === 'due-today') {
      // This will be handled by the tasks fetching logic
    } else if (locationState?.filter === 'today') {
      // This will be handled by the tasks fetching logic
    }
  }, [location, user]);
  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        
        const response = await fetchTasks(
          assigneeFilter,
          statusFilters.length > 0 ? statusFilters : undefined,
          priorityFilters.length > 0 ? priorityFilters : undefined,
          searchQuery || undefined
        );
        
        if (response.success) {
          setTasks(response.data);
          setFilteredTasks(response.data);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, [assigneeFilter, statusFilters, priorityFilters, searchQuery]);
  
  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };
  
  const handleCreateTask = () => {
    navigate('/tasks/create');
  };
  
  const handleFilterToggle = (type: 'status' | 'priority', value: TaskStatus | TaskPriority) => {
    if (type === 'status') {
      setStatusFilters(prev => 
        prev.includes(value as TaskStatus)
          ? prev.filter(s => s !== value)
          : [...prev, value as TaskStatus]
      );
    } else {
      setPriorityFilters(prev => 
        prev.includes(value as TaskPriority)
          ? prev.filter(p => p !== value)
          : [...prev, value as TaskPriority]
      );
    }
  };
  
  const clearFilters = () => {
    setAssigneeFilter(undefined);
    setStatusFilters([]);
    setPriorityFilters([]);
    setSearchQuery('');
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
          <TaskSearch 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
          />
          
          <div className="flex flex-wrap gap-2">
            <TaskViewToggle 
              view={view} 
              onChange={setView} 
            />
            
            <Select
              value={assigneeFilter || "all"}
              onValueChange={(value) => setAssigneeFilter(value === "all" ? undefined : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {user && <SelectItem value={user.id}>My Tasks</SelectItem>}
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge 
              variant={statusFilters.includes('new') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('status', 'new')}
            >
              New
            </Badge>
            <Badge 
              variant={statusFilters.includes('in-progress') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('status', 'in-progress')}
            >
              In Progress
            </Badge>
            <Badge 
              variant={statusFilters.includes('on-hold') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('status', 'on-hold')}
            >
              On Hold
            </Badge>
            <Badge 
              variant={statusFilters.includes('completed') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('status', 'completed')}
            >
              Completed
            </Badge>
            <Badge 
              variant={statusFilters.includes('cancelled') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('status', 'cancelled')}
            >
              Cancelled
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium">Priority:</span>
            <Badge 
              variant={priorityFilters.includes('critical') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('priority', 'critical')}
            >
              Critical
            </Badge>
            <Badge 
              variant={priorityFilters.includes('high') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('priority', 'high')}
            >
              High
            </Badge>
            <Badge 
              variant={priorityFilters.includes('medium') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('priority', 'medium')}
            >
              Medium
            </Badge>
            <Badge 
              variant={priorityFilters.includes('low') ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterToggle('priority', 'low')}
            >
              Low
            </Badge>
          </div>
          
          {(statusFilters.length > 0 || priorityFilters.length > 0 || assigneeFilter || searchQuery) && (
            <div className="mb-4">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border rounded-md p-6">
            <div className="bg-muted rounded-full p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              {searchQuery 
                ? `No tasks match the search query "${searchQuery}"`
                : 'No tasks match the selected filters'}
            </p>
            <Button onClick={handleCreateTask}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create a new task
            </Button>
          </div>
        ) : (
          <>
            {view === 'table' && (
              <TaskTable 
                tasks={filteredTasks} 
                onTaskClick={handleTaskClick} 
              />
            )}
            
            {view === 'grid' && (
              <TaskGrid 
                tasks={filteredTasks} 
                onTaskClick={handleTaskClick} 
              />
            )}
            
            {view === 'calendar' && (
              <TaskCalendarView 
                tasks={filteredTasks} 
                onTaskClick={handleTaskClick} 
              />
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default TasksPage;

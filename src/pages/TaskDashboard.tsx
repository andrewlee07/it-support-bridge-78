
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, ChevronRight, ClipboardList, CheckCircle2, Clock, AlertCircle, PauseCircle, Calendar, CalendarDays } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import TaskCard from '@/components/tasks/TaskCard';
import { useAuth } from '@/contexts/AuthContext';
import { fetchTasks, getTaskStats, getTasksDueToday } from '@/utils/api/taskApi';
import { Task, TaskStatus, TaskStats } from '@/utils/types/taskTypes';
import { toast } from 'sonner';

const TaskDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksDueToday, setTasksDueToday] = useState<Task[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get tasks assigned to the current user
        const tasksResponse = await fetchTasks(
          user.id, // Filter by current user
          ['new', 'in-progress', 'on-hold'], // Only active tasks
          undefined, // All priorities
          undefined, // No search query
        );
        
        // Get tasks due today
        const todayResponse = await getTasksDueToday(user.id);
        
        // Get task statistics
        const statsResponse = await getTaskStats(user.id);
        
        setTasks(tasksResponse.data || []);
        setTasksDueToday(todayResponse.data || []);
        setTaskStats(statsResponse.data || null);

        // Get all tasks for today section (regardless of due date)
        const today = new Date();
        const dayStart = new Date(today);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(today);
        dayEnd.setHours(23, 59, 59, 999);

        // Filter tasks created or updated today
        const todayTasksFiltered = tasksResponse.data?.filter(task => {
          const updatedAt = new Date(task.updatedAt);
          const createdAt = new Date(task.createdAt);
          return (updatedAt >= dayStart && updatedAt <= dayEnd) || 
                 (createdAt >= dayStart && createdAt <= dayEnd) ||
                 (todayResponse.data?.some(t => t.id === task.id));
        }) || [];

        setTodayTasks(sortTasksByPriorityAndDueDate(todayTasksFiltered));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, [user]);

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const renderStatusCard = (title: string, count: number, icon: React.ReactNode, color: string) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={color}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );

  const sortTasksByPriorityAndDueDate = (tasks: Task[]): Task[] => {
    // Define priority ranking
    const priorityRank = {
      'critical': 0,
      'high': 1,
      'medium': 2,
      'low': 3
    };
    
    // Sort tasks by priority, then by due date
    return [...tasks].sort((a, b) => {
      // First sort by priority
      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, sort by due date (if exists)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      // Items with due dates come before those without
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // If no due dates, sort by creation date
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  };

  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Dashboard</h1>
            <p className="text-muted-foreground">Overview of your assigned tasks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/tasks')}>
              View All Tasks
            </Button>
            <Button onClick={() => navigate('/tasks/create')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Task Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {taskStats && (
                <>
                  {renderStatusCard(
                    "New Tasks", 
                    taskStats.newTasks, 
                    <ClipboardList className="h-4 w-4" />, 
                    "text-blue-500"
                  )}
                  {renderStatusCard(
                    "In Progress", 
                    taskStats.inProgressTasks, 
                    <Clock className="h-4 w-4" />, 
                    "text-purple-500"
                  )}
                  {renderStatusCard(
                    "On Hold", 
                    taskStats.onHoldTasks, 
                    <PauseCircle className="h-4 w-4" />, 
                    "text-yellow-500"
                  )}
                  {renderStatusCard(
                    "Overdue", 
                    taskStats.overdueCount, 
                    <AlertCircle className="h-4 w-4" />, 
                    "text-red-500"
                  )}
                </>
              )}
            </div>

            {/* Today Section */}
            <Card className="mb-6 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle>Today</CardTitle>
                </div>
                <CardDescription>Tasks requiring attention today - updated, created, or due</CardDescription>
              </CardHeader>
              <CardContent>
                {todayTasks.length === 0 ? (
                  <p className="text-muted-foreground">No tasks for today</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {todayTasks.slice(0, 6).map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={() => handleTaskClick(task.id)} 
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              {todayTasks.length > 6 && (
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => navigate('/tasks', { state: { filter: 'today' } })}
                  >
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Due Today */}
            <Card className="mb-6 border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                  <CardTitle>Due Today</CardTitle>
                </div>
                <CardDescription>Tasks that need to be completed today</CardDescription>
              </CardHeader>
              <CardContent>
                {tasksDueToday.length === 0 ? (
                  <p className="text-muted-foreground">No tasks due today</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortTasksByPriorityAndDueDate(tasksDueToday).map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={() => handleTaskClick(task.id)} 
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              {tasksDueToday.length > 0 && (
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => navigate('/tasks', { state: { filter: 'due-today' } })}
                  >
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* My Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>My Assigned Tasks</CardTitle>
                <CardDescription>Tasks assigned to you by priority and due date</CardDescription>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <p className="text-muted-foreground">No assigned tasks</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortTasksByPriorityAndDueDate(tasks).slice(0, 6).map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={() => handleTaskClick(task.id)} 
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              {tasks.length > 6 && (
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => navigate('/tasks', { state: { filter: 'my-tasks' } })}
                  >
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default TaskDashboard;

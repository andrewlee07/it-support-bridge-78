
import React from 'react';
import { CalendarDays, AlertCircle, ChevronRight } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { useTaskDashboardData } from '@/components/tasks/hooks/useTaskDashboardData';
import DashboardHeader from '@/components/tasks/dashboard/DashboardHeader';
import TaskStatsGrid from '@/components/tasks/dashboard/TaskStatsGrid';
import TaskSectionCard from '@/components/tasks/dashboard/TaskSectionCard';
import DashboardLoader from '@/components/tasks/dashboard/DashboardLoader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import TaskCard from '@/components/tasks/TaskCard';

const TaskDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    tasks, 
    tasksDueToday, 
    taskStats, 
    loading, 
    todayTasks,
    sortTasksByPriorityAndDueDate 
  } = useTaskDashboardData();

  const handleTaskClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="container py-6">
          <DashboardHeader />
          <DashboardLoader />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container py-6">
        <DashboardHeader />
        
        {/* Task Stats */}
        <TaskStatsGrid taskStats={taskStats} />

        {/* Today Section */}
        <TaskSectionCard
          title="Today"
          description="Tasks requiring attention today - updated, created, or due"
          icon={<CalendarDays className="h-5 w-5 mr-2 text-blue-500" />}
          tasks={todayTasks}
          emptyMessage="No tasks for today"
          viewAllLink="/tasks"
          viewAllState={{ filter: 'today' }}
          borderColor="border-l-blue-500"
        />

        {/* Due Today */}
        <TaskSectionCard
          title="Due Today"
          description="Tasks that need to be completed today"
          icon={<AlertCircle className="h-5 w-5 mr-2 text-amber-500" />}
          tasks={sortTasksByPriorityAndDueDate(tasksDueToday)}
          emptyMessage="No tasks due today"
          viewAllLink="/tasks"
          viewAllState={{ filter: 'due-today' }}
          borderColor="border-l-amber-500"
        />

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
      </div>
    </PageTransition>
  );
};

export default TaskDashboard;

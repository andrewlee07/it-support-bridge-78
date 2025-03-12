
import { useState, useEffect } from 'react';
import { Task, TaskStats } from '@/utils/types/taskTypes';
import { fetchTasks, getTaskStats, getTasksDueToday } from '@/utils/api/taskApi';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useTaskDashboardData = () => {
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

  // Helper function to sort tasks by priority and due date
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

  return {
    tasks,
    tasksDueToday,
    taskStats,
    loading,
    todayTasks,
    sortTasksByPriorityAndDueDate
  };
};

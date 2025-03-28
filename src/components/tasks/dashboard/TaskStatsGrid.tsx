
import React from 'react';
import { ClipboardList, Clock, PauseCircle, AlertCircle } from 'lucide-react';
import { TaskStats } from '@/utils/types/taskTypes';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

interface TaskStatsGridProps {
  taskStats: TaskStats | null;
  cardFilters?: string[];
  toggleCardFilter?: (filter: string) => void;
}

const TaskStatsGrid: React.FC<TaskStatsGridProps> = ({ 
  taskStats, 
  cardFilters = [], 
  toggleCardFilter = () => {} 
}) => {
  if (!taskStats) return null;

  const cards = [
    {
      id: 'new',
      title: 'New Tasks',
      value: taskStats.newTasks,
      icon: ClipboardList,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      value: taskStats.inProgressTasks,
      icon: Clock,
      iconColor: 'text-purple-700 dark:text-purple-300',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      id: 'on-hold',
      title: 'On Hold',
      value: taskStats.onHoldTasks,
      icon: PauseCircle,
      iconColor: 'text-yellow-700 dark:text-yellow-300',
      iconBgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      id: 'overdue',
      title: 'Overdue',
      value: taskStats.overdueCount,
      icon: AlertCircle,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  return (
    <StatCardGrid 
      cards={cards} 
      activeCardIds={cardFilters} 
      onCardClick={toggleCardFilter} 
    />
  );
};

export default TaskStatsGrid;

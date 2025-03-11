
import React from 'react';
import Tasks from '@/pages/Tasks';
import TaskDashboard from '@/pages/TaskDashboard';

export const taskRoutes = [
  {
    path: '/tasks',
    element: React.createElement(Tasks)
  },
  {
    path: '/tasks/dashboard',
    element: React.createElement(TaskDashboard)
  }
];

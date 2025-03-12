
import React from 'react';
import Tasks from '@/pages/Tasks';
import TaskDashboard from '@/pages/TaskDashboard';
import TaskDetailPage from '@/pages/TaskDetailPage';
import TasksPage from '@/pages/TasksPage';
import CreateTaskPage from '@/pages/CreateTaskPage';
import EditTaskPage from '@/pages/EditTaskPage';

export const taskRoutes = [
  {
    path: '/tasks',
    element: React.createElement(TasksPage)
  },
  {
    path: '/tasks/dashboard',
    element: React.createElement(TaskDashboard)
  },
  {
    path: '/tasks/create',
    element: React.createElement(CreateTaskPage)
  },
  {
    path: '/tasks/:id',
    element: React.createElement(TaskDetailPage)
  },
  {
    path: '/tasks/:id/edit',
    element: React.createElement(EditTaskPage)
  }
];


import React from 'react';
import { RouteObject } from 'react-router-dom';
import UserManagement from '@/pages/UserManagement';
import Reports from '@/pages/Reports';
import Calendar from '@/pages/Calendar';
import ProblemManagement from '@/pages/ProblemManagement';

const otherRoutes: RouteObject[] = [
  {
    path: 'reports',
    element: <Reports />,
  },
  {
    path: 'calendar',
    element: <Calendar />,
  },
  {
    path: 'user-management',
    element: <UserManagement />,
  },
  {
    path: 'problems',
    element: <ProblemManagement />,
  },
];

export default otherRoutes;

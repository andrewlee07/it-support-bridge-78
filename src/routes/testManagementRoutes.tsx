
import React from 'react';
import { RouteObject } from 'react-router-dom';
import TestTracking from '@/pages/TestTracking';
import Bugs from '@/pages/Bugs';
import BugDetail from '@/pages/BugDetail';
import Backlog from '@/pages/Backlog';

const testManagementRoutes: RouteObject[] = [
  {
    path: 'test-tracking',
    element: <TestTracking />,
  },
  {
    path: 'bugs',
    element: <Bugs />,
  },
  {
    path: 'bugs/:id',
    element: <BugDetail />,
  },
  {
    path: 'backlog',
    element: <Backlog />,
  },
];

export default testManagementRoutes;

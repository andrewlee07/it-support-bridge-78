
import React from 'react';
import { RouteObject } from 'react-router-dom';
import TestTracking from '@/pages/TestTracking';
import TestExecution from '@/pages/TestExecution';
import Bugs from '@/pages/Bugs';
import BugDetail from '@/pages/BugDetail';

const testManagementRoutes: RouteObject[] = [
  {
    path: '/test-tracking',
    element: <TestTracking />,
  },
  {
    path: '/test-execution',
    element: <TestExecution />,
  },
  {
    path: '/bugs',
    element: <Bugs />,
  },
  {
    path: '/bugs/:id',
    element: <BugDetail />,
  },
];

export default testManagementRoutes;

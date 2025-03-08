
import React from 'react';
import { RouteObject } from 'react-router-dom';
import TestTracking from '@/pages/TestTracking';
import TestTraceability from '@/pages/TestTraceability';
import Bugs from '@/pages/Bugs';
import BugDetail from '@/pages/BugDetail';
import Backlog from '@/pages/Backlog';
import BacklogKanban from '@/pages/BacklogKanban';

const testManagementRoutes: RouteObject[] = [
  {
    path: 'test-tracking',
    element: <TestTracking />,
  },
  {
    path: 'test-traceability',
    element: <TestTraceability />,
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
  {
    path: 'backlog/kanban',
    element: <BacklogKanban />,
  },
];

export default testManagementRoutes;

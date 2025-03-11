
import React from 'react';
import TestTracking from '@/pages/TestTracking';
import Bugs from '@/pages/Bugs';
import BugDetail from '@/pages/BugDetail';

export const testBugRoutes = [
  {
    path: '/testing',
    element: React.createElement(TestTracking)
  },
  {
    path: '/bugs',
    element: React.createElement(Bugs)
  },
  {
    path: '/bugs/:id',
    element: React.createElement(BugDetail)
  }
];


import React from 'react';
import Problems from '@/pages/Problems';
import ProblemManagement from '@/pages/ProblemManagement';

export const problemRoutes = [
  {
    path: '/problems',
    element: React.createElement(Problems)
  },
  {
    path: '/problem-management',
    element: React.createElement(ProblemManagement)
  }
];

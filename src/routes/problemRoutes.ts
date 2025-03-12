
import React from 'react';
import Problems from '@/pages/Problems';
import ProblemManagement from '@/pages/ProblemManagement';
import ProblemDetail from '@/pages/ProblemDetail'; 

export const problemRoutes = [
  {
    path: '/problems',
    element: React.createElement(Problems)
  },
  {
    path: '/problem-management',
    element: React.createElement(ProblemManagement)
  },
  {
    path: '/problems/:id',
    element: React.createElement(ProblemDetail)
  }
];

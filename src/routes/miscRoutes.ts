
import React from 'react';
import Calendar from '@/pages/Calendar';
import Approvals from '@/pages/Approvals';
import Dashboard from '@/pages/Dashboard';

export const miscRoutes = [
  {
    path: '/',
    element: React.createElement(Dashboard)
  },
  {
    path: '/dashboard',
    element: React.createElement(Dashboard)
  },
  {
    path: '/calendar',
    element: React.createElement(Calendar)
  },
  {
    path: '/approvals',
    element: React.createElement(Approvals)
  },
  {
    path: '/security',
    element: React.createElement(() => React.createElement('div', null, 'Security Page'))
  }
];


import React from 'react';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';
import EndUserPortal from '@/pages/EndUserPortal';

export const miscRoutes = [
  {
    path: '/',
    element: React.createElement(Index)
  },
  {
    path: '/dashboard',
    element: React.createElement(Dashboard)
  },
  {
    path: '/error',
    element: React.createElement(ErrorPage)
  },
  {
    path: '*',
    element: React.createElement(NotFound)
  },
  {
    path: '/portal',
    element: React.createElement(EndUserPortal)
  }
];


import React from 'react';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';
import EndUserPortal from '@/pages/EndUserPortal';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
import Reports from '@/pages/Reports';
import Calendar from '@/pages/Calendar';
import BacklogReporting from '@/pages/BacklogReporting';

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
  },
  {
    path: '/announcements',
    element: React.createElement(AnnouncementsPage)
  },
  {
    path: '/reports',
    element: React.createElement(Reports)
  },
  {
    path: '/calendar',
    element: React.createElement(Calendar)
  },
  {
    path: '/backlog-reporting',
    element: React.createElement(BacklogReporting)
  }
];

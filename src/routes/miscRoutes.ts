
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

// Import pages
const Index = React.lazy(() => import('@/pages/Index'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Calendar = React.lazy(() => import('@/pages/Calendar'));
const Reports = React.lazy(() => import('@/pages/Reports'));
const UserProfile = React.lazy(() => import('@/pages/UserProfile'));
const UserSettings = React.lazy(() => import('@/pages/UserSettings'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const AnnouncementsPage = React.lazy(() => import('@/pages/AnnouncementsPage'));
const CreateAnnouncementPage = React.lazy(() => import('@/pages/CreateAnnouncementPage'));
const EditAnnouncementPage = React.lazy(() => import('@/pages/EditAnnouncementPage'));

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
    path: '/calendar',
    element: React.createElement(Calendar)
  },
  {
    path: '/reports',
    element: React.createElement(Reports)
  },
  {
    path: '/user/profile',
    element: React.createElement(UserProfile)
  },
  {
    path: '/user/settings',
    element: React.createElement(UserSettings)
  },
  {
    path: '/announcements',
    element: React.createElement(AnnouncementsPage)
  },
  {
    path: '/announcements/create',
    element: React.createElement(CreateAnnouncementPage)
  },
  {
    path: '/announcements/edit/:id',
    element: React.createElement(EditAnnouncementPage)
  },
  {
    path: '*',
    element: React.createElement(NotFound)
  }
];

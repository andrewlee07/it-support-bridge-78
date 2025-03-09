
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Login from '@/pages/Login';
import MFAVerification from '@/pages/MFAVerification';
import SecurityQuestionRecovery from '@/pages/SecurityQuestionRecovery';
import NotFound from '@/pages/NotFound';
import UserProfile from '@/pages/UserProfile';
import UserSettings from '@/pages/UserSettings';
import UserManagementPage from '@/pages/UserManagementPage';
import Reports from '@/pages/Reports';

export const otherRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/mfa-verification',
    element: <MFAVerification />,
  },
  {
    path: '/security-question-recovery',
    element: <SecurityQuestionRecovery />,
  },
  {
    path: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/settings',
    element: <UserSettings />,
  },
  {
    path: '/user-management',
    element: <UserManagementPage />,
  },
  {
    path: '/reports',
    element: <Reports />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

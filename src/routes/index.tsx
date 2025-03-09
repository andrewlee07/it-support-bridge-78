
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';

// Auth and public pages
import Login from '@/pages/Login';
import MFAVerification from '@/pages/MFAVerification';
import SecurityQuestionRecovery from '@/pages/SecurityQuestionRecovery';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Import route modules
import ticketRoutes from './ticketRoutes';
import adminRoutes from './adminRoutes';
import dashboardRoutes from './dashboardRoutes';
import testManagementRoutes from './testManagementRoutes';
import assetRoutes from './assetRoutes';
import changeRoutes from './changeRoutes';
import { otherRoutes } from './otherRoutes';

const routes: RouteObject[] = [
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
    path: '/',
    element: <Index />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      ...dashboardRoutes,
      ...ticketRoutes,
      ...changeRoutes,
      ...testManagementRoutes,
      ...assetRoutes,
      ...adminRoutes,
      ...otherRoutes,
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

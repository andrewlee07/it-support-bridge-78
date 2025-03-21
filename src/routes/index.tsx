
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';

// Import domain-specific routes with named imports
import { backlogRoutes } from './backlogRoutes';
import { ticketRoutes } from './ticketRoutes';
import { changeRoutes } from './changeRoutes';
import { adminRoutes } from './adminRoutes';
import { problemRoutes } from './problemRoutes';
import { userRoutes } from './userRoutes';
import { serviceAssetRoutes } from './serviceAssetRoutes';
import { testBugRoutes } from './testBugRoutes';
import { releaseRoutes } from './releaseRoutes';
import { taskRoutes } from './taskRoutes';
import { miscRoutes } from './miscRoutes';
import { securityRoutes } from './securityRoutes';

const router = createBrowserRouter([
  {
    path: '/login',
    element: React.createElement(Login)
  },
  {
    path: '/',
    element: React.createElement(ProtectedRoute, null, 
      React.createElement(MainLayout)
    ),
    errorElement: React.createElement(ErrorPage),
    children: [
      // Important: We need to handle absolute routes correctly here
      ...securityRoutes.map(route => ({
        ...route,
        // Remove leading slash if it exists to make it relative to parent
        path: route.path?.startsWith('/') ? route.path.substring(1) : route.path,
      })),
      // Add all other routes from domain-specific files
      ...miscRoutes,
      ...ticketRoutes,
      ...problemRoutes,
      ...changeRoutes,
      ...releaseRoutes,
      ...backlogRoutes,
      ...serviceAssetRoutes,
      ...testBugRoutes,
      ...userRoutes,
      ...adminRoutes,
      ...taskRoutes,
      // Catch-all route for pages that don't exist
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;

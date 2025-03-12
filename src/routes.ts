
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';
import EndUserPortal from '@/pages/EndUserPortal';
import KnowledgeArticleDetail from '@/pages/KnowledgeArticleDetail';
import Knowledge from '@/pages/Knowledge';
import TestTracking from '@/pages/TestTracking';
import PortalMyApprovals from '@/pages/PortalMyApprovals';
import Assets from '@/pages/Assets';

// Import domain-specific routes with named imports
import { backlogRoutes } from './routes/backlogRoutes';
import { ticketRoutes } from './routes/ticketRoutes';
import { changeRoutes } from './routes/changeRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { problemRoutes } from './routes/problemRoutes';
import { userRoutes } from './routes/userRoutes';
import { serviceAssetRoutes } from './routes/serviceAssetRoutes';
import { testBugRoutes } from './routes/testBugRoutes';
import { releaseRoutes } from './routes/releaseRoutes';
import { taskRoutes } from './routes/taskRoutes';
import { miscRoutes } from './routes/miscRoutes';

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
      // Test Management route
      {
        path: 'test-tracking',
        element: React.createElement(TestTracking)
      },
      // Knowledge route
      {
        path: 'knowledge',
        element: React.createElement(Knowledge)
      },
      // Knowledge article detail route
      {
        path: 'knowledge/:id',
        element: React.createElement(KnowledgeArticleDetail)
      },
      // Add all other existing routes
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
      // Asset routes
      {
        path: 'assets',
        element: React.createElement(Assets)
      },
      {
        path: 'assets/:id',
        element: React.createElement(Assets)
      }
    ]
  },
  // Add the End User Portal routes
  {
    path: '/portal',
    element: React.createElement(EndUserPortal)
  },
  {
    path: '/portal/my-approvals',
    element: React.createElement(PortalMyApprovals)
  },
  {
    path: '/portal/my-incidents',
    element: React.createElement(PortalMyApprovals) // Reusing same component for now
  },
  {
    path: '/portal/my-requests',
    element: React.createElement(PortalMyApprovals) // Reusing same component for now
  },
  {
    path: '/knowledge/:id',
    element: React.createElement(KnowledgeArticleDetail)
  },
  {
    path: '*',
    element: React.createElement(NotFound)
  }
]);

export default router;


import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';
import EndUserPortal from '@/pages/EndUserPortal';
import KnowledgeArticleDetail from '@/pages/KnowledgeArticleDetail';

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
      // Add all routes from domain-specific files
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
      ...taskRoutes
    ]
  },
  // Add the End User Portal routes
  {
    path: '/portal',
    element: React.createElement(EndUserPortal)
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

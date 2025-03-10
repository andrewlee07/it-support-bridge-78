import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Problems from '@/pages/Problems';
import Changes from '@/pages/Changes';
import ChangeDetail from '@/pages/ChangeDetail';
import NewChangeRequest from '@/pages/NewChangeRequest';
import EditChangeRequest from '@/pages/EditChangeRequest';
import RejectChange from '@/pages/RejectChange';
import CloseChange from '@/pages/CloseChange';
import Calendar from '@/pages/Calendar';
import Approvals from '@/pages/Approvals';

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
      {
        path: '/',
        element: React.createElement(Dashboard)
      },
      {
        path: '/dashboard',
        element: React.createElement(Dashboard)
      },
      {
        path: '/incidents',
        element: React.createElement(Incidents)
      },
      {
        path: '/service-requests',
        element: React.createElement(ServiceRequests)
      },
      {
        path: '/problems',
        element: React.createElement(Problems)
      },
      {
        path: '/changes',
        element: React.createElement(Changes)
      },
      {
        path: '/changes/:id',
        element: React.createElement(ChangeDetail)
      },
      {
        path: '/changes/new',
        element: React.createElement(NewChangeRequest)
      },
      {
        path: '/changes/:id/edit',
        element: React.createElement(EditChangeRequest)
      },
      {
        path: '/changes/:id/reject',
        element: React.createElement(RejectChange)
      },
      {
        path: '/changes/:id/close',
        element: React.createElement(CloseChange)
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
        path: '/bugs',
        element: React.createElement(() => <div>Bugs Page</div>)
      },
      {
        path: '/testing',
        element: React.createElement(() => <div>Testing Page</div>)
      },
      {
        path: '/users',
        element: React.createElement(() => <div>User Management Page</div>)
      },
      {
        path: '/admin',
        element: React.createElement(() => <div>Admin Settings Page</div>)
      },
      {
        path: '/profile',
        element: React.createElement(() => <div>User Profile Page</div>)
      },
      {
        path: '/security',
        element: React.createElement(() => <div>Security Page</div>)
      },
      {
        path: '/knowledge',
        element: React.createElement(() => <div>Knowledge Base Page</div>)
      },
      {
        path: '/services',
        element: React.createElement(() => <div>Services Page</div>)
      }
    ]
  }
]);

export default router;

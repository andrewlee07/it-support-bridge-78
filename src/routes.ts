
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
import UserManagementPage from '@/pages/UserManagementPage';
import ServiceCatalog from '@/pages/ServiceCatalog';
import TestTracking from '@/pages/TestTracking';
import Bugs from '@/pages/Bugs';
import ProblemManagement from '@/pages/ProblemManagement';
import Releases from '@/pages/Releases';
import Backlog from '@/pages/Backlog';
import AdminSettings from '@/pages/AdminSettings';
import IncidentDetail from '@/pages/IncidentDetail';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';
import BugDetail from '@/pages/BugDetail';

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
        path: '/incidents/:id',
        element: React.createElement(IncidentDetail)
      },
      {
        path: '/service-requests',
        element: React.createElement(ServiceRequests)
      },
      {
        path: '/service-requests/:id',
        element: React.createElement(ServiceRequestDetail)
      },
      {
        path: '/problems',
        element: React.createElement(ProblemManagement)
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
        path: '/services',
        element: React.createElement(ServiceCatalog)
      },
      {
        path: '/testing',
        element: React.createElement(TestTracking)
      },
      {
        path: '/bugs',
        element: React.createElement(Bugs)
      },
      {
        path: '/bugs/:id',
        element: React.createElement(BugDetail)
      },
      {
        path: '/users',
        element: React.createElement(() => React.createElement('div', null, 'User Management Page'))
      },
      {
        path: '/user-management',
        element: React.createElement(UserManagementPage)
      },
      {
        path: '/admin',
        element: React.createElement(AdminSettings)
      },
      {
        path: '/profile',
        element: React.createElement(() => React.createElement('div', null, 'User Profile Page'))
      },
      {
        path: '/security',
        element: React.createElement(() => React.createElement('div', null, 'Security Page'))
      },
      {
        path: '/knowledge',
        element: React.createElement(() => React.createElement('div', null, 'Knowledge Base Page'))
      },
      {
        path: '/releases',
        element: React.createElement(Releases)
      },
      {
        path: '/backlog',
        element: React.createElement(Backlog)
      }
    ]
  }
]);

export default router;

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
import BacklogKanban from '@/pages/BacklogKanban';
import BacklogList from '@/pages/BacklogList';
import BacklogTimeline from '@/pages/BacklogTimeline';
import BacklogCalendar from '@/pages/BacklogCalendar';
import BacklogReporting from '@/pages/BacklogReporting';
import AdminSettings from '@/pages/AdminSettings';
import IncidentDetail from '@/pages/IncidentDetail';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';
import BugDetail from '@/pages/BugDetail';
import ReleaseDetail from '@/pages/ReleaseDetail';
import Assets from '@/pages/Assets';
import Knowledge from '@/pages/Knowledge';
import SecuritySettings from '@/pages/admin/SecuritySettings';
import SLASettings from '@/pages/admin/SLASettings';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import ServiceCatalogueConfiguration from '@/pages/admin/ServiceCatalogueConfiguration';
import BugConfiguration from '@/pages/admin/BugConfiguration';
import ReleaseConfiguration from '@/pages/admin/ReleaseConfiguration';
import TestConfiguration from '@/pages/admin/TestConfiguration';
import StatusSynchronizationConfig from '@/pages/admin/StatusSynchronizationConfig';
import Tasks from '@/pages/Tasks';
import TaskDashboard from '@/pages/TaskDashboard';
import NotificationConfiguration from '@/pages/admin/NotificationConfiguration';

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
        element: React.createElement(UserManagementPage)
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
        path: '/admin/security-settings',
        element: React.createElement(SecuritySettings)
      },
      {
        path: '/admin/sla-settings',
        element: React.createElement(SLASettings)
      },
      {
        path: '/admin/incident-configuration',
        element: React.createElement(IncidentConfiguration)
      },
      {
        path: '/admin/service-request-configuration',
        element: React.createElement(ServiceRequestConfiguration)
      },
      {
        path: '/admin/change-configuration',
        element: React.createElement(ChangeConfiguration)
      },
      {
        path: '/admin/problem-configuration',
        element: React.createElement(ProblemConfiguration)
      },
      {
        path: '/admin/service-catalogue-configuration',
        element: React.createElement(ServiceCatalogueConfiguration)
      },
      {
        path: '/admin/bug-configuration',
        element: React.createElement(BugConfiguration)
      },
      {
        path: '/admin/release-configuration',
        element: React.createElement(ReleaseConfiguration)
      },
      {
        path: '/admin/test-configuration',
        element: React.createElement(TestConfiguration)
      },
      {
        path: '/admin/status-synchronization',
        element: React.createElement(StatusSynchronizationConfig)
      },
      {
        path: '/admin/notification-configuration',
        element: React.createElement(NotificationConfiguration)
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
        element: React.createElement(Knowledge)
      },
      {
        path: '/releases',
        element: React.createElement(Releases)
      },
      {
        path: '/releases/:id',
        element: React.createElement(ReleaseDetail)
      },
      {
        path: '/backlog',
        element: React.createElement(Backlog)
      },
      {
        path: '/backlog/kanban',
        element: React.createElement(BacklogKanban)
      },
      {
        path: '/backlog/list',
        element: React.createElement(BacklogList)
      },
      {
        path: '/backlog/timeline',
        element: React.createElement(BacklogTimeline)
      },
      {
        path: '/backlog/calendar',
        element: React.createElement(BacklogCalendar)
      },
      {
        path: '/backlog/reporting',
        element: React.createElement(BacklogReporting)
      },
      {
        path: '/assets',
        element: React.createElement(Assets)
      },
      // Task Management Routes
      {
        path: '/tasks',
        element: React.createElement(Tasks)
      },
      {
        path: '/tasks/dashboard',
        element: React.createElement(TaskDashboard)
      }
    ]
  }
]);

export default router;

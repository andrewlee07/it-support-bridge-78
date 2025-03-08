
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Main pages
import Dashboard from '@/pages/Dashboard';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import Changes from '@/pages/Changes';
import ProblemManagement from '@/pages/ProblemManagement';
import Assets from '@/pages/Assets';
import Reports from '@/pages/Reports';
import Calendar from '@/pages/Calendar';
import TestTracking from '@/pages/TestTracking';
import UserManagement from '@/pages/UserManagement';
import Login from '@/pages/Login';
import MFAVerification from '@/pages/MFAVerification';
import SecurityQuestionRecovery from '@/pages/SecurityQuestionRecovery';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import AdminSettings from '@/pages/AdminSettings';
import Bugs from '@/pages/Bugs';
import BugDetail from '@/pages/BugDetail';
import Backlog from '@/pages/Backlog';
import Releases from '@/pages/Releases';
import ReleaseDetail from '@/pages/ReleaseDetail';
import NewRelease from '@/pages/NewRelease';

// Admin configuration pages
import ErrorLogs from '@/pages/admin/ErrorLogs';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import SecurityAuditLog from '@/pages/SecurityAuditLog';
import SecuritySettings from '@/pages/admin/SecuritySettings';

// Detail pages for tickets and changes
import IncidentDetail from '@/pages/IncidentDetail';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';
import ChangeDetail from '@/pages/ChangeDetail';

// Layout
import MainLayout from '@/layouts/MainLayout';

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
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'incidents',
        element: <Incidents />,
      },
      {
        path: 'incidents/:id',
        element: <IncidentDetail />,
      },
      {
        path: 'service-requests',
        element: <ServiceRequests />,
      },
      {
        path: 'service-requests/:id',
        element: <ServiceRequestDetail />,
      },
      {
        path: 'changes',
        element: <Changes />,
      },
      {
        path: 'changes/:id',
        element: <ChangeDetail />,
      },
      {
        path: 'problems',
        element: <ProblemManagement />,
      },
      {
        path: 'assets',
        element: <Assets />,
      },
      {
        path: 'assets/:id',
        element: <Assets />,
      },
      {
        path: 'backlog',
        element: <Backlog />,
      },
      {
        path: 'releases',
        element: <Releases />,
      },
      {
        path: 'releases/new',
        element: <NewRelease />,
      },
      {
        path: 'releases/:id',
        element: <ReleaseDetail />,
      },
      {
        path: 'test-tracking',
        element: <TestTracking />,
      },
      {
        path: 'bugs',
        element: <Bugs />,
      },
      {
        path: 'bugs/:id',
        element: <BugDetail />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'admin-settings',
        element: <AdminSettings />,
      },
      {
        path: 'admin/error-logs',
        element: <ErrorLogs />,
      },
      {
        path: 'admin/incident-configuration',
        element: <IncidentConfiguration />,
      },
      {
        path: 'admin/service-request-configuration',
        element: <ServiceRequestConfiguration />,
      },
      {
        path: 'admin/change-configuration',
        element: <ChangeConfiguration />,
      },
      {
        path: 'admin/problem-configuration',
        element: <ProblemConfiguration />,
      },
      {
        path: 'admin/asset-configuration',
        element: <AssetConfiguration />,
      },
      {
        path: 'admin/sla-settings',
        element: <SLASettings />,
      },
      {
        path: 'admin/security-audit-log',
        element: <SecurityAuditLog />,
      },
      {
        path: 'admin/security-settings',
        element: <SecuritySettings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

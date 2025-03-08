
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

// Admin configuration pages
import ErrorLogs from '@/pages/admin/ErrorLogs';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import SecurityAuditLog from '@/pages/SecurityAuditLog';

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
    element: (
      <ProtectedRoute>
        <MainLayout>
          <></>
        </MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'incidents',
        element: <Incidents />,
      },
      {
        path: 'service-requests',
        element: <ServiceRequests />,
      },
      {
        path: 'changes',
        element: <Changes />,
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
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'tests',
        element: <TestTracking />,
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

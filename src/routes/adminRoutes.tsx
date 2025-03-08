
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboard from '@/pages/AdminDashboard';
import SecuritySettings from '@/pages/SecuritySettings';
import ErrorLogs from '@/pages/ErrorLogs';
import UserMFASettings from '@/pages/UserMFASettings';
import DropdownConfig from '@/pages/DropdownConfig';
import RiskAssessmentConfig from '@/pages/RiskAssessmentConfig';
import StatusSynchronizationSettings from '@/pages/StatusSynchronizationSettings';

const adminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'security',
    element: <SecuritySettings />,
  },
  {
    path: 'security/mfa',
    element: <UserMFASettings />,
  },
  {
    path: 'error-logs',
    element: <ErrorLogs />,
  },
  {
    path: 'dropdowns',
    element: <DropdownConfig />,
  },
  {
    path: 'risk-assessment',
    element: <RiskAssessmentConfig />,
  },
  {
    path: 'status-sync',
    element: <StatusSynchronizationSettings />
  }
];

export default adminRoutes;

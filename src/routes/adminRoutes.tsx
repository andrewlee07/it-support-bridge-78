
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import SecuritySettings from '@/pages/admin/SecuritySettings';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import UserMFASettings from '@/pages/admin/UserMFASettings';
import DropdownConfig from '@/pages/settings/DropdownConfigurations';
import RiskAssessmentConfig from '@/pages/settings/RiskAssessmentSettings';
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

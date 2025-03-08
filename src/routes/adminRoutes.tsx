
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminSettings from '@/pages/AdminSettings';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import SecurityAuditLog from '@/pages/SecurityAuditLog';
import SecuritySettings from '@/pages/admin/SecuritySettings';

const adminRoutes: RouteObject[] = [
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
];

export default adminRoutes;

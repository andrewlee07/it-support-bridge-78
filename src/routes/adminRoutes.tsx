
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminSettings from '@/pages/AdminSettings';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ServiceCatalogueConfiguration from '@/pages/admin/ServiceCatalogueConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import SecuritySettings from '@/pages/admin/SecuritySettings';
import ProcessConfiguration from '@/pages/admin/ProcessConfiguration';
import BugConfiguration from '@/pages/admin/BugConfiguration';
import ReleaseConfiguration from '@/pages/admin/ReleaseConfiguration';
import TestConfiguration from '@/pages/admin/TestConfiguration';
import StatusSynchronizationConfig from '@/pages/admin/StatusSynchronizationConfig';

const adminRoutes: RouteObject[] = [
  {
    path: '/admin-settings',
    element: <AdminSettings />,
  },
  {
    path: '/process-configuration',
    element: <ProcessConfiguration />,
  },
  {
    path: '/admin/error-logs',
    element: <ErrorLogs />,
  },
  {
    path: '/admin/incident-configuration',
    element: <IncidentConfiguration />,
  },
  {
    path: '/admin/service-request-configuration',
    element: <ServiceRequestConfiguration />,
  },
  {
    path: '/admin/service-catalogue-configuration',
    element: <ServiceCatalogueConfiguration />,
  },
  {
    path: '/admin/change-configuration',
    element: <ChangeConfiguration />,
  },
  {
    path: '/admin/problem-configuration',
    element: <ProblemConfiguration />,
  },
  {
    path: '/admin/asset-configuration',
    element: <AssetConfiguration />,
  },
  {
    path: '/admin/sla-settings',
    element: <SLASettings />,
  },
  {
    path: '/admin/security-settings',
    element: <SecuritySettings />,
  },
  {
    path: '/admin/bug-configuration',
    element: <BugConfiguration />,
  },
  {
    path: '/admin/release-configuration',
    element: <ReleaseConfiguration />,
  },
  {
    path: '/admin/test-configuration',
    element: <TestConfiguration />,
  },
  {
    path: '/admin/status-synchronization',
    element: <StatusSynchronizationConfig />,
  },
];

export default adminRoutes;

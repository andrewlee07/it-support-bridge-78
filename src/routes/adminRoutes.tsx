
import React from 'react';
import AdminSettings from '@/pages/AdminSettings';
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

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminSettings />,
  },
  {
    path: '/admin/security-settings',
    element: <SecuritySettings />,
  },
  {
    path: '/admin/sla-settings',
    element: <SLASettings />,
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
    path: '/admin/change-configuration',
    element: <ChangeConfiguration />,
  },
  {
    path: '/admin/problem-configuration',
    element: <ProblemConfiguration />,
  },
  {
    path: '/admin/service-catalogue-configuration',
    element: <ServiceCatalogueConfiguration />,
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


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
import NotificationConfiguration from '@/pages/admin/NotificationConfiguration';

export const adminRoutes = [
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
  }
];

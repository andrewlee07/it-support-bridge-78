
import React from 'react';
import AdminSettings from '@/pages/AdminSettings';
import AIConfiguration from '@/pages/admin/AIConfiguration';
import ProcessConfiguration from '@/pages/admin/ProcessConfiguration';
import IncidentConfiguration from '@/pages/admin/IncidentConfiguration';
import ServiceRequestConfiguration from '@/pages/admin/ServiceRequestConfiguration';
import ProblemConfiguration from '@/pages/admin/ProblemConfiguration';
import ChangeConfiguration from '@/pages/admin/ChangeConfiguration';
import ReleaseConfiguration from '@/pages/admin/ReleaseConfiguration';
import AssetConfiguration from '@/pages/admin/AssetConfiguration';
import ServiceCatalogueConfiguration from '@/pages/admin/ServiceCatalogueConfiguration';
import TestConfiguration from '@/pages/admin/TestConfiguration';
import SLASettings from '@/pages/admin/SLASettings';
import NotificationConfiguration from '@/pages/admin/NotificationConfiguration';
import ErrorLogs from '@/pages/admin/ErrorLogs';
import SecuritySettings from '@/pages/admin/SecuritySettings';
import StatusSynchronizationConfig from '@/pages/admin/StatusSynchronizationConfig';
import EventDocumentation from '@/pages/admin/EventDocumentation';

export const adminRoutes = [
  {
    path: 'admin',
    element: React.createElement(AdminSettings)
  },
  {
    path: 'admin/process-configuration',
    element: React.createElement(ProcessConfiguration)
  },
  {
    path: 'admin/incident-configuration',
    element: React.createElement(IncidentConfiguration)
  },
  {
    path: 'admin/service-request-configuration',
    element: React.createElement(ServiceRequestConfiguration)
  },
  {
    path: 'admin/problem-configuration',
    element: React.createElement(ProblemConfiguration)
  },
  {
    path: 'admin/change-configuration',
    element: React.createElement(ChangeConfiguration)
  },
  {
    path: 'admin/release-configuration',
    element: React.createElement(ReleaseConfiguration)
  },
  {
    path: 'admin/asset-configuration',
    element: React.createElement(AssetConfiguration)
  },
  {
    path: 'admin/service-catalog-configuration',
    element: React.createElement(ServiceCatalogueConfiguration)
  },
  {
    path: 'admin/test-configuration',
    element: React.createElement(TestConfiguration)
  },
  {
    path: 'admin/sla-settings',
    element: React.createElement(SLASettings)
  },
  {
    path: 'admin/notification-configuration',
    element: React.createElement(NotificationConfiguration)
  },
  {
    path: 'admin/error-logs',
    element: React.createElement(ErrorLogs)
  },
  {
    path: 'admin/security',
    element: React.createElement(SecuritySettings)
  },
  {
    path: 'admin/status-synchronization',
    element: React.createElement(StatusSynchronizationConfig)
  },
  {
    path: 'admin/event-documentation',
    element: React.createElement(EventDocumentation)
  },
  {
    path: 'admin/ai-configuration',
    element: React.createElement(AIConfiguration)
  }
];


import React from 'react';
import EndUserPortal from '@/pages/EndUserPortal';
import PortalMyApprovals from '@/pages/PortalMyApprovals';
import PortalIncidentForm from '@/pages/PortalIncidentForm';
import PortalServiceRequestForm from '@/pages/PortalServiceRequestForm';
import PortalIncidentDetail from '@/pages/portal/PortalIncidentDetail';
import PortalServiceRequestDetail from '@/pages/portal/PortalServiceRequestDetail';
import PortalKnowledgeArticle from '@/pages/portal/PortalKnowledgeArticle';
import PortalMyIncidents from '@/pages/portal/PortalMyIncidents';
import PortalMyRequests from '@/pages/portal/PortalMyRequests';

export const portalRoutes = [
  {
    path: '/portal',
    element: React.createElement(EndUserPortal)
  },
  {
    path: '/portal/my-approvals',
    element: React.createElement(PortalMyApprovals)
  },
  {
    path: '/portal/my-incidents',
    element: React.createElement(PortalMyIncidents)
  },
  {
    path: '/portal/my-requests',
    element: React.createElement(PortalMyRequests)
  },
  {
    path: '/portal/incident',
    element: React.createElement(PortalIncidentForm)
  },
  {
    path: '/portal/service-request',
    element: React.createElement(PortalServiceRequestForm)
  },
  {
    path: '/portal/incidents/:id',
    element: React.createElement(PortalIncidentDetail)
  },
  {
    path: '/portal/service-requests/:id',
    element: React.createElement(PortalServiceRequestDetail)
  },
  {
    path: '/portal/knowledge/:id',
    element: React.createElement(PortalKnowledgeArticle)
  }
];


import React from 'react';
import Incidents from '@/pages/Incidents';
import ServiceRequests from '@/pages/ServiceRequests';
import IncidentDetail from '@/pages/IncidentDetail';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';

export const ticketRoutes = [
  {
    path: '/incidents',
    element: React.createElement(Incidents)
  },
  {
    path: '/incidents/:id',
    element: React.createElement(IncidentDetail)
  },
  {
    path: '/service-requests',
    element: React.createElement(ServiceRequests)
  },
  {
    path: '/service-requests/:id',
    element: React.createElement(ServiceRequestDetail)
  }
];

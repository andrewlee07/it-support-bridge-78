
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Incidents from '@/pages/Incidents';
import IncidentDetail from '@/pages/IncidentDetail';
import ServiceRequests from '@/pages/ServiceRequests';
import ServiceRequestDetail from '@/pages/ServiceRequestDetail';
import ProblemManagement from '@/pages/ProblemManagement';
import ProblemDetail from '@/pages/ProblemDetail';

const ticketRoutes: RouteObject[] = [
  {
    path: 'incidents',
    element: <Incidents />,
  },
  {
    path: 'incidents/:id',
    element: <IncidentDetail />,
  },
  {
    path: 'service-requests',
    element: <ServiceRequests />,
  },
  {
    path: 'service-requests/:id',
    element: <ServiceRequestDetail />,
  },
  {
    path: 'problems',
    element: <ProblemManagement />,
  },
  {
    path: 'problems/:id',
    element: <ProblemDetail />,
  },
];

export default ticketRoutes;


import React from 'react';
import { RouteObject } from 'react-router-dom';
import IntegratedDashboard from '@/pages/IntegratedDashboard';

const dashboardRoutes: RouteObject[] = [
  {
    path: 'integrated-dashboard',
    element: <IntegratedDashboard />,
  },
];

export default dashboardRoutes;

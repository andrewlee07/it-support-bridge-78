
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Assets from '@/pages/Assets';

const assetRoutes: RouteObject[] = [
  {
    path: 'assets',
    element: <Assets />,
  },
  {
    path: 'assets/:id',
    element: <Assets />,
  },
];

export default assetRoutes;


import React from 'react';
import ServiceCatalog from '@/pages/ServiceCatalog';
import Assets from '@/pages/Assets';
import Knowledge from '@/pages/Knowledge';

export const serviceAssetRoutes = [
  {
    path: '/services',
    element: React.createElement(ServiceCatalog)
  },
  {
    path: '/assets',
    element: React.createElement(Assets)
  },
  {
    path: '/knowledge',
    element: React.createElement(Knowledge)
  }
];


import React from 'react';
import Releases from '@/pages/Releases';
import ReleaseDetail from '@/pages/ReleaseDetail';

export const releaseRoutes = [
  {
    path: '/releases',
    element: React.createElement(Releases)
  },
  {
    path: '/releases/:id',
    element: React.createElement(ReleaseDetail)
  }
];

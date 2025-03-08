
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Changes from '@/pages/Changes';
import ChangeDetail from '@/pages/ChangeDetail';
import Releases from '@/pages/Releases';
import ReleaseDetail from '@/pages/ReleaseDetail';
import NewRelease from '@/pages/NewRelease';

const changeRoutes: RouteObject[] = [
  {
    path: 'changes',
    element: <Changes />,
  },
  {
    path: 'changes/:id',
    element: <ChangeDetail />,
  },
  {
    path: 'releases',
    element: <Releases />,
  },
  {
    path: 'releases/new',
    element: <NewRelease />,
  },
  {
    path: 'releases/:id',
    element: <ReleaseDetail />,
  },
];

export default changeRoutes;

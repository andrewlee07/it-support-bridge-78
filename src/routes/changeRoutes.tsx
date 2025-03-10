
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Changes from '@/pages/Changes';
import ChangeDetail from '@/pages/ChangeDetail';
import Releases from '@/pages/Releases';
import ReleaseDetail from '@/pages/ReleaseDetail';
import NewRelease from '@/pages/NewRelease';
import EditChangeRequest from '@/pages/EditChangeRequest';

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
    path: 'changes/:id/edit',
    element: <EditChangeRequest />,
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

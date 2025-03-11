
import React from 'react';
import Changes from '@/pages/Changes';
import ChangeDetail from '@/pages/ChangeDetail';
import NewChangeRequest from '@/pages/NewChangeRequest';
import EditChangeRequest from '@/pages/EditChangeRequest';
import RejectChange from '@/pages/RejectChange';
import CloseChange from '@/pages/CloseChange';

export const changeRoutes = [
  {
    path: '/changes',
    element: React.createElement(Changes)
  },
  {
    path: '/changes/:id',
    element: React.createElement(ChangeDetail)
  },
  {
    path: '/changes/new',
    element: React.createElement(NewChangeRequest)
  },
  {
    path: '/changes/:id/edit',
    element: React.createElement(EditChangeRequest)
  },
  {
    path: '/changes/:id/reject',
    element: React.createElement(RejectChange)
  },
  {
    path: '/changes/:id/close',
    element: React.createElement(CloseChange)
  }
];

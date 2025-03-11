
import React from 'react';
import UserManagementPage from '@/pages/UserManagementPage';

export const userRoutes = [
  {
    path: '/users',
    element: React.createElement(UserManagementPage)
  },
  {
    path: '/user-management',
    element: React.createElement(UserManagementPage)
  },
  {
    path: '/profile',
    element: React.createElement(() => React.createElement('div', null, 'User Profile Page'))
  }
];

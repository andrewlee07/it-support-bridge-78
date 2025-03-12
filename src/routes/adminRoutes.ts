
import React from 'react';
import AIConfiguration from '@/pages/admin/AIConfiguration';

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: React.createElement('div', null, 'Dashboard')
  },
  {
    path: 'admin/users',
    element: React.createElement('div', null, 'Users')
  },
  {
    path: 'admin/configuration',
    element: React.createElement('div', null, 'Configuration')
  },
  {
    path: 'admin/security',
    element: React.createElement('div', null, 'Security')
  },
  {
    path: 'admin/ai-configuration',
    element: React.createElement(AIConfiguration)
  }
];

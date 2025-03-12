
import React from 'react';
import AIConfiguration from '@/pages/admin/AIConfiguration';

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: React.createElement(() => <div>Dashboard</div>)
  },
  {
    path: 'admin/users',
    element: React.createElement(() => <div>Users</div>)
  },
  {
    path: 'admin/configuration',
    element: React.createElement(() => <div>Configuration</div>)
  },
  {
    path: 'admin/security',
    element: React.createElement(() => <div>Security</div>)
  },
  {
    path: 'admin/ai-configuration',
    element: React.createElement(AIConfiguration)
  }
];

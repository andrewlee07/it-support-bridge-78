import React from 'react';
import { Dashboard } from '@/pages/admin/Dashboard';
import { Users } from '@/pages/admin/Users';
import { Configuration } from '@/pages/admin/Configuration';
import { Security } from '@/pages/admin/Security';
import AIConfiguration from '@/pages/admin/AIConfiguration';

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: React.createElement(Dashboard)
  },
  {
    path: 'admin/users',
    element: React.createElement(Users)
  },
  {
    path: 'admin/configuration',
    element: React.createElement(Configuration)
  },
  {
    path: 'admin/security',
    element: React.createElement(Security)
  },
  {
    path: 'admin/ai-configuration',
    element: React.createElement(AIConfiguration)
  }
];

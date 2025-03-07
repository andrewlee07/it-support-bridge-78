
import {
  LayoutDashboard,
  AlertCircle,
  HelpCircle,
  Users,
  Settings,
  Wrench,
  RefreshCw,
  Briefcase,
  BarChart2,
  FileText,
  ClipboardList
} from 'lucide-react';

import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    allowedRoles: ['admin', 'it', 'user']
  },
  {
    name: 'Incidents',
    path: '/incidents',
    icon: AlertCircle,
    allowedRoles: ['admin', 'it', 'user']
  },
  {
    name: 'Service Requests',
    path: '/service-requests',
    icon: FileText,
    allowedRoles: ['admin', 'it', 'user']
  },
  {
    name: 'Test Tracking',
    path: '/test-tracking',
    icon: ClipboardList,
    allowedRoles: ['admin', 'it', 'user']
  },
  {
    name: 'Changes',
    path: '/changes',
    icon: RefreshCw,
    allowedRoles: ['admin', 'it']
  },
  {
    name: 'Releases',
    path: '/releases',
    icon: Briefcase,
    allowedRoles: ['admin', 'it']
  },
  {
    name: 'Assets',
    path: '/assets',
    icon: Wrench,
    allowedRoles: ['admin', 'it']
  },
  {
    name: 'Users',
    path: '/users',
    icon: Users,
    allowedRoles: ['admin']
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: BarChart2,
    allowedRoles: ['admin', 'it']
  },
  {
    name: 'Help',
    path: '/help',
    icon: HelpCircle,
    allowedRoles: ['admin', 'it', 'user']
  }
];

export const settingsItems: NavItem[] = [
  {
    name: 'SLA Configuration',
    path: '/settings/sla',
    icon: Settings,
    allowedRoles: ['admin']
  },
  {
    name: 'Dropdown Fields',
    path: '/settings/dropdowns',
    icon: Settings,
    allowedRoles: ['admin']
  },
  {
    name: 'Risk Assessment',
    path: '/settings/risk-assessment',
    icon: Settings,
    allowedRoles: ['admin']
  }
];

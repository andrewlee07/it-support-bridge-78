
import {
  BarChart3,
  Gauge,
  ShieldAlert,
  MessageSquare,
  Clock,
  BoxIcon,
  AlertCircle,
  PanelRight,
  Users2,
  AlertOctagon,
  Headphones,
  FileSpreadsheet,
  CalendarDays,
  Flask,
  LayoutDashboard,
  Settings,
  BookText,
  Bug,
  ListChecks,
  GitPullRequest,
  Sliders,
  ArrowRightLeft,
  Link2,
  Library,
} from 'lucide-react';

import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Incidents',
    icon: AlertCircle,
    path: '/incidents',
  },
  {
    name: 'Service Requests',
    icon: Headphones,
    path: '/service-requests',
  },
  {
    name: 'Changes',
    icon: PanelRight,
    path: '/changes',
  },
  {
    name: 'Problems',
    icon: AlertOctagon,
    path: '/problems',
  },
  {
    name: 'Assets',
    icon: BoxIcon,
    path: '/assets',
  },
  {
    name: 'Service Catalog',
    icon: Library,
    path: '/service-catalog',
  },
  {
    name: 'Backlog',
    icon: ListChecks,
    path: '/backlog',
  },
  {
    name: 'Releases',
    icon: GitPullRequest,
    path: '/releases',
  },
  {
    name: 'Testing',
    icon: Flask,
    path: '/test-tracking',
  },
  {
    name: 'Test Traceability',
    icon: Link2,
    path: '/test-traceability',
  },
  {
    name: 'Bugs',
    icon: Bug,
    path: '/bugs',
  },
  {
    name: 'Reports',
    icon: FileSpreadsheet,
    path: '/reports',
  },
  {
    name: 'Calendar',
    icon: CalendarDays,
    path: '/calendar',
  },
  {
    name: 'User Management',
    icon: Users2,
    path: '/user-management',
  },
  {
    name: 'Admin Settings',
    icon: Settings,
    path: '/admin-settings',
    allowedRoles: ['admin'],
  },
];


import {
  BarChart3,
  Gauge,
  ShieldAlert,
  MessageSquare,
  Clock3,
  Package,
  AlertCircle,
  PanelRight,
  Users2,
  AlertOctagon,
  Headphones,
  FileSpreadsheet,
  CalendarDays,
  FlaskConical,
  LayoutDashboard,
  Settings2,
  BookText,
  Bug,
  ListChecks,
  GitPullRequest,
  Settings,
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
    name: 'Service Catalog',
    icon: Library,
    path: '/service-catalog',
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
    icon: Package,
    path: '/assets',
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
    icon: FlaskConical,
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
    icon: Settings2,
    path: '/admin-settings',
    allowedRoles: ['admin'],
  },
];

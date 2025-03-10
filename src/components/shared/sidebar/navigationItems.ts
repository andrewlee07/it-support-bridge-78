
import {
  LayoutDashboard,
  AlertCircle,
  Headphones,
  Package,
  GitPullRequest,
  ListChecks,
  Library,
  Bug,
  ClipboardList,
  CheckCircle
} from 'lucide-react';

import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
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
    icon: ClipboardList,
    path: '/changes',
  },
  {
    name: 'Assets',
    icon: Package,
    path: '/assets',
  },
  {
    name: 'Releases',
    icon: GitPullRequest,
    path: '/releases',
  },
  {
    name: 'Backlog',
    icon: ListChecks,
    path: '/backlog',
  },
  {
    name: 'Service Catalog',
    icon: Library,
    path: '/service-catalog',
  },
  {
    name: 'Bugs',
    icon: Bug,
    path: '/bugs',
  },
  {
    name: 'My Approvals',
    icon: CheckCircle,
    path: '/approvals',
  }
];

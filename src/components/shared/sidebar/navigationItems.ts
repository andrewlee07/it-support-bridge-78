
import { NavItem } from './types';
import {
  BarChart4,
  Boxes,
  Bug,
  Calendar,
  Clock,
  FileText,
  Gauge,
  GitBranch,
  GitPullRequest,
  LayoutDashboard,
  List,
  Relationship,
  Settings,
  TestTube,
  Ticket,
} from 'lucide-react';

export const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Integrated Dashboard',
    icon: Relationship,
    href: '/integrated-dashboard',
  },
  {
    title: 'Change Management',
    icon: GitPullRequest,
    href: '/changes',
  },
  {
    title: 'Release Management',
    icon: GitBranch,
    href: '/releases',
  },
  {
    title: 'Backlog',
    icon: List,
    href: '/backlog',
  },
  {
    title: 'Test Management',
    icon: TestTube,
    items: [
      {
        title: 'Test Tracking',
        icon: Bug,
        href: '/test-tracking',
      },
      {
        title: 'Coverage & Traceability',
        icon: Gauge,
        href: '/test-coverage',
      },
    ],
  },
  {
    title: 'Assets',
    icon: Boxes,
    href: '/assets',
  },
  {
    title: 'Admin',
    icon: Settings,
    items: [
      {
        title: 'Risk Assessment',
        href: '/admin/risk-assessment',
      },
      {
        title: 'Change Dropdowns',
        href: '/admin/change-dropdowns',
      },
      {
        title: 'SLA Configuration',
        href: '/admin/sla-configuration',
      },
      {
        title: 'Error Logs',
        href: '/admin/error-logs',
      },
      {
        title: 'Security Settings',
        href: '/admin/security-settings',
      },
      {
        title: 'Status Sync',
        href: '/admin/status-synchronization',
      },
    ],
  },
];

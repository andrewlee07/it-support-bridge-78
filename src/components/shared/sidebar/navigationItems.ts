
import {
  BarChart3,
  Gauge,
  ShieldAlert,
  MessageSquare,
  Clock3,
  BoxesIcon,
  AlertCircle,
  PanelRightIcon,
  Users2,
  OctagonAlert,
  Headphones,
  FileSpreadsheet,
  CalendarDays,
  FlaskConical,
  LayoutDashboard,
  Settings2,
  BookText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Incidents',
    icon: AlertCircle,
    href: '/incidents',
  },
  {
    title: 'Service Requests',
    icon: Headphones,
    href: '/service-requests',
  },
  {
    title: 'Changes',
    icon: PanelRightIcon,
    href: '/changes',
  },
  {
    title: 'Problems',
    icon: OctagonAlert,
    href: '/problems',
  },
  {
    title: 'Assets',
    icon: BoxesIcon,
    href: '/assets',
  },
  {
    title: 'Reports',
    icon: FileSpreadsheet,
    href: '/reports',
  },
  {
    title: 'Calendar',
    icon: CalendarDays,
    href: '/calendar',
  },
  {
    title: 'Testing',
    icon: FlaskConical,
    href: '/tests',
  },
  {
    title: 'User Management',
    icon: Users2,
    href: '/user-management',
  },
  {
    title: 'Admin Settings',
    icon: Settings2,
    href: '/admin-settings',
  },
];

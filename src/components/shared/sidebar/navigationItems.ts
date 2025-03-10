
import {
  LayoutDashboard,
  AlarmClock,
  HelpCircle,
  Calendar,
  Blocks,
  NotebookTabs,
  RefreshCw,
  Package,
  ShieldCheck,
  Settings,
  Network,
  Database,
  FileText,
  CheckSquare,
} from 'lucide-react';
import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Incidents',
    href: '/incidents',
    icon: AlarmClock,
  },
  {
    title: 'Service Requests',
    href: '/service-requests',
    icon: HelpCircle,
  },
  {
    title: 'Problems',
    href: '/problems',
    icon: Blocks,
  },
  {
    title: 'Changes',
    href: '/changes',
    icon: RefreshCw,
  },
  {
    title: 'Releases',
    href: '/releases',
    icon: Package,
  },
  {
    title: 'Backlog',
    href: '/backlog',
    icon: NotebookTabs,
  },
  {
    title: 'My Approvals',
    href: '/approvals',
    icon: CheckSquare,
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Assets',
    href: '/assets',
    icon: Database,
  },
  {
    title: 'Services',
    href: '/services',
    icon: Network,
  },
  {
    title: 'Knowledge',
    href: '/knowledge',
    icon: FileText,
  },
  {
    title: 'Security',
    href: '/security',
    icon: ShieldCheck,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

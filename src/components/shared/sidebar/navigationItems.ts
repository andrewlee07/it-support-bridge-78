
import { 
  LayoutDashboard, 
  AlertCircle, 
  FileText, 
  Users, 
  BarChart4, 
  ClipboardList, 
  Settings, 
  Monitor, 
  HelpCircle,
  Shield,
  GaugeCircle,
  ListTodo,
  Package
} from 'lucide-react';
import { NavItem } from './types';

// Main navigation items
export const navigationItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'it', 'user'] },
  { name: 'Incidents', path: '/incidents', icon: AlertCircle, allowedRoles: ['admin', 'it', 'user'] },
  { name: 'Service Requests', path: '/service-requests', icon: FileText, allowedRoles: ['admin', 'it', 'user'] },
  { name: 'Change Management', path: '/changes', icon: ClipboardList, allowedRoles: ['admin', 'it'] },
  { name: 'Release Management', path: '/releases', icon: Package, allowedRoles: ['admin', 'it'] },
  { name: 'Asset Management', path: '/assets', icon: Monitor, allowedRoles: ['admin', 'it'] },
  { name: 'Users', path: '/users', icon: Users, allowedRoles: ['admin'] },
  { name: 'Reports', path: '/reports', icon: BarChart4, allowedRoles: ['admin', 'it'] },
];

// Settings submenu items
export const settingsItems: NavItem[] = [
  { name: 'SLA Configuration', path: '/settings/sla', icon: GaugeCircle, allowedRoles: ['admin'] },
  { name: 'Dropdown Fields', path: '/settings/dropdowns', icon: ListTodo, allowedRoles: ['admin'] },
  { name: 'Risk Assessment', path: '/settings/risk-assessment', icon: Shield, allowedRoles: ['admin'] },
];

// Bottom navigation items
export const bottomNavigationItems: NavItem[] = [
  { name: 'Help & Support', path: '/help', icon: HelpCircle, allowedRoles: ['admin', 'it', 'user'] },
];

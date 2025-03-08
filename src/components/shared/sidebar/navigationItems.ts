import {
  HomeIcon,
  AlertCircleIcon,
  MessageSquareIcon,
  PanelRightIcon,
  UserIcon,
  SettingsIcon,
  BarChart2Icon,
  BoxIcon,
  FileTextIcon,
  PackageIcon,
  ClipboardListIcon,
  BugIcon,
  InboxIcon,
  OctagonAlertIcon,
  CalendarIcon,
  PlayIcon,
  AlertTriangleIcon,
  WrenchIcon,
  CogIcon,
  FolderCogIcon,
  ServerCogIcon,
  Settings2Icon,
} from "lucide-react";
import { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Incidents",
    path: "/incidents",
    href: "/incidents",
    icon: AlertCircleIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Service Requests",
    path: "/service-requests",
    href: "/service-requests",
    icon: MessageSquareIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Changes",
    path: "/changes",
    href: "/changes",
    icon: PanelRightIcon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Releases",
    path: "/releases",
    href: "/releases",
    icon: PackageIcon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Backlog",
    path: "/backlog",
    href: "/backlog",
    icon: InboxIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Assets",
    path: "/assets",
    href: "/assets",
    icon: BoxIcon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Test Cases",
    path: "/test-tracking",
    href: "/test-tracking",
    icon: FileTextIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Test Execution",
    path: "/test-execution",
    href: "/test-execution",
    icon: PlayIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Bugs",
    path: "/bugs",
    href: "/bugs",
    icon: BugIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Problem Management",
    path: "/problem-management",
    href: "/problem-management",
    icon: OctagonAlertIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Calendar",
    path: "/calendar",
    href: "/calendar",
    icon: CalendarIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Users",
    path: "/users",
    href: "/users",
    icon: UserIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Reports",
    path: "/reports",
    href: "/reports",
    icon: BarChart2Icon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Admin",
    path: "/admin",
    href: "/admin",
    icon: SettingsIcon,
    allowedRoles: ['admin']
  }
];

export const settingsItems = [
  {
    name: "System Configuration",
    path: "/admin/system-configuration",
    href: "/admin/system-configuration",
    icon: ServerCogIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Incident Configuration",
    path: "/admin/incident-configuration",
    href: "/admin/incident-configuration",
    icon: AlertCircleIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Service Request Configuration",
    path: "/admin/service-request-configuration",
    href: "/admin/service-request-configuration",
    icon: MessageSquareIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Change Configuration",
    path: "/admin/change-configuration",
    href: "/admin/change-configuration",
    icon: PanelRightIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Problem Configuration",
    path: "/admin/problem-configuration",
    href: "/admin/problem-configuration",
    icon: OctagonAlertIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Asset Configuration",
    path: "/admin/asset-configuration",
    href: "/admin/asset-configuration",
    icon: BoxIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Error Logs",
    path: "/admin/error-logs",
    href: "/admin/error-logs",
    icon: AlertTriangleIcon,
    allowedRoles: ['admin']
  },
];

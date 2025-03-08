
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
];

export const settingsItems = [
  {
    name: "SLA Settings",
    path: "/settings/sla",
    href: "/settings/sla",
    icon: SettingsIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Dropdown Configurations",
    path: "/settings/dropdown-configurations",
    href: "/settings/dropdown-configurations",
    icon: SettingsIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Risk Assessment",
    path: "/settings/risk-assessment",
    href: "/settings/risk-assessment",
    icon: BarChart2Icon,
    allowedRoles: ['admin']
  },
];


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
  BarChartIcon,
} from "lucide-react";
import { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    path: "/",
    href: "/",
    icon: HomeIcon,
    allowedRoles: ['admin', 'manager', 'user']
  },
  {
    name: "Incident Management",
    icon: AlertCircleIcon,
    collapsed: true,
    allowedRoles: ['admin', 'manager', 'user'],
    items: [
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
    ],
  },
  {
    name: "Change Management",
    path: "/changes",
    href: "/changes",
    icon: PanelRightIcon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Release Management",
    icon: PackageIcon,
    collapsed: true,
    allowedRoles: ['admin', 'manager'],
    items: [
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
        icon: ClipboardListIcon,
        allowedRoles: ['admin', 'manager', 'user']
      },
    ],
  },
  {
    name: "Asset Management",
    path: "/assets",
    href: "/assets",
    icon: BoxIcon,
    allowedRoles: ['admin', 'manager']
  },
  {
    name: "Test Management",
    icon: FileTextIcon,
    collapsed: true,
    allowedRoles: ['admin', 'manager', 'user'],
    items: [
      {
        name: "Test Tracking",
        path: "/test-tracking",
        href: "/test-tracking",
        icon: FileTextIcon,
        allowedRoles: ['admin', 'manager', 'user']
      },
      {
        name: "Test Execution",
        path: "/test-execution",
        href: "/test-execution",
        icon: ClipboardListIcon,
        allowedRoles: ['admin', 'manager', 'user']
      },
    ],
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
    icon: SettingsIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Dropdown Configurations",
    path: "/settings/dropdown-configurations",
    icon: SettingsIcon,
    allowedRoles: ['admin']
  },
  {
    name: "Risk Assessment",
    path: "/settings/risk-assessment",
    icon: BarChartIcon,
    allowedRoles: ['admin']
  },
];

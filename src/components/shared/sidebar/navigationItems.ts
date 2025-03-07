
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
  PackageOpenIcon,
} from "lucide-react";
import { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Incident Management",
    icon: AlertCircleIcon,
    collapsed: true,
    items: [
      {
        name: "Incidents",
        href: "/incidents",
        icon: AlertCircleIcon,
      },
      {
        name: "Service Requests",
        href: "/service-requests",
        icon: MessageSquareIcon,
      },
    ],
  },
  {
    name: "Change Management",
    href: "/changes",
    icon: PanelRightIcon,
  },
  {
    name: "Release Management",
    icon: PackageIcon,
    collapsed: true,
    items: [
      {
        name: "Releases",
        href: "/releases",
        icon: PackageIcon,
      },
      {
        name: "Backlog",
        href: "/backlog",
        icon: ClipboardListIcon,
      },
    ],
  },
  {
    name: "Asset Management",
    href: "/assets",
    icon: BoxIcon,
  },
  {
    name: "Test Management",
    icon: FileTextIcon,
    collapsed: true,
    items: [
      {
        name: "Test Tracking",
        href: "/test-tracking",
        icon: FileTextIcon,
      },
      {
        name: "Test Execution",
        href: "/test-execution",
        icon: ClipboardListIcon,
      },
    ],
  },
  {
    name: "Users",
    href: "/users",
    icon: UserIcon,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart2Icon,
  },
];

export const settingsNavigationItems: NavigationItem[] = [
  {
    name: "SLA Settings",
    href: "/settings/sla",
    icon: SettingsIcon,
  },
  {
    name: "Dropdown Configurations",
    href: "/settings/dropdown-configurations",
    icon: SettingsIcon,
  },
  {
    name: "Risk Assessment",
    href: "/settings/risk-assessment",
    icon: BarChartIcon,
  },
];

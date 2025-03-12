
import {
  AlertCircle,
  BarChart3,
  Bug,
  Calendar,
  ClipboardCheck,
  Cog,
  LayoutDashboard,
  List,
  PackageOpen,
  ScrollText,
  Server,
  FileStack,
  Users,
  Megaphone
} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: any;
  items?: NavigationItem[];
  description?: string;
};

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of the system"
  },
  {
    title: "Ticket Management",
    href: "#",
    icon: ScrollText,
    items: [
      {
        title: "Incidents",
        href: "/incidents",
        icon: AlertCircle,
        description: "Manage system incidents"
      },
      {
        title: "Service Requests",
        href: "/service-requests",
        icon: ClipboardCheck,
        description: "Manage service requests"
      }
    ]
  },
  {
    title: "Problem Management",
    href: "/problems",
    icon: Bug,
    description: "Manage system problems"
  },
  {
    title: "Change Management",
    href: "/changes",
    icon: PackageOpen,
    description: "Manage change requests"
  },
  {
    title: "Backlog Management",
    href: "/backlog",
    icon: List,
    description: "Manage work backlog"
  },
  {
    title: "Release Management",
    href: "/releases",
    icon: PackageOpen,
    description: "Manage system releases"
  },
  {
    title: "Task Management",
    href: "/tasks",
    icon: ClipboardCheck,
    description: "Manage tasks and assignments"
  },
  {
    title: "Asset Management",
    href: "/assets",
    icon: Server,
    description: "Manage system assets"
  },
  {
    title: "Test Management",
    href: "/test-tracking",
    icon: Bug,
    description: "Manage testing activities"
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: FileStack,
    description: "Access knowledge articles"
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
    description: "View scheduled events"
  },
  {
    title: "Announcements",
    href: "/announcements",
    icon: Megaphone,
    description: "Manage public announcements"
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    description: "View system reports"
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    description: "Manage system users"
  },
  {
    title: "Admin Settings",
    href: "/admin",
    icon: Cog,
    description: "Configure system settings"
  }
];


import { 
  LayoutDashboard, 
  GitPullRequest, 
  Package, 
  Inbox, 
  ListTodo, 
  Settings, 
  Bell, 
  FileCode, 
  TestTube, 
  AreaChart,
  Network
} from 'lucide-react';
import { NavItem } from './types';

export const navigationItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    allowedRoles: ["admin", "user", "it"]
  },
  {
    name: "Changes",
    path: "/changes",
    icon: GitPullRequest,
    allowedRoles: ["admin", "it"]
  },
  {
    name: "Releases",
    path: "/releases",
    icon: Package,
    allowedRoles: ["admin", "it"]
  },
  {
    name: "Backlog",
    path: "/backlog",
    icon: ListTodo,
    allowedRoles: ["admin", "it", "developer"]
  },
  {
    name: "Assets",
    path: "/assets",
    icon: Inbox,
    allowedRoles: ["admin", "it"]
  },
  {
    name: "Test Management",
    path: "/tests",
    icon: TestTube,
    allowedRoles: ["admin", "it", "qa"]
  },
  {
    name: "Test Coverage",
    path: "/test-coverage",
    icon: FileCode,
    allowedRoles: ["admin", "it", "qa"]
  },
  {
    name: "Integrated Dashboard",
    path: "/integrated-dashboard",
    icon: Network, // Using Network instead of Relationship
    allowedRoles: ["admin", "it", "manager"]
  },
  {
    name: "Admin",
    icon: Settings,
    allowedRoles: ["admin"],
    children: [
      {
        name: "Risk Assessment",
        path: "/admin/risk-assessment",
        icon: AreaChart
      },
      {
        name: "Change Dropdowns",
        path: "/admin/change-dropdowns",
        icon: GitPullRequest
      }
    ]
  }
];

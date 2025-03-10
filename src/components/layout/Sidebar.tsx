import React from "react";
import {
  Home,
  LayoutDashboard,
  Settings,
  User,
  HelpCircle,
  CheckCircle,
  ListChecks,
  PackageCheck,
  FileText,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "Tickets",
      href: "/tickets",
      icon: FileText,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "Incidents",
      href: "/incidents",
      icon: HelpCircle,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "Services",
      href: "/services",
      icon: Settings,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "Changes",
      href: "/changes",
      icon: ListChecks,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "Releases",
      href: "/releases",
      icon: PackageCheck,
      roles: ["admin", "user", "it", "change-manager"],
    },
    {
      title: "My Approvals",
      href: "/approvals",
      icon: CheckCircle,
      roles: ["admin", "user", "it", "change-manager"]
    },
    {
      title: "Admin",
      href: "/admin",
      icon: User,
      roles: ["admin"],
    },
  ];

  return (
    <div className={`flex flex-col h-full bg-gray-50 border-r w-60 dark:bg-gray-900 dark:border-gray-800 ${className}`}>
      <div className="px-4 py-6">
        <NavItem href="/dashboard" title="Home" icon={Home} />
      </div>
      <div className="flex-1 px-4 py-2 space-y-1">
        {navigation.map((item) =>
          item.roles.includes(user?.role || "") ? (
            <NavItem
              key={item.title}
              href={item.href}
              title={item.title}
              icon={item.icon}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Sidebar;

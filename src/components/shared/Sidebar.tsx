
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  AlertCircle, 
  FileText, 
  Users, 
  BarChart4, 
  ClipboardList, 
  Settings, 
  Monitor, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/utils/types';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // Define navigation items with role access controls
  interface NavItem {
    name: string;
    path: string;
    icon: React.ElementType;
    allowedRoles: UserRole[];
  }
  
  const navigationItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Incidents', path: '/incidents', icon: AlertCircle, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Service Requests', path: '/service-requests', icon: FileText, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Change Management', path: '/changes', icon: ClipboardList, allowedRoles: ['admin', 'it'] },
    { name: 'Asset Management', path: '/assets', icon: Monitor, allowedRoles: ['admin', 'it'] },
    { name: 'Users', path: '/users', icon: Users, allowedRoles: ['admin'] },
    { name: 'Reports', path: '/reports', icon: BarChart4, allowedRoles: ['admin', 'it'] },
  ];
  
  const bottomNavigationItems: NavItem[] = [
    { name: 'Settings', path: '/settings', icon: Settings, allowedRoles: ['admin'] },
    { name: 'Help & Support', path: '/help', icon: HelpCircle, allowedRoles: ['admin', 'it', 'user'] },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  // Function to check if user has permission for the menu item
  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 bg-sidebar border-r border-border/40 transition-all duration-300 ease-in-out z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        {!collapsed && (
          <div className="font-semibold text-lg text-primary flex items-center">
            IT Support Bridge
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("rounded-full h-8 w-8", collapsed && "mx-auto")} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="py-4 flex flex-col h-[calc(100vh-4rem)] justify-between">
        <div className="space-y-1 px-3">
          {navigationItems.map((item) => (
            // Only render if user has permission
            hasPermission(item.allowedRoles) && (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                  isActiveRoute(item.path) && "bg-primary/10 text-primary font-medium",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          ))}
        </div>
        
        <div className="space-y-1 px-3">
          {bottomNavigationItems.map((item) => (
            // Only render if user has permission
            hasPermission(item.allowedRoles) && (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                  isActiveRoute(item.path) && "bg-primary/10 text-primary font-medium",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

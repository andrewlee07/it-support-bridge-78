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
  HelpCircle,
  Shield,
  GaugeCircle,
  ListTodo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/utils/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // Define navigation items with role access controls
  interface NavItem {
    name: string;
    path: string;
    icon: React.ElementType;
    allowedRoles: UserRole[];
  }
  
  // Define settings submenu items
  const settingsItems: NavItem[] = [
    { name: 'SLA Configuration', path: '/settings/sla', icon: GaugeCircle, allowedRoles: ['admin'] },
    { name: 'Dropdown Fields', path: '/settings/dropdowns', icon: ListTodo, allowedRoles: ['admin'] },
    { name: 'Risk Assessment', path: '/settings/risk-assessment', icon: Shield, allowedRoles: ['admin'] },
  ];
  
  const navigationItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Incidents', path: '/incidents', icon: AlertCircle, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Service Requests', path: '/service-requests', icon: FileText, allowedRoles: ['admin', 'it', 'user'] },
    { name: 'Change Management', path: '/changes', icon: ClipboardList, allowedRoles: ['admin', 'it'] },
    { name: 'Asset Management', path: '/assets', icon: Monitor, allowedRoles: ['admin', 'it'] },
    { name: 'Users', path: '/users', icon: Users, allowedRoles: ['admin'] },
    { name: 'Reports', path: '/reports', icon: BarChart4, allowedRoles: ['admin', 'it'] },
    // Add Risk Assessment directly to the main navigation
    { name: 'Risk Assessment', path: '/settings/risk-assessment', icon: Shield, allowedRoles: ['admin'] },
  ];
  
  const bottomNavigationItems: NavItem[] = [
    { name: 'Help & Support', path: '/help', icon: HelpCircle, allowedRoles: ['admin', 'it', 'user'] },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || (path !== '/settings' && location.pathname.startsWith(path));
  };
  
  // Function to check if user has permission for the menu item
  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  // Check if any settings items are accessible to the current user
  const hasSettingsAccess = settingsItems.some(item => hasPermission(item.allowedRoles));

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
          
          {/* Settings Menu (with submenu) */}
          {hasSettingsAccess && (
            collapsed ? (
              <Link 
                to="/settings"
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors justify-center",
                  location.pathname.startsWith('/settings') && "bg-primary/10 text-primary font-medium"
                )}
              >
                <Settings className="h-5 w-5" />
              </Link>
            ) : (
              <Collapsible
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex w-full justify-between items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                      location.pathname.startsWith('/settings') && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 flex-shrink-0" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-90")} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 pt-1">
                  {settingsItems.map((item) => (
                    hasPermission(item.allowedRoles) && (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                          isActiveRoute(item.path) && "bg-primary/10 text-primary font-medium"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          )}
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

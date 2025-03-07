
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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Incidents', path: '/incidents', icon: AlertCircle },
    { name: 'Service Requests', path: '/service-requests', icon: FileText },
    { name: 'Change Management', path: '/changes', icon: ClipboardList },
    { name: 'Asset Management', path: '/assets', icon: Monitor },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Reports', path: '/reports', icon: BarChart4 },
  ];
  
  const bottomNavigationItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
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
          ))}
        </div>
        
        <div className="space-y-1 px-3">
          {bottomNavigationItems.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

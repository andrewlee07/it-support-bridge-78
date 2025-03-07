
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/utils/types';
import NavLink from './sidebar/NavLink';
import SettingsMenu from './sidebar/SettingsMenu';
import { navigationItems, bottomNavigationItems, settingsItems } from './sidebar/navigationItems';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
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
              <NavLink 
                key={item.path} 
                item={item} 
                isActive={isActiveRoute(item.path)}
                collapsed={collapsed} 
              />
            )
          ))}
          
          {/* Settings Menu (with submenu) */}
          {hasSettingsAccess && (
            <SettingsMenu 
              collapsed={collapsed}
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              isActiveRoute={isActiveRoute}
              hasPermission={hasPermission}
              locationPathname={location.pathname}
            />
          )}
        </div>
        
        <div className="space-y-1 px-3">
          {bottomNavigationItems.map((item) => (
            // Only render if user has permission
            hasPermission(item.allowedRoles) && (
              <NavLink 
                key={item.path} 
                item={item} 
                isActive={isActiveRoute(item.path)}
                collapsed={collapsed} 
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

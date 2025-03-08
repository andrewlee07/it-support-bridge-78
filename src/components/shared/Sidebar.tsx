
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import NavLink from './sidebar/NavLink';
import SettingsMenu from './sidebar/SettingsMenu';
import { navigationItems, settingsItems } from './sidebar/navigationItems';
import GlobalSearch from './search/GlobalSearch';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if we're on mobile based on screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      // Auto-collapse on mobile, but ensure sidebar is always visible
      if (newIsMobile) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const isActiveRoute = (path: string | undefined): boolean => {
    if (!path) return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Function to check if user has permission for the menu item
  const hasPermission = (allowedRoles: string[] = []): boolean => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true; // If no roles specified, allow access
    return allowedRoles.includes(user.role);
  };

  // Check if any settings items are accessible to the current user
  const hasSettingsAccess = settingsItems.some(item => hasPermission(item.allowedRoles));

  return (
    <>
      {/* Sidebar - always visible, even in collapsed state */}
      <div 
        className={cn(
          "fixed top-0 left-0 bg-sidebar border-r border-border/40 h-screen z-50 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
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
          {!collapsed && (
            <div className="px-3 mb-4">
              <GlobalSearch placeholder="Search..." />
            </div>
          )}
          
          <div className="space-y-1 px-3 overflow-y-auto flex-grow">
            {navigationItems.map((item) => (
              // Only render if user has permission
              hasPermission(item.allowedRoles || []) && (
                <NavLink 
                  key={item.path || item.name} 
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
            {/* Help and support links would go here */}
          </div>
        </div>
      </div>
      
      {/* Main content wrapper with proper padding to prevent content from being hidden under sidebar */}
      <div className={cn(
        "min-h-screen bg-background transition-all duration-300 ease-in-out",
        collapsed ? "pl-16" : "pl-64"
      )}>
        {/* Content is inserted here */}
      </div>
    </>
  );
};

export default Sidebar;

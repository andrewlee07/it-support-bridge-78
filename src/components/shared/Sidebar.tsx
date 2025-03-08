import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import NavLink from './sidebar/NavLink';
import SettingsMenu from './sidebar/SettingsMenu';
import { navigationItems, settingsItems } from './sidebar/navigationItems';
import GlobalSearch from './search/GlobalSearch';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if we're on mobile based on screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      
      // Auto-collapse on mobile, expand on desktop
      if (newIsMobile && !collapsed) {
        setCollapsed(true);
      } else if (!newIsMobile && collapsed && !mobileOpen) {
        // Only auto-expand on desktop if it wasn't explicitly collapsed by user
        setCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [collapsed, mobileOpen]);
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);
  
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

  // Toggle sidebar for mobile view
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button - fixed to the top left */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobileSidebar}
          className="h-10 w-10 rounded-full shadow-md bg-background"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Overlay for mobile menu when open */}
      {mobileOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)} 
        />
      )}
      
      <div 
        className={cn(
          "fixed top-0 left-0 bg-sidebar border-r border-border/40 h-screen z-50 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          // On mobile, only show if mobileOpen is true, otherwise collapse to 0 width but keep visible on desktop
          isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"
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
        // Always add padding for the sidebar (collapsed or expanded) on desktop
        // On mobile, only add padding if the menu is visible
        isMobile && !mobileOpen ? "pl-0" : collapsed ? "pl-16" : "pl-64"
      )}>
        {/* Content is inserted here */}
      </div>
    </>
  );
};

export default Sidebar;

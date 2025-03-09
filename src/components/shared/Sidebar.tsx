
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import NavLink from './sidebar/NavLink';
import { navigationItems } from './sidebar/navigationItems';
import GlobalSearch from './search/GlobalSearch';

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapsedChange }) => {
  const [collapsed, setCollapsed] = useState(false);
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
        if (onCollapsedChange) onCollapsedChange(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onCollapsedChange]);
  
  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    
    // Notify parent component about the collapse state change
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };
  
  const isActiveRoute = (path: string | undefined): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  // Function to check if user has permission for the menu item
  const hasPermission = (allowedRoles: string[] = []): boolean => {
    if (!user) return false;
    if (allowedRoles.length === 0) return true; // If no roles specified, allow access
    return allowedRoles.includes(user.role);
  };

  return (
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
          onClick={toggleCollapsed}
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
        </div>
        
        <div className="space-y-1 px-3">
          {/* Help and support links would go here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

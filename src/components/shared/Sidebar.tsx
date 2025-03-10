
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import NavLink from './sidebar/NavLink';
import { navigationItems } from './sidebar/navigationItems';
import GlobalSearch from './search/GlobalSearch';
import SidebarCollapseButton from './sidebar/SidebarCollapseButton';
import { useSidebar } from './sidebar/useSidebar';
import { isActiveRoute, hasPermission } from './sidebar/sidebarUtils';

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapsedChange }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { collapsed, toggleCollapsed } = useSidebar({ onCollapsedChange });
  
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
        <SidebarCollapseButton 
          collapsed={collapsed} 
          onToggle={toggleCollapsed}
        />
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
            hasPermission(user, item.allowedRoles || []) && (
              <NavLink 
                key={item.path || item.name} 
                item={item} 
                isActive={isActiveRoute(location.pathname, item.path)}
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

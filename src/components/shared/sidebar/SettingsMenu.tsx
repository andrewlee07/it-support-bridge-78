
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  collapsed: boolean;
  hasPermission: (allowedRoles: string[]) => boolean;
  locationPathname: string;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  collapsed, 
  hasPermission,
  locationPathname 
}) => {
  // Only show if user has admin permission
  if (!hasPermission(['admin'])) return null;
  
  // Admin link path
  const adminPath = '/admin';
  
  // Check if current route is admin
  const isActive = locationPathname.startsWith(adminPath);
  
  return (
    <Link 
      to={adminPath}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
        isActive && "bg-primary/10 text-primary font-medium",
        collapsed && "justify-center px-2"
      )}
    >
      <Settings className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span>Admin</span>}
    </Link>
  );
};

export default SettingsMenu;


import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem } from './types';

interface NavLinkProps {
  item: NavigationItem;
  isActive: boolean;
  collapsed: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine the actual path to navigate to
  const getPath = (navItem: NavigationItem): string => {
    return navItem.href || navItem.path || '#';
  };
  
  // Check if a route is active
  const isRouteActive = (path: string | undefined): boolean => {
    if (!path) return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path === '#') {
      e.preventDefault();
      return;
    }
    
    // Use navigate to ensure proper routing
    e.preventDefault();
    navigate(path);
  };

  // Handle items with nested navigation
  if (item.items && item.items.length > 0 && !collapsed) {
    return (
      <div className="space-y-1">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 text-sidebar-foreground/80 font-medium",
          collapsed && "justify-center px-2"
        )}>
          <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />
          {!collapsed && <span>{item.name}</span>}
        </div>
        <div className="pl-8 space-y-1">
          {item.items.map((subItem) => {
            const subItemPath = getPath(subItem);
            const subItemActive = isRouteActive(subItem.path);
            
            return (
              <Link
                key={subItem.path || subItem.name}
                to={subItemPath}
                onClick={(e) => handleNavClick(e, subItemPath)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                  subItemActive && "bg-primary/10 text-primary font-medium"
                )}
              >
                <subItem.icon className="h-4 w-4 flex-shrink-0" />
                <span>{subItem.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Regular navigation link
  const itemPath = getPath(item);
  
  return (
    <Link 
      to={itemPath}
      onClick={(e) => handleNavClick(e, itemPath)}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
        isActive && "bg-primary/10 text-primary font-medium",
        collapsed && "justify-center px-2"
      )}
    >
      <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />
      {!collapsed && <span>{item.name}</span>}
    </Link>
  );
};

export default NavLink;

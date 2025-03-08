
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem } from './types';

interface NavLinkProps {
  item: NavigationItem;
  isActive: boolean;
  collapsed: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, collapsed }) => {
  // Skip rendering if item has no path or href
  if (!item.href && !item.path && !item.items) return null;
  
  // Determine the actual path to navigate to
  const getPath = (navItem: NavigationItem): string => {
    return navItem.href || navItem.path || '/';
  };

  // Handle items with nested navigation
  if (item.items && item.items.length > 0 && !collapsed) {
    return (
      <div className="space-y-1">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 text-sidebar-foreground/80 font-medium",
          collapsed && "justify-center px-2"
        )}>
          {item.icon && <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />}
          {!collapsed && <span>{item.name}</span>}
        </div>
        <div className="pl-8 space-y-1">
          {item.items.map((subItem) => {
            if (!subItem.href && !subItem.path) return null;
            
            const subItemPath = getPath(subItem);
            
            return (
              <Link
                key={subItem.path || subItem.name}
                to={subItemPath}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                  isActive && location.pathname === subItemPath && "bg-primary/10 text-primary font-medium"
                )}
              >
                {subItem.icon && <subItem.icon className="h-4 w-4 flex-shrink-0" />}
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
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
        isActive && "bg-primary/10 text-primary font-medium",
        collapsed && "justify-center px-2"
      )}
    >
      {item.icon && <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-5 w-5")} />}
      {!collapsed && <span>{item.name}</span>}
    </Link>
  );
};

export default NavLink;

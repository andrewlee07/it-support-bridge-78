
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
  return (
    <Link 
      to={item.path || item.href || '#'}
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

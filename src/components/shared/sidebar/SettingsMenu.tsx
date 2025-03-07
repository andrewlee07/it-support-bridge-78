
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { settingsItems } from './navigationItems';
import NavLink from './NavLink';
import { NavItem } from './types';

interface SettingsMenuProps {
  collapsed: boolean;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isActiveRoute: (path: string) => boolean;
  hasPermission: (allowedRoles: string[]) => boolean;
  locationPathname: string;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  collapsed, 
  settingsOpen, 
  setSettingsOpen, 
  isActiveRoute, 
  hasPermission,
  locationPathname 
}) => {
  // Filter settings items based on user permissions
  const accessibleItems = settingsItems.filter(item => hasPermission(item.allowedRoles));
  
  if (accessibleItems.length === 0) return null;
  
  if (collapsed) {
    return (
      <Link 
        to="/settings"
        className={cn(
          "flex items-center gap-3 px-2 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors justify-center",
          locationPathname.startsWith('/settings') && "bg-primary/10 text-primary font-medium"
        )}
      >
        <Settings className="h-5 w-5" />
      </Link>
    );
  }
  
  return (
    <Collapsible
      open={settingsOpen}
      onOpenChange={setSettingsOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-between items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
            locationPathname.startsWith('/settings') && "bg-primary/10 text-primary font-medium",
            "text-base" // Added text-base to match other menu items
          )}
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span>Admin Settings</span>
          </div>
          <ChevronRight className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-90")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 pt-1">
        {accessibleItems.map((item) => (
          <NavLink 
            key={item.path} 
            item={item} 
            isActive={isActiveRoute(item.path)}
            collapsed={false} 
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SettingsMenu;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { settingsItems } from './navigationItems';

interface SettingsMenuProps {
  collapsed: boolean;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isActiveRoute: (path: string | undefined) => boolean;
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
  const navigate = useNavigate();
  
  // Filter settings items based on user permissions
  const accessibleItems = settingsItems.filter(item => hasPermission(item.allowedRoles || []));
  
  if (accessibleItems.length === 0) return null;
  
  // Handle navigation
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (path === '#') {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    navigate(path);
    // Close settings menu on mobile after navigation
    if (window.innerWidth < 768) {
      setSettingsOpen(false);
    }
  };
  
  if (collapsed) {
    const defaultPath = accessibleItems.length > 0 ? 
      (accessibleItems[0].href || accessibleItems[0].path || '#') : 
      '/settings/sla';
    
    return (
      <Link 
        to={defaultPath}
        onClick={(e) => handleNavigation(e, defaultPath)}
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
            "text-base"
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
        {accessibleItems.map((item) => {
          const itemPath = item.href || item.path || '#';
          return (
            <Link 
              key={item.path || item.name} 
              to={itemPath}
              onClick={(e) => handleNavigation(e, itemPath)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                isActiveRoute(item.path) && "bg-primary/10 text-primary font-medium"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SettingsMenu;

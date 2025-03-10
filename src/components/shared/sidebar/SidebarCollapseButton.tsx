
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarCollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarCollapseButton: React.FC<SidebarCollapseButtonProps> = ({ 
  collapsed, 
  onToggle 
}) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={cn("rounded-full h-8 w-8", collapsed && "mx-auto")} 
      onClick={onToggle}
    >
      {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  );
};

export default SidebarCollapseButton;

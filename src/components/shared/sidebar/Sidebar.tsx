
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MainNav from './MainNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn('border-r bg-card h-screen w-64 flex flex-col', className)}>
      <div className="p-4 border-b">
        <Logo />
      </div>
      <ScrollArea className="flex-1 pt-2">
        <MainNav />
      </ScrollArea>
    </div>
  );
};

export default Sidebar;

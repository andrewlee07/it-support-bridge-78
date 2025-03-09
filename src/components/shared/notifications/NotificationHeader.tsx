
import React from 'react';
import { Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NotificationHeaderProps {
  onSettingsClick: () => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  onSettingsClick,
  onMarkAllAsRead,
  onClearAll
}) => {
  return (
    <div className="flex items-center justify-between border-b p-3">
      <h2 className="font-semibold">Notifications</h2>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Cog className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onSettingsClick}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onMarkAllAsRead}>
              Mark all as read
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClearAll}>
              Clear all
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NotificationHeader;

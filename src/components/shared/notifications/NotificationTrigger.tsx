
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NotificationTriggerProps {
  unreadCount: number;
}

const NotificationTrigger: React.FC<NotificationTriggerProps> = ({ unreadCount }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative h-10 w-10 rounded-full"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 px-1.5 py-0.5 h-5 min-w-5 flex items-center justify-center"
          variant="destructive"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationTrigger;

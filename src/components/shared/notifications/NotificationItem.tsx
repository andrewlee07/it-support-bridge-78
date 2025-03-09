
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getIconForResultType } from './iconHelpers';
import { formatTimestamp } from './timeHelpers';
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  return (
    <div className={`p-3 border-b last:border-0 ${notification.read ? 'bg-background' : 'bg-muted/30'}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getIconForResultType(notification.type)}
        </div>
        <div className="flex-1">
          <Link to={notification.url} className="font-medium hover:underline">
            {notification.title}
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              {notification.actor && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {notification.actor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{notification.actor.name}</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(notification.timestamp)}
              </span>
            </div>
            
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onMarkAsRead(notification.id)}
              >
                <Check className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

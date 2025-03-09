
import React from 'react';
import { BellOff, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import NotificationItem from './NotificationItem';
import { Notification } from './types';

interface NotificationListProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
  paginatedNotifications: Notification[];
  unreadCount: number;
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  markAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  activeTab,
  setActiveTab,
  notifications,
  paginatedNotifications,
  unreadCount,
  currentPage,
  pageCount,
  setCurrentPage,
  markAsRead
}) => {
  return (
    <>
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => {
          setActiveTab(value);
          setCurrentPage(1);
        }}
      >
        <div className="border-b">
          <TabsList className="w-full h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="all" 
              className="flex-1 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="unread" 
              className="flex-1 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-1.5" variant="outline">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <BellOff className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {paginatedNotifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="mt-0">
          {unreadCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Check className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {paginatedNotifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs">
            Page {currentPage} of {pageCount}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};

export default NotificationList;

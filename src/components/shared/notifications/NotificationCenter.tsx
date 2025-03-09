
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import NotificationTrigger from './NotificationTrigger';
import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';
import NotificationSettings from './NotificationSettings';
import { Notification } from './types';
import { mockNotifications } from './mockNotifications';
import { useNotificationCenterState } from '@/hooks/useNotificationCenterState';

interface NotificationCenterProps {
  initialNotifications?: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  initialNotifications = mockNotifications
}) => {
  const {
    open,
    setOpen,
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    showSettings,
    setShowSettings,
    notificationSettings,
    handleNotificationToggle,
    handleSaveSettings,
    unreadCount,
    paginatedNotifications,
    pageCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    notifications
  } = useNotificationCenterState(initialNotifications);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <NotificationTrigger unreadCount={unreadCount} />
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 p-0" 
        align="end" 
        side="bottom"
      >
        {showSettings ? (
          <NotificationSettings
            settings={notificationSettings}
            onToggle={handleNotificationToggle}
            onSave={handleSaveSettings}
            onBack={() => setShowSettings(false)}
          />
        ) : (
          <>
            <NotificationHeader
              onSettingsClick={() => setShowSettings(true)}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAll}
            />
            
            <NotificationList
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              notifications={notifications}
              paginatedNotifications={paginatedNotifications}
              unreadCount={unreadCount}
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
              markAsRead={markAsRead}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

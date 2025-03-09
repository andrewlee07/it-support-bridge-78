
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Notification, NotificationSettings } from '@/components/shared/notifications/types';

export const useNotificationCenterState = (initialNotifications: Notification[]) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    categories: {
      incidents: true,
      bugs: true,
      testCases: true,
      backlogItems: true,
      releases: true,
      assets: true,
      changes: true
    },
    deliveryMethods: {
      inApp: true,
      email: true
    },
    priorityLevels: {
      critical: true,
      high: true,
      medium: false,
      low: false
    }
  });
  
  const handleNotificationToggle = (category: string, value: string) => {
    setNotificationSettings(prev => {
      if (category.includes('.')) {
        const [mainCategory, subCategory] = category.split('.');
        return {
          ...prev,
          [mainCategory]: {
            ...prev[mainCategory],
            [subCategory]: value
          }
        };
      }
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [value]: !prev[category][value]
        }
      };
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    });
    setShowSettings(false);
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);
  
  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotifications([]);
  };

  return {
    open,
    setOpen,
    activeTab,
    setActiveTab,
    notifications,
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
    itemsPerPage
  };
};

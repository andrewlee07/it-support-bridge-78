
import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationSettings } from '@/components/shared/notifications/types';
import { toast } from 'sonner';
import { defaultSettings } from '@/utils/notifications/categoryEventMappings';
import { notificationManager } from '@/utils/notifications/notificationSubscriptionManager';
import { updateNotificationSettings } from '@/utils/notifications/notificationSettingsManager';

export const useNotificationCenterState = (initialNotifications: Notification[] = []) => {
  // UI state
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultSettings);
  
  // Initialize the notification subscriber and load notifications
  useEffect(() => {
    notificationManager.initialize();
    
    // Load initial notifications
    setNotifications(notificationManager.getNotifications());
    
    // Set up a periodic refresh to check for new notifications
    const refreshInterval = setInterval(() => {
      setNotifications(notificationManager.getNotifications());
    }, 5000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // Toggle notification settings
  const handleNotificationToggle = useCallback((category: string, value: string) => {
    const newSettings = updateNotificationSettings(notificationSettings, category, value);
    setNotificationSettings(newSettings);
  }, [notificationSettings]);

  // Save settings
  const handleSaveSettings = useCallback(() => {
    toast.success('Notification settings saved');
    setShowSettings(false);
  }, []);

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    notificationManager.markAsRead(id);
    setNotifications(notificationManager.getNotifications());
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    notificationManager.markAllAsRead();
    setNotifications(notificationManager.getNotifications());
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    notificationManager.clearAll();
    setNotifications([]);
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Pagination
  const itemsPerPage = 5;
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const pageCount = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
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
  };
};

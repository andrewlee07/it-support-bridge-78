import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationSettings } from '@/components/shared/notifications/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import NotificationSubscriber from '@/utils/eventBus/NotificationSubscriber';
import EventBus from '@/utils/eventBus/EventBus';
import { EventType } from '@/utils/types/eventBus';

// Default notification settings
const defaultSettings: NotificationSettings = {
  categories: {
    incidents: true,
    bugs: true,
    testCases: true,
    backlogItems: true,
    releases: true,
    assets: true,
    changes: true,
    knowledge: true,
    tasks: true
  },
  deliveryMethods: {
    inApp: true,
    email: true
  },
  priorityLevels: {
    critical: true,
    high: true,
    medium: true,
    low: true
  }
};

// Map notification category toggles to event types
const categoryToEventTypes: Record<string, EventType[]> = {
  incidents: [
    'ticket.created', 
    'ticket.updated', 
    'ticket.assigned', 
    'ticket.resolved', 
    'ticket.closed', 
    'ticket.reopened'
  ],
  bugs: ['test.failed'],
  testCases: ['test.created', 'test.executed', 'test.passed'],
  backlogItems: [],
  releases: ['release.created', 'release.updated', 'release.deployed'],
  assets: ['asset.created', 'asset.updated', 'asset.retired'],
  changes: [
    'change.created', 
    'change.updated', 
    'change.approved', 
    'change.rejected', 
    'change.implemented'
  ],
  knowledge: ['knowledge.created', 'knowledge.updated', 'knowledge.published'],
  tasks: ['task.created', 'task.updated', 'task.completed']
};

export const useNotificationCenterState = (initialNotifications: Notification[] = []) => {
  // UI state
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [notificationSettings, setNotificationSettings] = useState(defaultSettings);
  
  // Initialize the notification subscriber and load notifications
  useEffect(() => {
    const subscriber = NotificationSubscriber.getInstance();
    subscriber.initialize();
    
    // Load initial notifications from the subscriber
    setNotifications(subscriber.getNotifications());
    
    // Set up a periodic refresh to check for new notifications
    const refreshInterval = setInterval(() => {
      setNotifications(subscriber.getNotifications());
    }, 5000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // Toggle notification settings
  const handleNotificationToggle = (category: string, value: string) => {
    const newSettings = { ...notificationSettings };
    
    if (category === 'categories') {
      newSettings.categories = {
        ...newSettings.categories,
        [value]: !newSettings.categories[value as keyof typeof newSettings.categories]
      };
      
      // Update disabled events for the notification subscriber
      const subscriber = NotificationSubscriber.getInstance();
      const disabledEvents: EventType[] = [];
      
      Object.entries(newSettings.categories).forEach(([category, enabled]) => {
        if (!enabled && categoryToEventTypes[category]) {
          disabledEvents.push(...categoryToEventTypes[category]);
        }
      });
      
      subscriber.updateSettings({ disabledEvents });
    } 
    else if (category === 'deliveryMethods') {
      newSettings.deliveryMethods = {
        ...newSettings.deliveryMethods,
        [value]: !newSettings.deliveryMethods[value as keyof typeof newSettings.deliveryMethods]
      };
      
      // Update toast settings
      const subscriber = NotificationSubscriber.getInstance();
      subscriber.updateSettings({ 
        showToast: newSettings.deliveryMethods.inApp 
      });
    } 
    else if (category === 'priorityLevels') {
      newSettings.priorityLevels = {
        ...newSettings.priorityLevels,
        [value]: !newSettings.priorityLevels[value as keyof typeof newSettings.priorityLevels]
      };
    }
    
    setNotificationSettings(newSettings);
  };

  // Save settings
  const handleSaveSettings = () => {
    toast.success('Notification settings saved');
    setShowSettings(false);
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    const subscriber = NotificationSubscriber.getInstance();
    subscriber.markAsRead(id);
    setNotifications(subscriber.getNotifications());
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    const subscriber = NotificationSubscriber.getInstance();
    subscriber.markAllAsRead();
    setNotifications(subscriber.getNotifications());
    toast.success('All notifications marked as read');
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    const subscriber = NotificationSubscriber.getInstance();
    subscriber.clearAll();
    setNotifications([]);
    toast.success('All notifications cleared');
  }, []);

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

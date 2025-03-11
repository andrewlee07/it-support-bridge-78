
import { Notification } from '@/components/shared/notifications/types';

export const ITEMS_PER_PAGE = 5;

/**
 * Calculate paginated notifications based on the current page and active tab
 */
export const getPaginatedNotifications = (
  notifications: Notification[],
  activeTab: string,
  currentPage: number
): {
  filteredNotifications: Notification[];
  paginatedNotifications: Notification[];
  pageCount: number;
  unreadCount: number;
} => {
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  // Calculate page count
  const pageCount = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  
  // Get paginated notifications
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  return {
    filteredNotifications,
    paginatedNotifications,
    pageCount,
    unreadCount
  };
};

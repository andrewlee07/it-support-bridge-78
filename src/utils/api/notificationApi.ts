
import { ApiResponse } from '@/utils/types';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '@/utils/mockData/apiHelpers';

export interface Notification {
  id: string;
  type: 'backlog' | 'bug' | 'release' | 'testcase' | 'change' | 'incident' | 'asset';
  title: string;
  message: string;
  entityId: string;
  severity: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  timestamp: Date;
  userId: string;
}

// In-memory notifications store
let notifications: Notification[] = [];

export const createNotification = async (
  data: Omit<Notification, 'id' | 'isRead' | 'timestamp'>
): Promise<ApiResponse<Notification>> => {
  await delay(100);
  
  try {
    const newNotification: Notification = {
      id: `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...data,
      isRead: false,
      timestamp: new Date()
    };
    
    notifications.push(newNotification);
    return createApiSuccessResponse(newNotification);
  } catch (error) {
    return createApiErrorResponse(`Failed to create notification: ${error}`);
  }
};

export const getNotifications = async (
  userId: string,
  unreadOnly: boolean = false
): Promise<ApiResponse<Notification[]>> => {
  await delay(100);
  
  try {
    let result = notifications.filter(n => n.userId === userId);
    
    if (unreadOnly) {
      result = result.filter(n => !n.isRead);
    }
    
    // Sort by timestamp, newest first
    result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return createApiSuccessResponse(result);
  } catch (error) {
    return createApiErrorResponse(`Failed to fetch notifications: ${error}`);
  }
};

export const markNotificationAsRead = async (
  notificationId: string,
  userId: string
): Promise<ApiResponse<Notification>> => {
  await delay(100);
  
  try {
    const index = notifications.findIndex(
      n => n.id === notificationId && n.userId === userId
    );
    
    if (index === -1) {
      return createApiErrorResponse('Notification not found', 404);
    }
    
    notifications[index] = {
      ...notifications[index],
      isRead: true
    };
    
    return createApiSuccessResponse(notifications[index]);
  } catch (error) {
    return createApiErrorResponse(`Failed to mark notification as read: ${error}`);
  }
};

export const markAllNotificationsAsRead = async (
  userId: string
): Promise<ApiResponse<number>> => {
  await delay(100);
  
  try {
    let count = 0;
    
    notifications = notifications.map(n => {
      if (n.userId === userId && !n.isRead) {
        count++;
        return { ...n, isRead: true };
      }
      return n;
    });
    
    return createApiSuccessResponse(count);
  } catch (error) {
    return createApiErrorResponse(`Failed to mark all notifications as read: ${error}`);
  }
};

export default {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
};

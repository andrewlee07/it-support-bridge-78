
import { EventType } from '@/utils/types/eventBus';
import NotificationSubscriber from '@/utils/eventBus/NotificationSubscriber';
import { Notification } from '@/components/shared/notifications/types';
import { toast } from 'sonner';

/**
 * Manages notification subscriptions and operations
 */
export class NotificationSubscriptionManager {
  private subscriber: NotificationSubscriber;
  
  constructor() {
    this.subscriber = NotificationSubscriber.getInstance();
  }
  
  /**
   * Initialize the subscriber
   */
  public initialize(): void {
    this.subscriber.initialize();
  }
  
  /**
   * Get all notifications from the subscriber
   */
  public getNotifications(): Notification[] {
    return this.subscriber.getNotifications();
  }
  
  /**
   * Mark a notification as read
   */
  public markAsRead(id: string): void {
    this.subscriber.markAsRead(id);
  }
  
  /**
   * Mark all notifications as read
   */
  public markAllAsRead(): void {
    this.subscriber.markAllAsRead();
    toast.success('All notifications marked as read');
  }
  
  /**
   * Clear all notifications
   */
  public clearAll(): void {
    this.subscriber.clearAll();
    toast.success('All notifications cleared');
  }
  
  /**
   * Update subscriber settings based on disabled categories
   */
  public updateDisabledEvents(disabledEvents: EventType[]): void {
    this.subscriber.updateSettings({ disabledEvents });
  }
  
  /**
   * Toggle toast notifications
   */
  public toggleToastNotifications(showToast: boolean): void {
    this.subscriber.updateSettings({ showToast });
  }
}

// Create a singleton instance
export const notificationManager = new NotificationSubscriptionManager();

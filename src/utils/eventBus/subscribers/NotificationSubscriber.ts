
import EventBus from '../core';
import { SystemEvent, EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { notificationProcessor } from './notificationProcessor';
import { getUserNotificationSettings } from './userNotificationSettings';
import { EVENT_TITLE_MAP } from '../constants/eventMappings';

/**
 * Class to handle turning events into notifications
 */
class NotificationSubscriber {
  private static instance: NotificationSubscriber;
  private subscriberId: string | null = null;
  private notifications: Notification[] = [];
  
  private constructor() {
    // Private constructor to enforce singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): NotificationSubscriber {
    if (!NotificationSubscriber.instance) {
      NotificationSubscriber.instance = new NotificationSubscriber();
    }
    return NotificationSubscriber.instance;
  }
  
  /**
   * Initialize and subscribe to the event bus
   */
  public initialize(): void {
    if (this.subscriberId) {
      return; // Already initialized
    }
    
    const eventBus = EventBus.getInstance();
    
    // Subscribe to all event types and handle filtering in the filter function
    // Use Object.keys with type assertion instead of require
    this.subscriberId = eventBus.subscribe({
      eventTypes: Object.keys(EVENT_TITLE_MAP) as EventType[],
      filter: (event) => {
        const userSettings = getUserNotificationSettings();
        return !userSettings.disabledEvents.includes(event.type);
      },
      callback: this.handleEvent.bind(this)
    });
    
    console.log('NotificationSubscriber: Initialized and subscribed to EventBus');
  }
  
  /**
   * Handle an incoming event and create notifications
   */
  private async handleEvent(event: SystemEvent): Promise<void> {
    try {
      // Process the event using the separate processor
      const notification = await notificationProcessor.processEvent(event);
      
      // Store the notification
      this.notifications.push(notification);
      
      console.log(`NotificationSubscriber: Processed event ${event.id} into notification ${notification.id}`);
    } catch (error) {
      console.error('NotificationSubscriber: Error processing event:', error);
      throw error; // Rethrow to let EventBus know processing failed
    }
  }
  
  /**
   * Get all notifications
   */
  public getNotifications(): Notification[] {
    return [...this.notifications].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  /**
   * Mark a notification as read
   */
  public markAsRead(id: string): boolean {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      return true;
    }
    return false;
  }
  
  /**
   * Mark all notifications as read
   */
  public markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }
  
  /**
   * Clear all notifications
   */
  public clearAll(): void {
    this.notifications = [];
  }
  
  /**
   * Clean up and unsubscribe
   */
  public cleanup(): void {
    if (this.subscriberId) {
      const eventBus = EventBus.getInstance();
      eventBus.unsubscribe(this.subscriberId);
      this.subscriberId = null;
    }
  }
}

export default NotificationSubscriber;

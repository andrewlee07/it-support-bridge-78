
import EventBus from './EventBus';
import { SystemEvent, EventType } from '../types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { createNotificationFromEvent } from './utils/notificationCreator';
import { showToastForNotification } from './utils/toastHandler';

/**
 * Class to handle turning events into notifications
 */
class NotificationSubscriber {
  private static instance: NotificationSubscriber;
  private subscriberId: string | null = null;
  private userSettings: {
    showToast: boolean;
    disabledEvents: EventType[];
  } = {
    showToast: true,
    disabledEvents: []
  };
  
  // Mock storage for notifications (would connect to a real data store in production)
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
    
    // Subscribe to all event types
    this.subscriberId = eventBus.subscribe({
      eventTypes: Object.keys(require('./constants/eventMappings').EVENT_TITLE_MAP) as EventType[],
      // Filter out disabled events
      filter: (event) => !this.userSettings.disabledEvents.includes(event.type),
      callback: this.handleEvent.bind(this)
    });
    
    console.log('NotificationSubscriber: Initialized and subscribed to EventBus');
  }
  
  /**
   * Handle an incoming event and create notifications
   */
  private async handleEvent(event: SystemEvent): Promise<void> {
    try {
      // Create a notification object
      const notification = createNotificationFromEvent(event);
      
      // Store the notification
      this.notifications.push(notification);
      
      // Show toast if enabled
      if (this.userSettings.showToast) {
        showToastForNotification(notification);
      }
      
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
   * Update user settings
   */
  public updateSettings(settings: Partial<typeof this.userSettings>): void {
    this.userSettings = {
      ...this.userSettings,
      ...settings
    };
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

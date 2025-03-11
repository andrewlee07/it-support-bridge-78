import EventBus from './EventBus';
import { SystemEvent, EventType } from '../types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { v4 as uuidv4 } from 'uuid';
import { getIconForResultType } from '@/components/shared/notifications/iconHelpers';
import { toast } from 'sonner';

/**
 * Maps event types to user-friendly notification titles
 */
const EVENT_TITLE_MAP: Record<EventType, string> = {
  'ticket.created': 'New ticket created',
  'ticket.updated': 'Ticket updated',
  'ticket.assigned': 'Ticket assigned',
  'ticket.resolved': 'Ticket resolved',
  'ticket.closed': 'Ticket closed',
  'ticket.reopened': 'Ticket reopened',
  'change.created': 'New change request',
  'change.updated': 'Change request updated',
  'change.approved': 'Change request approved',
  'change.rejected': 'Change request rejected',
  'change.implemented': 'Change implemented',
  'problem.created': 'New problem record',
  'problem.updated': 'Problem record updated',
  'problem.resolved': 'Problem resolved',
  'sla.warning': 'SLA Warning',
  'sla.breached': 'SLA Breached',
  'task.created': 'New task created',
  'task.updated': 'Task updated',
  'task.completed': 'Task completed',
  'release.created': 'New release created',
  'release.updated': 'Release updated',
  'release.deployed': 'Release deployed',
  'knowledge.created': 'New article created',
  'knowledge.updated': 'Article updated',
  'knowledge.published': 'Article published',
  'asset.created': 'New asset added',
  'asset.updated': 'Asset updated',
  'asset.retired': 'Asset retired',
  'test.created': 'New test case created',
  'test.executed': 'Test executed',
  'test.passed': 'Test passed',
  'test.failed': 'Test failed'
};

/**
 * Maps event types to notification types
 */
const EVENT_TO_NOTIFICATION_TYPE: Record<EventType, Notification['type']> = {
  'ticket.created': 'incident',
  'ticket.updated': 'incident',
  'ticket.assigned': 'incident',
  'ticket.resolved': 'incident',
  'ticket.closed': 'incident',
  'ticket.reopened': 'incident',
  'change.created': 'change',
  'change.updated': 'change',
  'change.approved': 'change',
  'change.rejected': 'change',
  'change.implemented': 'change',
  'problem.created': 'incident',
  'problem.updated': 'incident',
  'problem.resolved': 'incident',
  'sla.warning': 'incident',
  'sla.breached': 'incident',
  'task.created': 'task',
  'task.updated': 'task',
  'task.completed': 'task',
  'release.created': 'release',
  'release.updated': 'release',
  'release.deployed': 'release',
  'knowledge.created': 'knowledge',
  'knowledge.updated': 'knowledge',
  'knowledge.published': 'knowledge',
  'asset.created': 'asset',
  'asset.updated': 'asset',
  'asset.retired': 'asset',
  'test.created': 'testCase',
  'test.executed': 'testCase',
  'test.passed': 'testCase',
  'test.failed': 'bug'
};

/**
 * Maps event types to priority
 */
const EVENT_TO_PRIORITY: Record<EventType, Notification['priority']> = {
  'ticket.created': 'medium',
  'ticket.updated': 'low',
  'ticket.assigned': 'medium',
  'ticket.resolved': 'medium',
  'ticket.closed': 'low',
  'ticket.reopened': 'high',
  'change.created': 'medium',
  'change.updated': 'low',
  'change.approved': 'medium',
  'change.rejected': 'high',
  'change.implemented': 'medium',
  'problem.created': 'high',
  'problem.updated': 'medium',
  'problem.resolved': 'medium',
  'sla.warning': 'high',
  'sla.breached': 'critical',
  'task.created': 'medium',
  'task.updated': 'low',
  'task.completed': 'medium',
  'release.created': 'medium',
  'release.updated': 'low',
  'release.deployed': 'high',
  'knowledge.created': 'low',
  'knowledge.updated': 'low',
  'knowledge.published': 'medium',
  'asset.created': 'low',
  'asset.updated': 'low',
  'asset.retired': 'medium',
  'test.created': 'low',
  'test.executed': 'low',
  'test.passed': 'medium',
  'test.failed': 'high'
};

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
      eventTypes: Object.keys(EVENT_TITLE_MAP) as EventType[],
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
      const notification = this.createNotificationFromEvent(event);
      
      // Store the notification
      this.notifications.push(notification);
      
      // Show toast if enabled
      if (this.userSettings.showToast) {
        this.showToastForNotification(notification);
      }
      
      console.log(`NotificationSubscriber: Processed event ${event.id} into notification ${notification.id}`);
    } catch (error) {
      console.error('NotificationSubscriber: Error processing event:', error);
      throw error; // Rethrow to let EventBus know processing failed
    }
  }
  
  /**
   * Create a notification object from an event
   */
  private createNotificationFromEvent(event: SystemEvent): Notification {
    const id = uuidv4();
    const now = new Date();
    const type = EVENT_TO_NOTIFICATION_TYPE[event.type] || 'incident';
    const priority = EVENT_TO_PRIORITY[event.type] || 'medium';
    
    let title = EVENT_TITLE_MAP[event.type] || 'System Notification';
    let message = '';
    let actionUrl = '/';
    let entityId;
    
    // Extract specific details based on event type
    switch (event.type) {
      case 'task.created':
      case 'task.updated':
      case 'task.completed':
        const taskData = event.data as any;
        title = `${title}: ${taskData.title}`;
        message = taskData.description || `Task ${event.type.split('.')[1]}`;
        actionUrl = `/tasks/${taskData.taskId}`;
        entityId = taskData.taskId;
        break;
      
      // Add more event type handling as needed
      
      default:
        message = `Event occurred at ${now.toLocaleTimeString()}`;
        break;
    }
    
    // Create and return the notification
    return {
      id,
      title,
      message,
      type,
      priority,
      date: now,
      read: false,
      actionUrl,
      url: actionUrl,
      timestamp: now,
      entityId
    };
  }
  
  /**
   * Show a toast notification
   */
  private showToastForNotification(notification: Notification): void {
    const icon = getIconForResultType(notification.type);
    
    toast(notification.title, {
      description: notification.message,
      action: {
        label: "View",
        onClick: () => window.location.href = notification.actionUrl || '#'
      },
      icon
    });
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


import { SystemEvent } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { createNotificationFromEvent } from '../utils/notificationCreator';
import { showToastForNotification } from '../utils/toastHandler';
import { getUserNotificationSettings } from './userNotificationSettings';

/**
 * Class for processing events into notifications
 */
class NotificationProcessor {
  /**
   * Process an event into a notification
   */
  public async processEvent(event: SystemEvent): Promise<Notification> {
    // Create a notification object
    const notification = createNotificationFromEvent(event);
    
    // Show toast if enabled in user settings
    const userSettings = getUserNotificationSettings();
    if (userSettings.showToast) {
      showToastForNotification(notification);
    }
    
    return notification;
  }
}

// Create singleton instance
export const notificationProcessor = new NotificationProcessor();

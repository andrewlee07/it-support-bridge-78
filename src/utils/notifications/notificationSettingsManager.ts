
import { EventType } from '@/utils/types/eventBus';
import { NotificationSettings } from '@/components/shared/notifications/types';
import { categoryToEventTypes } from './categoryEventMappings';
import { notificationManager } from './notificationSubscriptionManager';

/**
 * Updates notification settings and syncs with the subscription manager
 */
export const updateNotificationSettings = (
  currentSettings: NotificationSettings,
  category: string,
  value: string
): NotificationSettings => {
  const newSettings = { ...currentSettings };
  
  if (category === 'categories') {
    // Update category toggle
    newSettings.categories = {
      ...newSettings.categories,
      [value]: !newSettings.categories[value as keyof typeof newSettings.categories]
    };
    
    // Collect all disabled event types
    const disabledEvents: EventType[] = [];
    Object.entries(newSettings.categories).forEach(([categoryName, enabled]) => {
      if (!enabled && categoryToEventTypes[categoryName]) {
        disabledEvents.push(...categoryToEventTypes[categoryName]);
      }
    });
    
    // Update subscriber settings
    notificationManager.updateDisabledEvents(disabledEvents);
  } 
  else if (category === 'deliveryMethods') {
    // Update delivery method toggle
    newSettings.deliveryMethods = {
      ...newSettings.deliveryMethods,
      [value]: !newSettings.deliveryMethods[value as keyof typeof newSettings.deliveryMethods]
    };
    
    // Update toast settings
    notificationManager.toggleToastNotifications(newSettings.deliveryMethods.inApp);
  } 
  else if (category === 'priorityLevels') {
    // Update priority level toggle
    newSettings.priorityLevels = {
      ...newSettings.priorityLevels,
      [value]: !newSettings.priorityLevels[value as keyof typeof newSettings.priorityLevels]
    };
  }
  
  return newSettings;
};

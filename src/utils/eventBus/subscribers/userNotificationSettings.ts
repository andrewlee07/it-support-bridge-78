
import { EventType } from '@/utils/types/eventBus';

/**
 * User notification settings interface
 */
interface UserNotificationSettings {
  showToast: boolean;
  disabledEvents: EventType[];
}

// Default settings
const defaultSettings: UserNotificationSettings = {
  showToast: true,
  disabledEvents: []
};

// In-memory storage for settings (would connect to persistent storage in production)
let userSettings: UserNotificationSettings = { ...defaultSettings };

/**
 * Get current user notification settings
 */
export function getUserNotificationSettings(): UserNotificationSettings {
  return { ...userSettings };
}

/**
 * Update user notification settings
 */
export function updateUserNotificationSettings(settings: Partial<UserNotificationSettings>): void {
  userSettings = {
    ...userSettings,
    ...settings
  };
}

/**
 * Toggle toast notifications
 */
export function toggleToastNotifications(enabled: boolean): void {
  userSettings.showToast = enabled;
}

/**
 * Update disabled events
 */
export function updateDisabledEvents(disabledEvents: EventType[]): void {
  userSettings.disabledEvents = [...disabledEvents];
}

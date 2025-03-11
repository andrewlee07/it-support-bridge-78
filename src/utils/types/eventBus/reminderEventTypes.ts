
/**
 * Reminder-specific event data types
 */

// Reminder-specific event data
export interface ReminderEventData {
  reminderId: string;
  title: string;
  description?: string;
  dueDate: string;
  createdBy: string;
  recipients: string[];
  priority: string;
  relatedItemId?: string;
  relatedItemType?: string;
  timeRemaining?: string;        // For upcoming reminders
  actionRequired?: string;       // For due reminders
  frequency?: string;            // For recurring reminders
  snoozeDuration?: string;       // For snoozed reminders
  newReminderTime?: string;      // For snoozed reminders
  cancellationReason?: string;   // For canceled reminders
  enabledChannels?: {
    email: boolean;
    teams: boolean;
    inApp: boolean;
    sms: boolean;
  };
}


import { Task } from './taskTypes';

export type ReminderTriggerType = 'time-based' | 'event-based';
export type ReminderFrequency = 'one-time' | 'daily' | 'weekly' | 'monthly' | 'custom';
export type ReminderDeliveryMethod = 'in-app' | 'email' | 'push';
export type ReminderStatus = 'active' | 'completed' | 'snoozed' | 'cancelled';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  triggerType: ReminderTriggerType;
  triggerTime?: Date;
  frequency: ReminderFrequency;
  deliveryMethods: ReminderDeliveryMethod[];
  status: ReminderStatus;
  userId: string; // The user who will receive the reminder
  creatorId: string; // The user who created the reminder
  relatedItemId?: string; // ID of related task, incident, etc.
  relatedItemType?: 'task' | 'incident' | 'service-request';
  snoozedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReminderFormValues {
  title: string;
  description?: string;
  triggerType: ReminderTriggerType;
  triggerTime?: Date;
  frequency: ReminderFrequency;
  deliveryMethods: ReminderDeliveryMethod[];
  relatedItemId?: string; 
  relatedItemType?: 'task' | 'incident' | 'service-request';
}

// Helper functions
export const isReminderDue = (reminder: Reminder): boolean => {
  if (reminder.status !== 'active') return false;
  if (reminder.snoozedUntil && new Date(reminder.snoozedUntil) > new Date()) return false;
  if (!reminder.triggerTime) return false;
  
  return new Date(reminder.triggerTime) <= new Date();
};

export const getSnoozeOptions = (): { label: string; value: number }[] => [
  { label: '15 minutes', value: 15 * 60 * 1000 },
  { label: '1 hour', value: 60 * 60 * 1000 },
  { label: '4 hours', value: 4 * 60 * 60 * 1000 },
  { label: '1 day', value: 24 * 60 * 60 * 1000 },
];

export interface ReminderNotification {
  id: string;
  reminderId: string;
  title: string;
  message: string;
  deliveryMethod: ReminderDeliveryMethod;
  sentAt: Date;
  read: boolean;
  userId: string;
}

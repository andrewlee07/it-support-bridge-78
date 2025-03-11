
import EventBus from '../core';
import { ReminderEventData } from '@/utils/types/eventBus';

/**
 * ReminderEventPublisher handles publishing events related to reminders
 */
class ReminderEventPublisher {
  private eventBus = EventBus.getInstance();

  /**
   * Publish an upcoming reminder event
   */
  public publishUpcomingEvent(reminderData: ReminderEventData): string {
    return this.eventBus.publish(
      'reminder.upcoming',
      'reminderService',
      reminderData
    );
  }

  /**
   * Publish a due reminder event
   */
  public publishDueEvent(reminderData: ReminderEventData): string {
    return this.eventBus.publish(
      'reminder.due',
      'reminderService',
      reminderData
    );
  }

  /**
   * Publish a recurring reminder event
   */
  public publishRecurringEvent(reminderData: ReminderEventData): string {
    return this.eventBus.publish(
      'reminder.recurring',
      'reminderService',
      reminderData
    );
  }

  /**
   * Publish a snoozed reminder event
   */
  public publishSnoozedEvent(reminderData: ReminderEventData): string {
    return this.eventBus.publish(
      'reminder.snoozed',
      'reminderService',
      reminderData
    );
  }

  /**
   * Publish a canceled reminder event
   */
  public publishCanceledEvent(reminderData: ReminderEventData): string {
    return this.eventBus.publish(
      'reminder.canceled',
      'reminderService',
      reminderData
    );
  }
}

// Create a singleton instance
export const reminderEventPublisher = new ReminderEventPublisher();

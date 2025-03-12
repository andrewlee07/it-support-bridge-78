
// Re-export all event types for easier imports
export * from './problemEventTypes';
export * from './reminderEventTypes';

// Define common event types
export type EventType = 
  // Ticket events
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.resolved'
  | 'ticket.closed'
  | 'ticket.reopened'
  | 'ticket.assigned'
  | 'ticket.noted'
  
  // Problem events
  | 'problem.created'
  | 'problem.updated'
  | 'problem.resolved'
  | 'problem.closed'
  | 'problem.reopened'
  | 'problem.knownError'
  | 'problem.assigned'
  
  // Reminder events
  | 'reminder.created'
  | 'reminder.updated'
  | 'reminder.upcoming'
  | 'reminder.due'
  | 'reminder.recurring'
  | 'reminder.snoozed'
  | 'reminder.canceled';

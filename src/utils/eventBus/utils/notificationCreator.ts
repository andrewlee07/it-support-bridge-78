
import { SystemEvent, EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { v4 as uuidv4 } from 'uuid';
import { EVENT_TITLE_MAP, EVENT_TO_NOTIFICATION_TYPE, EVENT_TO_PRIORITY } from '../constants/eventMappings';

/**
 * Create a notification object from an event
 */
export const createNotificationFromEvent = (event: SystemEvent): Notification => {
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
};

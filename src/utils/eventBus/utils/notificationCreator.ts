
import { SystemEvent, EventType, ProblemEventData, KnownErrorEventData } from '@/utils/types/eventBus';
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
    
    case 'problem.created':
    case 'problem.updated':
    case 'problem.assigned':
    case 'problem.rootCauseIdentified':
    case 'problem.workaroundAvailable':
    case 'problem.resolved':
    case 'problem.closed':
      const problemData = event.data as ProblemEventData;
      title = `${title}: ${problemData.title}`;
      
      // Create appropriate message based on event type
      if (event.type === 'problem.created') {
        message = `New problem record created: ${problemData.description || problemData.title}`;
      } else if (event.type === 'problem.assigned') {
        message = `Problem assigned to ${problemData.assignee}`;
        if (problemData.previousAssignee) {
          message += ` (previously: ${problemData.previousAssignee})`;
        }
      } else if (event.type === 'problem.rootCauseIdentified') {
        message = `Root cause identified: ${problemData.rootCause}`;
      } else if (event.type === 'problem.workaroundAvailable') {
        message = `Workaround available: ${problemData.workaround}`;
      } else if (event.type === 'problem.resolved') {
        message = `Problem resolved: ${problemData.resolution}`;
      } else if (event.type === 'problem.closed') {
        message = `Problem closed: ${problemData.closureDetails || 'No closure details provided'}`;
      }
      
      actionUrl = `/problems/${problemData.problemId}`;
      entityId = problemData.problemId;
      break;
    
    case 'knownError.created':
    case 'knownError.updated':
    case 'knownError.workaroundUpdated':
    case 'knownError.planToFix':
    case 'knownError.resolved':
      const kedbData = event.data as KnownErrorEventData;
      title = `${title}: ${kedbData.title}`;
      
      // Create appropriate message based on event type
      if (event.type === 'knownError.created') {
        message = `New known error added: ${kedbData.description || kedbData.title}`;
      } else if (event.type === 'knownError.updated') {
        const updatedFieldsList = kedbData.updatedFields?.join(', ') || 'multiple fields';
        message = `Known error updated: ${updatedFieldsList}`;
      } else if (event.type === 'knownError.workaroundUpdated') {
        message = `Workaround updated: ${kedbData.workaround}`;
      } else if (event.type === 'knownError.planToFix') {
        message = `Fix scheduled: ${kedbData.permanentFix} on ${kedbData.scheduledFixDate}`;
      } else if (event.type === 'knownError.resolved') {
        message = `Known error resolved: ${kedbData.resolution}`;
      }
      
      actionUrl = `/knowledge/known-errors/${kedbData.knownErrorId}`;
      entityId = kedbData.knownErrorId;
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

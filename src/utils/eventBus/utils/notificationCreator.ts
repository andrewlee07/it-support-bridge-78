import { SystemEvent, EventType, ProblemEventData, KnownErrorEventData, ReleaseEventData, KnowledgeArticleEventData, BacklogItemEventData, TaskEventData, ReminderEventData } from '@/utils/types/eventBus';
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
    case 'task.assigned':
    case 'task.dueDateApproaching':
    case 'task.overdue':
    case 'task.statusChanged':
    case 'task.completed':
      const taskData = event.data as TaskEventData;
      title = `${title}: ${taskData.title}`;
      
      // Create appropriate message based on event type
      if (event.type === 'task.created') {
        message = `New task created: ${taskData.description || taskData.title}`;
        if (taskData.dueDate) {
          message += `. Due: ${taskData.dueDate}`;
        }
      } else if (event.type === 'task.updated') {
        const updatedFieldsList = taskData.updatedFields?.join(', ') || 'multiple fields';
        message = `Task updated: ${updatedFieldsList}`;
      } else if (event.type === 'task.assigned') {
        message = `Task assigned to ${taskData.assignee}`;
        if (taskData.previousAssignee) {
          message += ` (previously: ${taskData.previousAssignee})`;
        }
      } else if (event.type === 'task.dueDateApproaching') {
        message = `Task due date approaching: ${taskData.dueDate}`;
        if (taskData.reminderDays) {
          message += ` (${taskData.reminderDays} days remaining)`;
        }
      } else if (event.type === 'task.overdue') {
        message = `Task is overdue. Due date was: ${taskData.dueDate}`;
        if (taskData.escalation) {
          message += `. ${taskData.escalation}`;
        }
      } else if (event.type === 'task.statusChanged') {
        message = `Task status changed to ${taskData.status}`;
        if (taskData.progress) {
          message += `. ${taskData.progress}`;
        }
      } else if (event.type === 'task.completed') {
        message = `Task completed: ${taskData.completionDetails || 'No details provided'}`;
      }
      
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
    
    case 'knowledge.created':
    case 'knowledge.updated':
    case 'knowledge.published':
      const knowledgeData = event.data as KnowledgeArticleEventData;
      title = `${title}: ${knowledgeData.title}`;

      // Create appropriate message based on event type
      if (event.type === 'knowledge.created') {
        message = `New knowledge article created: ${knowledgeData.title}`;
      } else if (event.type === 'knowledge.updated') {
        const updatedFieldsList = knowledgeData.updatedFields?.join(', ') || 'multiple fields';
        message = `Knowledge article updated: ${updatedFieldsList}`;
      } else if (event.type === 'knowledge.published') {
        message = `Knowledge article published by ${knowledgeData.publishedBy || 'system'} on ${knowledgeData.publishDate || 'now'}`;
      }

      actionUrl = `/knowledge/articles/${knowledgeData.articleId}`;
      entityId = knowledgeData.articleId;
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
    
    case 'release.created':
    case 'release.updated':
    case 'release.planApproved':
    case 'release.readyForTest':
    case 'release.testCompleted':
    case 'release.scheduledDeployment':
    case 'release.deploymentStarted':
    case 'release.deploymentCompleted':
    case 'release.deployed':
    case 'release.rollback':
      const releaseData = event.data as ReleaseEventData;
      title = `${title}: ${releaseData.title} v${releaseData.version}`;
      
      // Create appropriate message based on event type
      if (event.type === 'release.created') {
        message = `New release created: ${releaseData.description || releaseData.title}`;
      } else if (event.type === 'release.updated') {
        const updatedFieldsList = releaseData.updatedFields?.join(', ') || 'multiple fields';
        message = `Release updated: ${updatedFieldsList}`;
      } else if (event.type === 'release.planApproved') {
        message = `Release plan approved for deployment on ${releaseData.plannedDate}`;
      } else if (event.type === 'release.readyForTest') {
        message = `Release is ready for testing in ${releaseData.deploymentDetails?.environment || 'test environment'}`;
      } else if (event.type === 'release.testCompleted') {
        const passRate = releaseData.testResults?.passRate || 0;
        message = `Testing completed with ${passRate}% pass rate. ${releaseData.testResults?.failedTests || 0} test(s) failed.`;
      } else if (event.type === 'release.scheduledDeployment') {
        message = `Deployment scheduled for ${releaseData.deploymentDate}. Expected downtime: ${releaseData.deploymentDetails?.expectedDowntime || 'None'}.`;
      } else if (event.type === 'release.deploymentStarted') {
        message = `Deployment started at ${releaseData.deploymentDetails?.startTime}. Expected completion: ${releaseData.deploymentDetails?.endTime}.`;
      } else if (event.type === 'release.deploymentCompleted' || event.type === 'release.deployed') {
        message = `Deployment completed successfully. Release is now live.`;
      } else if (event.type === 'release.rollback') {
        message = `Release rollback initiated. Reason: ${releaseData.rollbackReason || 'Unknown issue'}.`;
      }
      
      actionUrl = `/releases/${releaseData.releaseId}`;
      entityId = releaseData.releaseId;
      break;
    
    case 'backlogItem.created':
    case 'backlogItem.priorityChanged':
    case 'backlogItem.addedToSprint':
    case 'backlogItem.removedFromSprint':
    case 'backlogItem.statusChanged':
    case 'backlogItem.readyForReview':
    case 'backlogItem.completed':
      const backlogData = event.data as BacklogItemEventData;
      title = `${title}: ${backlogData.title}`;
      
      // Create appropriate message based on event type
      if (event.type === 'backlogItem.created') {
        message = `New backlog item created: ${backlogData.title}`;
      } else if (event.type === 'backlogItem.priorityChanged') {
        message = `Priority changed to ${backlogData.priority}`;
        if (backlogData.reason) {
          message += ` - Reason: ${backlogData.reason}`;
        }
      } else if (event.type === 'backlogItem.addedToSprint') {
        message = `Added to sprint: ${backlogData.sprintName || ''}`;
      } else if (event.type === 'backlogItem.removedFromSprint') {
        message = `Removed from sprint${backlogData.sprintName ? `: ${backlogData.sprintName}` : ''}`;
        if (backlogData.reason) {
          message += ` - Reason: ${backlogData.reason}`;
        }
      } else if (event.type === 'backlogItem.statusChanged') {
        message = `Status changed to ${backlogData.status}`;
      } else if (event.type === 'backlogItem.readyForReview') {
        message = `Ready for review. ${backlogData.reviewInstructions || ''}`;
      } else if (event.type === 'backlogItem.completed') {
        message = `Backlog item completed. ${backlogData.completionDetails || ''}`;
      }
      
      actionUrl = `/backlog/${backlogData.backlogItemId}`;
      entityId = backlogData.backlogItemId;
      break;
    
    // Reminder events
    case 'reminder.upcoming':
    case 'reminder.due':
    case 'reminder.recurring':
    case 'reminder.snoozed':
    case 'reminder.canceled':
      const reminderData = event.data as ReminderEventData;
      title = `${title}: ${reminderData.title}`;
      
      // Create appropriate message based on event type
      if (event.type === 'reminder.upcoming') {
        message = `Reminder coming up: ${reminderData.description || reminderData.title}`;
        if (reminderData.timeRemaining) {
          message += `. Due in: ${reminderData.timeRemaining}`;
        }
      } else if (event.type === 'reminder.due') {
        message = `Reminder is now due: ${reminderData.description || reminderData.title}`;
        if (reminderData.actionRequired) {
          message += `. Action required: ${reminderData.actionRequired}`;
        }
      } else if (event.type === 'reminder.recurring') {
        message = `Recurring reminder: ${reminderData.description || reminderData.title}`;
        if (reminderData.frequency) {
          message += `. Frequency: ${reminderData.frequency}`;
        }
      } else if (event.type === 'reminder.snoozed') {
        message = `Reminder snoozed: ${reminderData.description || reminderData.title}`;
        if (reminderData.snoozeDuration) {
          message += `. Snoozed for: ${reminderData.snoozeDuration}`;
        }
        if (reminderData.newReminderTime) {
          message += `. New reminder time: ${reminderData.newReminderTime}`;
        }
      } else if (event.type === 'reminder.canceled') {
        message = `Reminder canceled: ${reminderData.description || reminderData.title}`;
        if (reminderData.cancellationReason) {
          message += `. Reason: ${reminderData.cancellationReason}`;
        }
      }
      
      actionUrl = `/reminders/${reminderData.reminderId}`;
      entityId = reminderData.reminderId;
      
      // Add related item information if available
      if (reminderData.relatedItemId && reminderData.relatedItemType) {
        message += `. Related to: ${reminderData.relatedItemType} #${reminderData.relatedItemId}`;
        // Update actionUrl to point to related item instead if available
        if (reminderData.relatedItemType === 'ticket') {
          actionUrl = `/tickets/${reminderData.relatedItemId}`;
        } else if (reminderData.relatedItemType === 'task') {
          actionUrl = `/tasks/${reminderData.relatedItemId}`;
        } else if (reminderData.relatedItemType === 'change') {
          actionUrl = `/changes/${reminderData.relatedItemId}`;
        } else if (reminderData.relatedItemType === 'release') {
          actionUrl = `/releases/${reminderData.relatedItemId}`;
        } else if (reminderData.relatedItemType === 'backlogItem') {
          actionUrl = `/backlog/${reminderData.relatedItemId}`;
        }
      }
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

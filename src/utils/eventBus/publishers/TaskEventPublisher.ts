
import { publishEvent } from '../initEventBus';
import { Task } from '@/utils/types/taskTypes';
import { TaskEventData } from '@/utils/types/eventBus';

/**
 * Helper to publish task-related events
 */
const TaskEventPublisher = {
  /**
   * Publish a task.created event
   */
  publishTaskCreated: (task: Task, userId?: string) => {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignee: task.assignee,
      // Convert Date to ISO string
      dueDate: task.dueDate ? task.dueDate.toISOString() : undefined
    };
    
    return publishEvent(
      'task.created',
      'task-service',
      eventData,
      {
        userId,
        origin: 'web-app'
      }
    );
  },
  
  /**
   * Publish a task.updated event
   */
  publishTaskUpdated: (task: Task, updatedFields: string[], userId?: string) => {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
      assignee: task.assignee,
      // Convert Date to ISO string
      dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
      updatedFields
    };
    
    return publishEvent(
      'task.updated',
      'task-service',
      eventData,
      {
        userId,
        origin: 'web-app'
      }
    );
  },
  
  /**
   * Publish a task.completed event
   */
  publishTaskCompleted: (task: Task, userId?: string) => {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
      assignee: task.assignee
    };
    
    return publishEvent(
      'task.completed',
      'task-service',
      eventData,
      {
        userId,
        origin: 'web-app'
      }
    );
  }
};

export default TaskEventPublisher;

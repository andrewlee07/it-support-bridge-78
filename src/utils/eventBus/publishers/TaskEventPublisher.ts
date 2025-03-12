
import EventBus from '../EventBus';
import { TaskEventData } from '@/utils/types/eventBus';
import { EventType } from '@/utils/types/eventBus';

/**
 * Utility class for publishing task-related events to the EventBus
 */
export class TaskEventPublisher {
  /**
   * Publish a task created event
   */
  static publishTaskCreated(task: any) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignee: task.assignee,
      dueDate: task.dueDate,
      createdBy: task.creator
    };

    // Get the instance of EventBus and publish the event
    EventBus.getInstance().publish(
      'task.created' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: task.creator || 'system',
          type: 'user'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task updated event
   */
  static publishTaskUpdated(task: any, updatedFields: string[]) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      updatedFields
    };

    EventBus.getInstance().publish(
      'task.updated' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: 'current-user',
          type: 'user'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task status changed event
   */
  static publishTaskStatusChanged(task: any, previousStatus: string) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      progress: `Status changed from ${previousStatus} to ${task.status}`
    };

    EventBus.getInstance().publish(
      'task.statusChanged' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: 'current-user',
          type: 'user'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task assigned event
   */
  static publishTaskAssigned(task: any, previousAssignee?: string) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      previousAssignee
    };

    EventBus.getInstance().publish(
      'task.assigned' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: 'current-user',
          type: 'user'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task completed event
   */
  static publishTaskCompleted(task: any) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      completionDetails: `Task completed by ${task.assignee || 'unassigned'}`
    };

    EventBus.getInstance().publish(
      'task.completed' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: task.assignee || 'current-user',
          type: 'user'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task overdue event
   */
  static publishTaskOverdue(task: any) {
    const eventData: TaskEventData = {
      taskId: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      escalation: 'Task is now overdue'
    };

    EventBus.getInstance().publish(
      'task.overdue' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: 'system',
          type: 'system'
        },
        entity: {
          id: task.id,
          type: 'task'
        }
      }
    );
  }

  /**
   * Publish a task deleted event
   */
  static publishTaskDeleted(taskId: string, title: string, deletedBy: string) {
    const eventData: TaskEventData = {
      taskId,
      title,
      status: 'deleted' as any,
      priority: 'n/a' as any,
      createdBy: deletedBy
    };

    EventBus.getInstance().publish(
      'task.deleted' as EventType,
      'task-management',
      eventData,
      {
        actor: {
          id: deletedBy || 'current-user',
          type: 'user'
        },
        entity: {
          id: taskId,
          type: 'task'
        }
      }
    );
  }
}

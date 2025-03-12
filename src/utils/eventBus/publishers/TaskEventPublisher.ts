
import { TaskEventData } from '../types/eventBus/taskEventTypes';
import EventBus from '../EventBus';

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
      'task-created',
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
      'task-updated',
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
      'task-status-changed',
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
      'task-assigned',
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
      'task-completed',
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
      'task-overdue',
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
      status: 'deleted',
      priority: 'n/a',
      createdBy: deletedBy
    };

    EventBus.getInstance().publish(
      'task-deleted',
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

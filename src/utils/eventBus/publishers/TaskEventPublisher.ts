
import { EventBus } from '../EventBus';
import { Task } from '@/utils/types/taskTypes';

export enum TaskEvent {
  CREATED = 'task.created',
  UPDATED = 'task.updated',
  COMPLETED = 'task.completed',
  REASSIGNED = 'task.reassigned',
  DELETED = 'task.deleted',
  DUE_DATE_APPROACHING = 'task.dueDateApproaching',
  CHECKLIST_ITEM_COMPLETED = 'task.checklistItemCompleted',
}

export class TaskEventPublisher {
  static publishTaskCreated(task: Task, userId: string) {
    EventBus.publish(TaskEvent.CREATED, {
      taskId: task.id,
      title: task.title,
      creatorId: userId,
      timestamp: new Date().toISOString(),
    });
  }

  static publishTaskUpdated(task: Task, userId: string, updatedFields: string[]) {
    EventBus.publish(TaskEvent.UPDATED, {
      taskId: task.id,
      title: task.title,
      updatedBy: userId,
      updatedFields,
      // Use toString instead of toISOString since task.updatedAt is a string
      timestamp: task.updatedAt || new Date().toISOString(),
    });
  }

  static publishTaskCompleted(task: Task, userId: string) {
    EventBus.publish(TaskEvent.COMPLETED, {
      taskId: task.id,
      title: task.title,
      completedBy: userId,
      timestamp: new Date().toISOString(),
    });
  }

  static publishTaskReassigned(task: Task, userId: string, previousAssignee: string | null) {
    EventBus.publish(TaskEvent.REASSIGNED, {
      taskId: task.id,
      title: task.title,
      assignedBy: userId,
      previousAssignee,
      newAssignee: task.assignee,
      // Use toString instead of toISOString since task.updatedAt is a string
      timestamp: task.updatedAt || new Date().toISOString(),
    });
  }

  static publishTaskDeleted(taskId: string, taskTitle: string, userId: string) {
    EventBus.publish(TaskEvent.DELETED, {
      taskId,
      title: taskTitle,
      deletedBy: userId,
      timestamp: new Date().toISOString(),
    });
  }

  static publishTaskDueDateApproaching(task: Task) {
    EventBus.publish(TaskEvent.DUE_DATE_APPROACHING, {
      taskId: task.id,
      title: task.title,
      dueDate: task.dueDate,
      assignee: task.assignee,
      timestamp: new Date().toISOString(),
    });
  }

  static publishChecklistItemCompleted(task: Task, itemId: string, userId: string) {
    const item = task.checklist?.find(item => item.id === itemId);
    if (!item) return;

    EventBus.publish(TaskEvent.CHECKLIST_ITEM_COMPLETED, {
      taskId: task.id,
      taskTitle: task.title,
      itemId,
      itemText: item.text,
      completedBy: userId,
      timestamp: new Date().toISOString(),
    });
  }
}

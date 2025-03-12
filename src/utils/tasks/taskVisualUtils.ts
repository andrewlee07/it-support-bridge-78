
import { TaskStatus, TaskPriority } from '../types/taskCore';
import { getStatusColor, getStatusIcon } from './taskStatusUtils';
import { getPriorityColor, getPriorityIcon } from './taskPriorityUtils';

/**
 * Gets visual properties for a task status
 */
export function getTaskStatusVisuals(status: TaskStatus) {
  return {
    color: getStatusColor(status),
    icon: getStatusIcon(status),
    label: status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  };
}

/**
 * Gets visual properties for a task priority
 */
export function getTaskPriorityVisuals(priority: TaskPriority) {
  return {
    color: getPriorityColor(priority),
    icon: getPriorityIcon(priority),
    label: priority.charAt(0).toUpperCase() + priority.slice(1)
  };
}

/**
 * Re-export the isTaskDueSoon function from taskCore
 */
export { isTaskDueSoon, isTaskOverdue } from '../types/taskCore';

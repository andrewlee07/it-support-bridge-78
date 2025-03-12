
import { TaskStatus, TaskPriority } from '../types/taskCore';
import { getStatusColor, getStatusIcon } from './taskStatusUtils';
import { getPriorityColor, getPriorityIcon } from './taskPriorityUtils';

/**
 * Gets visual properties for a task status
 */
export function getTaskStatusVisuals(status: TaskStatus) {
  const color = getStatusColor(status);
  return {
    color,
    icon: getStatusIcon(status),
    label: status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    // Add badge class based on status color
    badge: `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`,
    // Add hover background class for tables
    hoverBg: `hover:bg-${color}-50 dark:hover:bg-${color}-900/20`
  };
}

/**
 * Gets visual properties for a task priority
 */
export function getTaskPriorityVisuals(priority: TaskPriority) {
  const color = getPriorityColor(priority);
  return {
    color,
    icon: getPriorityIcon(priority),
    label: priority.charAt(0).toUpperCase() + priority.slice(1),
    // Add badge class based on priority color
    badge: `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`
  };
}

/**
 * Re-export the isTaskDueSoon function from taskCore
 */
export { isTaskDueSoon, isTaskOverdue } from '../types/taskCore';

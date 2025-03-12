
import { TaskPriority } from '../types/taskCore';

// Priority helpers
export function getPriorityName(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'Critical';
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Unknown';
  }
}

export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'red';
    case 'high':
      return 'orange';
    case 'medium':
      return 'blue';
    case 'low':
      return 'green';
    default:
      return 'gray';
  }
}

export function getPriorityIcon(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'alert-triangle';
    case 'high':
      return 'arrow-up';
    case 'medium':
      return 'minus';
    case 'low':
      return 'arrow-down';
    default:
      return 'help-circle';
  }
}

export function getPriorityValue(priority: TaskPriority): number {
  switch (priority) {
    case 'critical':
      return 4;
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 0;
  }
}

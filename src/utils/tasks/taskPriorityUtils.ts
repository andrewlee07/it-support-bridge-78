
import { TaskPriority } from '../types/taskCore';

export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-blue-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getPriorityTextColor(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'text-red-700';
    case 'high':
      return 'text-orange-700';
    case 'medium':
      return 'text-blue-700';
    case 'low':
      return 'text-green-700';
    default:
      return 'text-gray-700';
  }
}

export function getPriorityBgLightColor(priority: TaskPriority): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-100';
    case 'high':
      return 'bg-orange-100';
    case 'medium':
      return 'bg-blue-100';
    case 'low':
      return 'bg-green-100';
    default:
      return 'bg-gray-100';
  }
}

export function getPriorityDisplayName(priority: TaskPriority): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

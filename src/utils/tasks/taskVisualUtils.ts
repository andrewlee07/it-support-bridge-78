
import { TaskStatus, TaskPriority } from '../types/taskCore';

// Task status visual helpers
export function getTaskStatusVisuals(status: TaskStatus) {
  switch (status) {
    case 'new':
      return {
        badge: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        bgLight: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        hoverBg: 'hover:bg-blue-50',
      };
    case 'in-progress':
      return {
        badge: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        bgLight: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        hoverBg: 'hover:bg-yellow-50',
      };
    case 'on-hold':
      return {
        badge: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
        bgLight: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        hoverBg: 'hover:bg-purple-50',
      };
    case 'completed':
      return {
        badge: 'bg-green-100 text-green-800 hover:bg-green-200',
        bgLight: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        hoverBg: 'hover:bg-green-50',
      };
    case 'cancelled':
      return {
        badge: 'bg-red-100 text-red-800 hover:bg-red-200',
        bgLight: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        hoverBg: 'hover:bg-red-50',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        bgLight: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        hoverBg: 'hover:bg-gray-50',
      };
  }
}

// Task priority visual helpers
export function getTaskPriorityVisuals(priority: TaskPriority) {
  switch (priority) {
    case 'critical':
      return {
        badge: 'bg-red-100 text-red-800 hover:bg-red-200',
        bgLight: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        hoverBg: 'hover:bg-red-50',
      };
    case 'high':
      return {
        badge: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
        bgLight: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        hoverBg: 'hover:bg-orange-50',
      };
    case 'medium':
      return {
        badge: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        bgLight: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        hoverBg: 'hover:bg-blue-50',
      };
    case 'low':
      return {
        badge: 'bg-green-100 text-green-800 hover:bg-green-200',
        bgLight: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        hoverBg: 'hover:bg-green-50',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        bgLight: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        hoverBg: 'hover:bg-gray-50',
      };
  }
}

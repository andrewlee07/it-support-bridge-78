
import { TaskStatus } from '../types/taskCore';

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'bg-blue-500';
    case 'in-progress':
      return 'bg-yellow-500';
    case 'on-hold':
      return 'bg-purple-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export function getStatusTextColor(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'text-blue-700';
    case 'in-progress':
      return 'text-yellow-700';
    case 'on-hold':
      return 'text-purple-700';
    case 'completed':
      return 'text-green-700';
    case 'cancelled':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
}

export function getStatusBgLightColor(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'bg-blue-100';
    case 'in-progress':
      return 'bg-yellow-100';
    case 'on-hold':
      return 'bg-purple-100';
    case 'completed':
      return 'bg-green-100';
    case 'cancelled':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
}

export function getStatusDisplayName(status: TaskStatus): string {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'on-hold':
      return 'On Hold';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

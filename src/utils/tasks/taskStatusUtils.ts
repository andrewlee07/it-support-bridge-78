
import { TaskStatus } from '../types/taskCore';

// Status helpers
export function getStatusName(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'New';
    case 'in-progress':
      return 'In Progress';
    case 'on-hold':
      return 'On Hold';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'blue';
    case 'in-progress':
      return 'yellow';
    case 'on-hold':
      return 'purple';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
}

export function getStatusIcon(status: TaskStatus): string {
  switch (status) {
    case 'new':
      return 'circle';
    case 'in-progress':
      return 'play';
    case 'on-hold':
      return 'pause';
    case 'completed':
      return 'check-circle';
    case 'cancelled':
      return 'x-circle';
    default:
      return 'help-circle';
  }
}

export function getNextStatuses(currentStatus: TaskStatus): TaskStatus[] {
  switch (currentStatus) {
    case 'new':
      return ['in-progress', 'on-hold', 'cancelled'];
    case 'in-progress':
      return ['completed', 'on-hold', 'cancelled'];
    case 'on-hold':
      return ['in-progress', 'cancelled'];
    case 'completed':
      return ['in-progress'];
    case 'cancelled':
      return ['new'];
    default:
      return [];
  }
}

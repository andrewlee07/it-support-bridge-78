
// Task Management Types - Re-export from modularized files
export * from './taskCore';
export * from '../tasks/taskStatusUtils';
export * from '../tasks/taskPriorityUtils';

// Also export our new visual utility functions
export * from '../tasks/taskVisualUtils';

// Create aliases for backward compatibility
import { getStatusColor as getTaskStatusColor } from '../tasks/taskStatusUtils';
import { getPriorityColor as getTaskPriorityColor } from '../tasks/taskPriorityUtils';

export { getTaskStatusColor, getTaskPriorityColor };

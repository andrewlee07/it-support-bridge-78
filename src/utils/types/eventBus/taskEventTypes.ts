
/**
 * Task-specific event data types
 */

// Task-specific event data
export interface TaskEventData {
  taskId: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  assignee?: string;
  dueDate?: string;
  updatedFields?: string[];
}

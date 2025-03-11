
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
  previousAssignee?: string; // For task reassignment events
  dueDate?: string;
  updatedFields?: string[];
  completionDetails?: string; // For task completion events
  progress?: string; // For status change events
  escalation?: string; // For overdue tasks
  reminderDays?: number; // For due date approaching events
  createdBy?: string; // The person who created the task
  relatedItemId?: string; // ID of related item (incident, problem, etc.)
  relatedItemType?: string; // Type of related item
}

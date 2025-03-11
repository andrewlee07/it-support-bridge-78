
/**
 * Backlog Item event data types
 */

// Backlog Item event data
export interface BacklogItemEventData {
  backlogItemId: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  assignee?: string;
  creator?: string;
  sprintId?: string;
  sprintName?: string;
  labels?: string[];
  type?: string;
  storyPoints?: number;
  updatedFields?: string[];
  reason?: string;
  reviewInstructions?: string;
  implementationDetails?: string;
  completionDetails?: string;
}

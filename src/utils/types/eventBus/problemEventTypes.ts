
/**
 * Problem-specific event data types
 */

// Problem-specific event data
export interface ProblemEventData {
  problemId: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  affectedServices?: string[];
  relatedIncidents?: string[];
  assignee?: string;
  previousAssignee?: string;
  rootCause?: string;
  workaround?: string;
  resolution?: string;
  closureDetails?: string;
  updatedFields?: string[];
}

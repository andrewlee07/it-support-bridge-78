
/**
 * Problem-specific event data types
 */

// Problem-specific event data
export interface ProblemEventData {
  problemId: string;
  id: string; // Added for publisher compatibility
  title: string;
  description?: string;
  status: string;
  priority: string;
  severity?: string; // Added for publisher compatibility
  affectedServices?: string[];
  relatedIncidents?: string[];
  assignee?: string;
  previousAssignee?: string;
  rootCause?: string;
  workaround?: string;
  resolution?: string;
  closureDetails?: string;
  updatedFields?: string[];
  tenantId?: string; // Added for publisher compatibility
}

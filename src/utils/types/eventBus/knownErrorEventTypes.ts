
/**
 * Known Error Database event data types
 */

// Known Error Database event data
export interface KnownErrorEventData {
  knownErrorId: string;
  id: string; // Added for publisher compatibility
  title: string;
  description?: string;
  status: string;
  affectedServices?: string[];
  workaround?: string;
  previousWorkaround?: string;
  permanentFix?: string;
  scheduledFixDate?: string;
  resolution?: string;
  viewedBy?: string[];
  updatedFields?: string[];
  tenantId?: string; // Added for publisher compatibility
}

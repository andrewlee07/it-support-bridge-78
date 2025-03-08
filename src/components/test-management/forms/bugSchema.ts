
import * as z from 'zod';

// Convert enum-like types to zod enum schemas
const bugSeverityEnum = z.enum(['critical', 'major', 'minor', 'trivial', 'high', 'medium', 'low'] as const);
const bugPriorityEnum = z.enum(['high', 'medium', 'low', 'urgent'] as const);
const bugStatusEnum = z.enum([
  'open', 'in_progress', 'resolved', 'closed', 'fixed', 'verified', 'new', 'in-progress'
] as const);

// Form schema for bug report
export const bugSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  stepsToReproduce: z.array(z.string()).min(1, { message: 'At least one step is required.' }),
  severity: bugSeverityEnum,
  priority: bugPriorityEnum,
  status: bugStatusEnum,
  assignedDeveloper: z.string().optional(),
  relatedTestCase: z.string().optional(),
  attachment: z.string().optional(),
});

export type BugFormValues = z.infer<typeof bugSchema>;

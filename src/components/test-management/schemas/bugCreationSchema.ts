
import * as z from 'zod';

// Define the enums as values first
const BugSeverityEnum = {
  critical: 'critical',
  major: 'major',
  minor: 'minor',
  trivial: 'trivial',
  high: 'high',
  medium: 'medium',
  low: 'low'
} as const;

const BugPriorityEnum = {
  urgent: 'urgent',
  high: 'high',
  medium: 'medium',
  low: 'low'
} as const;

export const bugCreationSchema = z.object({
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  severity: z.enum(['critical', 'major', 'minor', 'trivial', 'high', 'medium', 'low']),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  createBacklogItem: z.boolean().default(true)
});

export type BugCreationFormValues = z.infer<typeof bugCreationSchema>;

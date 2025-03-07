
import * as z from 'zod';
import { BacklogItemStatus, BacklogItemPriority, BacklogItemType } from '@/utils/types/backlogTypes';

// Form schema for backlog item - ensuring all required fields are validated
export const backlogItemSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  status: z.enum(['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'] as [BacklogItemStatus, ...BacklogItemStatus[]]),
  priority: z.enum(['critical', 'high', 'medium', 'low'] as [BacklogItemPriority, ...BacklogItemPriority[]]),
  type: z.enum(['feature', 'bug', 'task', 'enhancement', 'technical-debt'] as [BacklogItemType, ...BacklogItemType[]]),
  assignee: z.string().optional(),
  releaseId: z.string().optional(),
  relatedItemId: z.string().optional(),
  relatedItemType: z.enum(['bug', 'testcase']).optional(),
  storyPoints: z.number().int().nonnegative().optional(),
  dueDate: z.date().optional(),
  labels: z.array(z.string()).default([]),
});

export type BacklogItemFormValues = z.infer<typeof backlogItemSchema>;

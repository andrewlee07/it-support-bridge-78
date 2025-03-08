
import * as z from 'zod';
import { BugSeverity, BugPriority } from '@/utils/types/test';

export const bugCreationSchema = z.object({
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  severity: z.nativeEnum(BugSeverity as any),
  priority: z.nativeEnum(BugPriority as any),
  createBacklogItem: z.boolean().default(true)
});

export type BugCreationFormValues = z.infer<typeof bugCreationSchema>;

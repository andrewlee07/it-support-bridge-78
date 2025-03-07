
import * as z from 'zod';

// Form schema for test case - ensuring all required fields are validated
export const testCaseSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  stepsToReproduce: z.array(z.string()).refine(steps => steps.some(step => step.trim() !== ''), {
    message: 'At least one non-empty step is required.',
  }),
  expectedResults: z.string().min(5, { message: 'Expected results must be at least 5 characters.' }),
  status: z.enum(['not-run', 'pass', 'fail', 'blocked', 'passed', 'failed', 'draft', 'ready']),
  assignedTester: z.string().optional(), // Optional but should default to the current user
  relatedRequirement: z.string().optional(),
});

export type TestCaseFormValues = z.infer<typeof testCaseSchema>;

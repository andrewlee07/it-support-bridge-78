
import * as z from 'zod';

export const testCycleSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  startDate: z.date(),
  endDate: z.date()
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be on or after the start date",
  path: ["endDate"]
});

export type TestCycleFormValues = z.infer<typeof testCycleSchema>;


import * as z from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
  status: z.enum(['active', 'draft', 'expired'], {
    required_error: "Status is required",
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    required_error: "Priority is required",
  }),
  type: z.enum(['outage', 'maintenance', 'information', 'other'], {
    required_error: "Type is required",
  }),
  expiresAt: z.string().optional(),
  relatedIncidentId: z.string().optional(),
  audienceGroups: z.array(z.string()).optional(),
});

export type AnnouncementFormValues = z.infer<typeof announcementSchema>;

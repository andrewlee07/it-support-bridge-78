
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Problem, ProblemStatus } from '@/utils/types/problem';

const updateSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  status: z.string(),
  priority: z.string(),
  category: z.string(),
  assignedTo: z.string().optional(),
  resolutionPlan: z.string().optional(),
  relatedIncidents: z.string().optional(),
  notes: z.string().optional(),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

interface ProblemUpdateFormProps {
  problem: Problem;
  onSubmit: (data: UpdateFormValues) => void;
  onCancel: () => void;
}

const ProblemUpdateForm: React.FC<ProblemUpdateFormProps> = ({
  problem,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      category: problem.category,
      assignedTo: problem.assignedTo || '',
      resolutionPlan: problem.resolutionPlan || '',
      relatedIncidents: problem.relatedIncidents?.join(', ') || '',
      notes: '',
    },
  });

  return (
    <div className="border p-4 rounded-md bg-muted/30">
      <h3 className="text-lg font-medium mb-4">Update Problem</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="under-investigation">Under Investigation</SelectItem>
                      <SelectItem value="root-cause-identified">Root Cause Identified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="P1">P1 - High</SelectItem>
                      <SelectItem value="P2">P2 - Medium</SelectItem>
                      <SelectItem value="P3">P3 - Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="access">Access</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    <SelectItem value="user-1">John Smith</SelectItem>
                    <SelectItem value="user-2">Alice Johnson</SelectItem>
                    <SelectItem value="user-3">Robert Chen</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resolutionPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution Plan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Steps to resolve the problem..."
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relatedIncidents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Incidents</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., INC00001, INC00002"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add notes about this update..."
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Update Problem
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProblemUpdateForm;

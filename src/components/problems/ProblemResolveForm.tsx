
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem } from '@/utils/types/problem';
import { AlertCircle } from 'lucide-react';

const resolveSchema = z.object({
  resolutionStatus: z.enum(['resolved', 'known-error']),
  rootCause: z.string().min(10, { message: 'Root cause must be at least 10 characters' }),
  resolutionDescription: z.string().min(10, { message: 'Resolution description must be at least 10 characters' }),
  closureNotes: z.string().optional(),
});

type ResolveFormValues = z.infer<typeof resolveSchema>;

interface ProblemResolveFormProps {
  problem: Problem;
  onSubmit: (data: ResolveFormValues) => void;
  onCancel: () => void;
}

const ProblemResolveForm: React.FC<ProblemResolveFormProps> = ({
  problem,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<ResolveFormValues>({
    resolver: zodResolver(resolveSchema),
    defaultValues: {
      resolutionStatus: 'resolved',
      rootCause: problem.rootCause || '',
      resolutionDescription: '',
      closureNotes: '',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
        <AlertCircle className="text-amber-500 mr-2 h-5 w-5" />
        <div>
          <span className="font-medium">Resolving the problem</span>
          <p className="text-sm text-muted-foreground mt-1">
            You are about to resolve this problem. This will mark the problem as resolved or a known error.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resolve Problem</CardTitle>
          <CardDescription>
            Provide details about the resolution of this problem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="resolutionStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution Status*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="known-error">Known Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select whether the problem is resolved or a known error.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rootCause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Root Cause*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the underlying cause of the problem..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed explanation of what caused the problem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resolutionDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe how the problem was fixed or why it's a known error..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain how the problem was fixed or why it's being documented as a known error.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closureNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closure Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information about the resolution..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Any additional information about the resolution.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  Resolve Problem
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemResolveForm;

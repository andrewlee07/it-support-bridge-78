
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem } from '@/utils/types/problem';
import { Database } from 'lucide-react';

const knownErrorSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  symptoms: z.string().min(10, { message: 'Symptoms must be at least 10 characters' }),
  workaround: z.string().min(10, { message: 'Workaround must be at least 10 characters' }),
  affectedServices: z.string().optional(),
});

type KnownErrorFormValues = z.infer<typeof knownErrorSchema>;

interface KnownErrorFormProps {
  problem: Problem;
  onSubmit: (data: KnownErrorFormValues) => void;
  onCancel: () => void;
}

const KnownErrorForm: React.FC<KnownErrorFormProps> = ({
  problem,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<KnownErrorFormValues>({
    resolver: zodResolver(knownErrorSchema),
    defaultValues: {
      title: problem.title,
      description: problem.description,
      symptoms: '',
      workaround: problem.workaround || '',
      affectedServices: '',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-md">
        <Database className="text-amber-500 mr-3 h-6 w-6" />
        <div>
          <h3 className="font-medium">Creating a Known Error</h3>
          <p className="text-sm text-muted-foreground mt-1">
            A Known Error is a problem with a documented workaround. This will be added to the Known Error Database
            for reference by support staff when handling related incidents.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Known Error</CardTitle>
          <CardDescription>
            Document the problem and its workaround for the Known Error Database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      A concise title for the known error.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the known error in detail..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed explanation of the known error.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What symptoms would a user or technician observe..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the symptoms that indicate this known error.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workaround"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workaround*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Step-by-step instructions for the workaround..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed instructions for the temporary workaround.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="affectedServices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affected Services</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Email, CRM, Finance System"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List the services affected by this known error, separated by commas.
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
                  Create Known Error
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnownErrorForm;

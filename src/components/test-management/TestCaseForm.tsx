
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TestCase, TestStatus } from '@/utils/types/testTypes';
import { createTestCase, updateTestCase } from '@/utils/mockData/testData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Form schema for test case - ensuring all required fields are validated
const testCaseSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  stepsToReproduce: z.array(z.string()).refine(steps => steps.some(step => step.trim() !== ''), {
    message: 'At least one non-empty step is required.',
  }),
  expectedResults: z.string().min(5, { message: 'Expected results must be at least 5 characters.' }),
  status: z.enum(['not-run', 'pass', 'fail', 'blocked']),
  assignedTester: z.string().optional(), // Optional but should default to the current user
  relatedRequirement: z.string().optional(),
});

type TestCaseFormValues = z.infer<typeof testCaseSchema>;

interface TestCaseFormProps {
  initialData?: Partial<TestCase>;
  onSuccess?: (testCase: TestCase) => void;
  onCancel?: () => void;
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Initialize form with default values
  const form = useForm<TestCaseFormValues>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      stepsToReproduce: initialData?.stepsToReproduce?.length ? initialData.stepsToReproduce : [''],
      expectedResults: initialData?.expectedResults || '',
      status: initialData?.status || 'not-run',
      assignedTester: initialData?.assignedTester || user?.id || '',
      relatedRequirement: initialData?.relatedRequirement || '',
    },
  });

  // Get steps from form
  const steps = form.watch('stepsToReproduce');

  // Add a new step
  const addStep = () => {
    const currentSteps = form.getValues('stepsToReproduce');
    form.setValue('stepsToReproduce', [...currentSteps, '']);
  };

  // Remove a step
  const removeStep = (index: number) => {
    const currentSteps = form.getValues('stepsToReproduce');
    if (currentSteps.length <= 1) return;
    
    const newSteps = currentSteps.filter((_, i) => i !== index);
    form.setValue('stepsToReproduce', newSteps);
  };

  const onSubmit = async (data: TestCaseFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to create or update test cases.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Filter out empty steps
      const filteredSteps = data.stepsToReproduce.filter(step => step.trim() !== '');
      if (filteredSteps.length === 0) {
        form.setError('stepsToReproduce', {
          type: 'manual',
          message: 'At least one non-empty step is required.',
        });
        setLoading(false);
        return;
      }

      // Prepare the data to submit
      const testCaseData = {
        ...data,
        stepsToReproduce: filteredSteps,
        // Ensure assignedTester is set - default to current user if not specified
        assignedTester: data.assignedTester || user.id,
      };

      let result;
      if (initialData?.id) {
        // Update existing test case
        result = await updateTestCase(initialData.id, testCaseData);
      } else {
        // Create new test case
        result = await createTestCase(testCaseData);
      }

      if (result.success) {
        toast({
          title: `Test case ${initialData?.id ? 'updated' : 'created'} successfully`,
          description: `Test case "${data.title}" has been ${initialData?.id ? 'updated' : 'created'}.`,
        });
        if (onSuccess) onSuccess(result.data as TestCase);
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${initialData?.id ? 'update' : 'create'} test case.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Edit Test Case' : 'Create New Test Case'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter test case title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose of this test case" 
                      className="min-h-24" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Steps to Reproduce</FormLabel>
              {steps.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`stepsToReproduce.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder={`Step ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeStep(index)}
                          disabled={steps.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStep}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Step
              </Button>
              {/* Show form error for steps if any */}
              {form.formState.errors.stepsToReproduce && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.stepsToReproduce.message}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="expectedResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Results</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What should happen when the test is executed correctly"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not-run">Not Run</SelectItem>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relatedRequirement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Requirement/User Story (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., REQ-001 or US-123"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : initialData?.id ? 'Update Test Case' : 'Create Test Case'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TestCaseForm;

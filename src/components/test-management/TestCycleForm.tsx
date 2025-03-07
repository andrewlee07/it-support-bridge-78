
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
import { TestCycle } from '@/utils/types/testTypes';
import { createTestCycle, fetchTestCases } from '@/utils/mockData/testData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Form schema for test cycle
const testCycleSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  releaseId: z.string().optional(),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  status: z.enum(['planned', 'in-progress', 'completed']),
  testCases: z.array(z.string()).min(1, { message: 'At least one test case is required.' }),
});

type TestCycleFormValues = z.infer<typeof testCycleSchema>;

interface TestCycleFormProps {
  initialData?: Partial<TestCycle>;
  onSuccess?: (testCycle: TestCycle) => void;
  onCancel?: () => void;
}

const TestCycleForm: React.FC<TestCycleFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Fetch test cases for the selection
  const { data: testCasesResponse } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  // Initialize form with default values
  const form = useForm<TestCycleFormValues>({
    resolver: zodResolver(testCycleSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      releaseId: initialData?.releaseId || '',
      startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
      endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(new Date().setDate(new Date().getDate() + 14)),
      status: initialData?.status || 'planned',
      testCases: initialData?.testCases || [],
    },
  });

  const onSubmit = async (data: TestCycleFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to create test cycles.',
        variant: 'destructive',
      });
      return;
    }

    // Validate dates
    if (data.endDate < data.startDate) {
      form.setError('endDate', {
        type: 'manual',
        message: 'End date cannot be before start date.',
      });
      return;
    }

    setLoading(true);
    try {
      let result;
      if (initialData?.id) {
        // Update logic would go here
        toast({
          title: 'Not implemented',
          description: 'Updating test cycles is not yet implemented.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      } else {
        // Create new test cycle with all required fields
        result = await createTestCycle({
          name: data.name,
          description: data.description,
          releaseId: data.releaseId,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
          testCases: data.testCases,
        });
      }

      if (result.success) {
        toast({
          title: `Test cycle ${initialData?.id ? 'updated' : 'created'} successfully`,
          description: `Test cycle "${data.name}" has been ${initialData?.id ? 'updated' : 'created'}.`,
        });
        if (onSuccess) onSuccess(result.data as TestCycle);
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${initialData?.id ? 'update' : 'create'} test cycle.`,
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

  // Helper to check if a test case is selected
  const isTestCaseSelected = (id: string) => {
    return form.watch('testCases').includes(id);
  };

  // Toggle test case selection
  const toggleTestCase = (id: string) => {
    const currentTestCases = form.watch('testCases');
    if (currentTestCases.includes(id)) {
      form.setValue('testCases', currentTestCases.filter(tcId => tcId !== id));
    } else {
      form.setValue('testCases', [...currentTestCases, id]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Edit Test Cycle' : 'Create New Test Cycle'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cycle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter test cycle name" {...field} />
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
                      placeholder="Describe the purpose of this test cycle" 
                      className="min-h-24" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Release (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., REL-001"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="testCases"
              render={() => (
                <FormItem>
                  <FormLabel>Test Cases</FormLabel>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Select test cases to include:</p>
                        <div className="text-sm text-muted-foreground">
                          {form.watch('testCases').length} selected
                        </div>
                      </div>
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {testCasesResponse?.data?.map((testCase) => (
                            <div 
                              key={testCase.id} 
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                            >
                              <Checkbox
                                id={`tc-${testCase.id}`}
                                checked={isTestCaseSelected(testCase.id)}
                                onCheckedChange={() => toggleTestCase(testCase.id)}
                              />
                              <label
                                htmlFor={`tc-${testCase.id}`}
                                className="flex-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {testCase.title}
                                <div className="flex items-center mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className={cn(
                                      "text-xs",
                                      testCase.status === 'pass' && "bg-green-50 text-green-700",
                                      testCase.status === 'fail' && "bg-red-50 text-red-700",
                                      testCase.status === 'blocked' && "bg-yellow-50 text-yellow-700",
                                      testCase.status === 'not-run' && "bg-gray-50 text-gray-700"
                                    )}
                                  >
                                    {testCase.status}
                                  </Badge>
                                </div>
                              </label>
                            </div>
                          ))}
                          {!testCasesResponse?.data?.length && (
                            <div className="text-center py-4 text-muted-foreground">
                              No test cases available
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
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
                {loading ? 'Saving...' : initialData?.id ? 'Update Test Cycle' : 'Create Test Cycle'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TestCycleForm;

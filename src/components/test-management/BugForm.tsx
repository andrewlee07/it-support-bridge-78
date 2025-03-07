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
import { Bug, BugStatus } from '@/utils/types/testTypes';
import { createBug, updateBug, fetchTestCases } from '@/utils/mockData/testData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

// Form schema for bug report
const bugSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  stepsToReproduce: z.array(z.string()).min(1, { message: 'At least one step is required.' }),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed', 'fixed', 'verified', 'new', 'in-progress']),
  assignedDeveloper: z.string().optional(),
  relatedTestCase: z.string().optional(),
  attachment: z.string().optional(),
});

type BugFormValues = z.infer<typeof bugSchema>;

interface BugFormProps {
  initialData?: Partial<Bug>;
  onSuccess?: (bug: Bug) => void;
  onCancel?: () => void;
}

const BugForm: React.FC<BugFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(initialData?.attachment || null);

  // Fetch test cases for dropdown
  const { data: testCasesResponse } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  // Initialize form with default values
  const form = useForm<BugFormValues>({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      stepsToReproduce: initialData?.stepsToReproduce || [''],
      severity: initialData?.severity || 'medium',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'new',
      assignedDeveloper: initialData?.assignedDeveloper || '',
      relatedTestCase: initialData?.relatedTestCase || '',
      attachment: initialData?.attachment || '',
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

  // Handle file upload (mock for now)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or cloud storage
      // For now, we'll just use a placeholder URL
      setFileUrl('/lovable-uploads/bf3633e2-5031-4a59-ab35-ffd5b863fbfc.png');
      form.setValue('attachment', '/lovable-uploads/bf3633e2-5031-4a59-ab35-ffd5b863fbfc.png');
      toast({
        title: 'File uploaded',
        description: 'Screenshot has been uploaded successfully.',
      });
    }
  };

  const onSubmit = async (data: BugFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to report bugs.',
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
          message: 'At least one step is required.',
        });
        setLoading(false);
        return;
      }

      data.stepsToReproduce = filteredSteps;

      let result;
      if (initialData?.id) {
        // Update existing bug
        result = await updateBug(initialData.id, {
          title: data.title,
          description: data.description,
          stepsToReproduce: data.stepsToReproduce,
          severity: data.severity,
          priority: data.priority,
          status: data.status as BugStatus,
          assignedTo: data.assignedDeveloper,
          relatedTestCase: data.relatedTestCase,
          attachment: data.attachment,
        });
      } else {
        // Create new bug - pass the user ID for createdBy and ensure all required fields
        result = await createBug({
          title: data.title,
          description: data.description,
          stepsToReproduce: data.stepsToReproduce,
          severity: data.severity,
          priority: data.priority,
          status: data.status as BugStatus,
          assignedTo: data.assignedDeveloper || '',
          relatedTestCase: data.relatedTestCase || '',
          attachment: data.attachment || '',
          reportedBy: user.id,
          createdBy: user.id,
        });
      }

      if (result.success) {
        toast({
          title: `Bug ${initialData?.id ? 'updated' : 'reported'} successfully`,
          description: `Bug "${data.title}" has been ${initialData?.id ? 'updated' : 'reported'}.`,
        });
        if (onSuccess) onSuccess(result.data as Bug);
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${initialData?.id ? 'update' : 'report'} bug.`,
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
        <CardTitle>{initialData?.id ? 'Edit Bug' : 'Report Bug'}</CardTitle>
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
                    <Input placeholder="Enter bug title" {...field} />
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
                      placeholder="Describe the bug in detail" 
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relatedTestCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Test Case (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select related test case" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {testCasesResponse?.data?.map((testCase) => (
                        <SelectItem key={testCase.id} value={testCase.id}>
                          {testCase.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Attachment (Screenshot)</FormLabel>
              <div className="mt-2 space-y-4">
                {fileUrl ? (
                  <div className="rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={fileUrl} 
                        alt="Bug screenshot" 
                        className="h-20 w-auto object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Screenshot</p>
                        <p className="text-xs text-muted-foreground">
                          Click to view full size
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFileUrl(null)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or GIF (max. 2MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : initialData?.id ? 'Update Bug' : 'Report Bug'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BugForm;

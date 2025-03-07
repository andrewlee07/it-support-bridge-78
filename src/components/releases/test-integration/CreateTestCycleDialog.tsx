
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createTestCycleForRelease } from '@/utils/api/testReleaseApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import FormActions from '@/components/backlog/form-fields/FormActions';

const testCycleSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  startDate: z.date(),
  endDate: z.date()
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be on or after the start date",
  path: ["endDate"]
});

type TestCycleFormValues = z.infer<typeof testCycleSchema>;

interface CreateTestCycleDialogProps {
  releaseId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateTestCycleDialog: React.FC<CreateTestCycleDialogProps> = ({ 
  releaseId, 
  isOpen, 
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TestCycleFormValues>({
    resolver: zodResolver(testCycleSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 14)) // Default to 2 weeks
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: TestCycleFormValues) => {
      if (!user) throw new Error('User not authenticated');
      
      // Ensure all required properties are included
      const response = await createTestCycleForRelease(releaseId, {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'planned',
        testCases: [],
        createdBy: user.id
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create test cycle');
      }
      
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Test Cycle Created',
        description: 'The test cycle has been created successfully.'
      });
      
      // Reset form
      form.reset();
      
      // Close the dialog
      onClose();
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['testCycles', releaseId] });
      queryClient.invalidateQueries({ queryKey: ['testCoverage', releaseId] });
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create test cycle',
        variant: 'destructive'
      });
    }
  });

  const onSubmit = (data: TestCycleFormValues) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create Test Cycle</DialogTitle>
          <DialogDescription>
            Create a new test cycle for this release.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Cycle Name</FormLabel>
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
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
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
                            variant="outline"
                            className="pl-3 text-left font-normal flex justify-between items-center"
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="h-4 w-4" />
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
                            variant="outline"
                            className="pl-3 text-left font-normal flex justify-between items-center"
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < form.getValues().startDate}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormActions
              loading={createMutation.isPending}
              onCancel={onClose}
              submitLabel="Create Test Cycle"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestCycleDialog;

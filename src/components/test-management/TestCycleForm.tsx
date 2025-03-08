import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { createTestCycle } from '@/utils/api/testReleaseApi';
import { TestCycle } from '@/utils/types/testTypes';

// Define the form schema
const testCycleSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  startDate: z.date(),
  endDate: z.date(),
});

type TestCycleFormValues = z.infer<typeof testCycleSchema>;

interface TestCycleFormProps {
  releaseId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const TestCycleForm: React.FC<TestCycleFormProps> = ({ releaseId, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  // Initialize the form with default values
  const form = useForm<TestCycleFormValues>({
    resolver: zodResolver(testCycleSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  });

  const onSubmit = async (data: TestCycleFormValues) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Creating test cycle with all required properties including createdBy
      const testCycleData = {
        name: data.name,
        description: data.description,
        releaseId,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'planned' as const,
        testCases: [],
        createdBy: user.id, // Add the createdBy property using the current user's ID
      };
      
      const response = await createTestCycle(testCycleData);
      
      if (response.success) {
        onSuccess();
      } else {
        console.error('Failed to create test cycle:', response.error);
      }
    } catch (error) {
      console.error('Error creating test cycle:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="Test Cycle Name" {...form.register('name')} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Test Cycle Description" {...form.register('description')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={
                  format(form.getValues('startDate'), 'PPP')
                    ? 'justify-start'
                    : 'justify-start text-muted-foreground'
                }
              >
                {format(form.getValues('startDate'), 'PPP') ? (
                  format(form.getValues('startDate'), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.getValues('startDate')}
                onSelect={(date) => form.setValue('startDate', date)}
                disabled={(date) => date > form.getValues('endDate')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={
                  format(form.getValues('endDate'), 'PPP')
                    ? 'justify-start'
                    : 'justify-start text-muted-foreground'
                }
              >
                {format(form.getValues('endDate'), 'PPP') ? (
                  format(form.getValues('endDate'), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.getValues('endDate')}
                onSelect={(date) => form.setValue('endDate', date)}
                disabled={(date) => date < form.getValues('startDate')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Test Cycle'}
        </Button>
      </div>
    </form>
  );
};

export default TestCycleForm;


import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
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
import StepsSection from './StepsSection';
import { TestCaseFormValues } from './testCaseSchema';

const TestCaseFormFields: React.FC = () => {
  const form = useFormContext<TestCaseFormValues>();
  const steps = form.watch('stepsToReproduce');

  return (
    <div className="space-y-6">
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

      <StepsSection steps={steps} />

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
                {/* We only expose the main statuses in the UI but support all possible values in the schema */}
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
    </div>
  );
};

export default TestCaseFormFields;

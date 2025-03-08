
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import StepsSection from './StepsSection';
import { useTestCaseStatus } from '../hooks/useTestCaseStatus';

const TestCaseFormFields = () => {
  const form = useFormContext();
  const { testStatuses } = useTestCaseStatus();

  return (
    <>
      <div className="grid gap-6 mb-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Verify user login" {...field} />
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
                  placeholder="Add a detailed description of the test case..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 mb-6">
        <StepsSection 
          steps={form.getValues('stepsToReproduce') || ['']} 
        />

        <FormField
          control={form.control}
          name="expectedResults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Results</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What should happen when the test is executed correctly..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {testStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Tester</FormLabel>
              <FormControl>
                <Input placeholder="Assigned tester" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <FormField
          control={form.control}
          name="relatedRequirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Requirement</FormLabel>
              <FormControl>
                <Input placeholder="Requirement ID or name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applicable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Applicable for Release</FormLabel>
                <FormDescription>
                  Is this test case applicable for the current release?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default TestCaseFormFields;

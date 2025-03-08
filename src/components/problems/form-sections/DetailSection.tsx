
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DetailSectionProps {
  form: UseFormReturn<any>;
}

const DetailSection: React.FC<DetailSectionProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

export default DetailSection;

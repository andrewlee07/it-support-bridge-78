
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BacklogItemFormValues } from '../forms/backlogItemSchema';
import { Release } from '@/utils/api/release/types';

interface AssignmentFieldsProps {
  form: UseFormReturn<BacklogItemFormValues>;
  releases: Release[];
}

const AssignmentFields: React.FC<AssignmentFieldsProps> = ({ form, releases }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="assignee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assignee</FormLabel>
            <FormControl>
              <Input placeholder="User assigned to this item" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="releaseId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Release</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || "none"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a release" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {releases.map((release) => (
                  <SelectItem key={release.id} value={release.id}>
                    {release.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AssignmentFields;

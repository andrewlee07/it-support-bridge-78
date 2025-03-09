
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DetailSectionProps {
  form: UseFormReturn<any>;
}

const DetailSection: React.FC<DetailSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="assignedTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assigned To</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value || "unassigned"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="john.doe">John Doe</SelectItem>
                  <SelectItem value="jane.smith">Jane Smith</SelectItem>
                  <SelectItem value="alex.kumar">Alex Kumar</SelectItem>
                  <SelectItem value="maria.garcia">Maria Garcia</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value || "software"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
            <FormLabel>Related Incidents (comma separated)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="INC00001, INC00002" />
            </FormControl>
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
                {...field}
                placeholder="Describe the plan to resolve this problem"
                className="min-h-[100px]"
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
                {...field}
                placeholder="Add notes about this update"
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailSection;

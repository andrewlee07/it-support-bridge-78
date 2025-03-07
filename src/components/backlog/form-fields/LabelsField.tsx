
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Tag as TagIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BacklogItemFormValues } from '../forms/backlogItemSchema';
import TagInput from '@/components/shared/TagInput';

interface LabelsFieldProps {
  form: UseFormReturn<BacklogItemFormValues>;
}

const LabelsField: React.FC<LabelsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="labels"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Labels</FormLabel>
          <FormControl>
            <TagInput 
              value={field.value || []} 
              onChange={field.onChange}
              placeholder="Type and press Enter to add labels"
              maxTags={10}
              maxLength={30}
              icon={<TagIcon className="h-3 w-3" />}
            />
          </FormControl>
          <FormMessage />
          <p className="text-xs text-muted-foreground mt-1">
            Add labels to categorize this item. Press Enter after each label (max 30 characters per label).
          </p>
        </FormItem>
      )}
    />
  );
};

export default LabelsField;


import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/utils/types';

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
  isFieldRequired: (fieldName: string) => boolean;
  type: 'incident' | 'service';
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form,
  isFieldRequired,
  type
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        rules={{ required: isFieldRequired('title') ? 'Title is required' : false }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{isFieldRequired('title') && <span className="text-red-500 mr-1">*</span>}Title</FormLabel>
            <FormControl>
              <Input 
                placeholder={type === 'incident' ? "e.g., Can't access email" : "e.g., Request new software"} 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Provide a brief summary of your {type}.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        rules={{ required: isFieldRequired('description') ? 'Description is required' : false }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{isFieldRequired('description') && <span className="text-red-500 mr-1">*</span>}Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={type === 'incident' ? "Describe what's happening..." : "Describe what you need..."} 
                className="min-h-32"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Please provide as much detail as possible.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoSection;

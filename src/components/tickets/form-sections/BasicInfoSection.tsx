
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
import { TicketType } from '@/utils/types';

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
  isFieldRequired: (fieldName: string) => boolean;
  type: TicketType;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form,
  isFieldRequired,
  type
}) => {
  // Helper to get placeholder text based on ticket type
  const getTitlePlaceholder = () => {
    switch (type) {
      case 'incident':
        return "e.g., Can't access email";
      case 'service':
        return "e.g., Request new software";
      case 'change':
        return "e.g., Upgrade database server";
      default:
        return "Enter a title";
    }
  };

  const getDescriptionPlaceholder = () => {
    switch (type) {
      case 'incident':
        return "Describe what's happening...";
      case 'service':
        return "Describe what you need...";
      case 'change':
        return "Describe the change requested...";
      default:
        return "Enter a description";
    }
  };

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
                placeholder={getTitlePlaceholder()} 
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
                placeholder={getDescriptionPlaceholder()} 
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

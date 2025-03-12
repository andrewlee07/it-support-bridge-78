
import React, { useEffect, useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';
import { getTicketById } from '@/utils/mockData/tickets';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

interface RelatedItemSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const RelatedItemSection: React.FC<RelatedItemSectionProps> = ({ form }) => {
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const relatedItemType = form.watch('relatedItemType');
  const relatedItemId = form.watch('relatedItemId');
  
  // Reset the item ID when type changes
  useEffect(() => {
    if (relatedItemType && form.getValues('relatedItemId')) {
      form.setValue('relatedItemId', '');
      setValidationMessage(null);
    }
  }, [relatedItemType, form]);
  
  // Validate the related item exists
  const validateRelatedItem = async () => {
    if (!relatedItemId || !relatedItemType) {
      setValidationMessage(null);
      return;
    }
    
    setIsValidating(true);
    
    try {
      // For incidents and service requests, check if they exist
      if (relatedItemType === 'incident' || relatedItemType === 'service-request') {
        const ticket = getTicketById(relatedItemId);
        
        if (ticket) {
          const correctType = ticket.type === (relatedItemType === 'incident' ? 'incident' : 'service');
          
          if (correctType) {
            setValidationMessage(`Found: ${ticket.title}`);
            toast.success(`Related ${relatedItemType} found`);
          } else {
            setValidationMessage(`Error: ID exists but is not a ${relatedItemType}`);
            toast.error(`ID exists but is not a ${relatedItemType}`);
          }
        } else {
          setValidationMessage(`Error: ${relatedItemType} not found`);
          toast.error(`${relatedItemType} not found`);
        }
      } 
      // For tasks, we'd do a similar check (simplified for demo)
      else if (relatedItemType === 'task') {
        if (relatedItemId.startsWith('TSK')) {
          setValidationMessage(`Task reference accepted`);
          toast.success('Task reference accepted');
        } else {
          setValidationMessage(`Task IDs should start with TSK`);
          toast.error('Invalid task ID format');
        }
      }
    } catch (error) {
      console.error('Error validating related item:', error);
      setValidationMessage('Error checking related item');
      toast.error('Failed to validate related item');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="relatedItemType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Related Item Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select related item type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="service-request">Service Request</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Select what type of item this task relates to
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="relatedItemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Item ID</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder={relatedItemType === 'incident' ? "INC00001" : 
                                relatedItemType === 'service-request' ? "SR00001" : 
                                relatedItemType === 'task' ? "TSK00001" : 
                                "ID of the related item"} 
                    {...field} 
                    disabled={!relatedItemType}
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={validateRelatedItem}
                  disabled={!relatedItemId || !relatedItemType || isValidating}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {validationMessage && (
                <p className={`text-sm mt-1 ${validationMessage.startsWith('Error') ? 'text-destructive' : 'text-green-600'}`}>
                  {validationMessage}
                </p>
              )}
              <FormDescription>
                Enter the ID of the related item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RelatedItemSection;

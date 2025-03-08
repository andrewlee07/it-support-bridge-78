
import React, { useState, useEffect } from 'react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Ticket, TicketPriority, TicketType, TicketCategory } from '@/utils/types';
import { toast } from 'sonner';
import { getMandatoryFieldsConfig } from '@/api/statusSynchronization';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface TicketFormProps {
  onSubmit: (data: Partial<Ticket>) => void;
  type: TicketType;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mandatoryFields, setMandatoryFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultValues = {
    title: '',
    description: '',
    category: '' as TicketCategory,
    priority: 'P3' as TicketPriority, // Default to P3 (medium priority)
    type: type,
  };
  
  const form = useForm({ defaultValues });
  
  // Fetch mandatory fields when component mounts
  useEffect(() => {
    const fetchMandatoryFields = async () => {
      setIsLoading(true);
      try {
        // Map ticket type to entity type
        const entityType = type === 'incident' ? 'incident' : 'service-request';
        const fields = await getMandatoryFieldsConfig(entityType);
        
        // Extract field names of required fields
        const requiredFields = fields
          .filter(field => field.isRequired)
          .map(field => field.fieldName);
        
        setMandatoryFields(requiredFields);
      } catch (error) {
        console.error('Failed to fetch mandatory fields:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMandatoryFields();
  }, [type]);
  
  const handleSubmit = async (data: Partial<Ticket>) => {
    setIsSubmitting(true);
    try {
      // Check for mandatory fields
      const missingFields = mandatoryFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        // Format field names for display
        const formattedFields = missingFields
          .map(field => field.charAt(0).toUpperCase() + field.slice(1))
          .join(', ');
        
        toast.error(`Please complete all required fields: ${formattedFields}`);
        setIsSubmitting(false);
        return;
      }
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(data);
      form.reset();
      toast.success(`Your ${type} has been submitted successfully`);
    } catch (error) {
      toast.error(`Failed to submit ${type}. Please try again.`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show which fields are mandatory
  const isFieldRequired = (fieldName: string) => mandatoryFields.includes(fieldName);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        {isLoading && (
          <div className="py-2">
            <p className="text-muted-foreground">Loading form configuration...</p>
          </div>
        )}
        
        {!isLoading && mandatoryFields.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fields marked with * are mandatory and must be completed.
            </AlertDescription>
          </Alert>
        )}
        
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            rules={{ required: isFieldRequired('category') ? 'Category is required' : false }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isFieldRequired('category') && <span className="text-red-500 mr-1">*</span>}Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the category that best fits your {type}.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            rules={{ required: isFieldRequired('priority') ? 'Priority is required' : false }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isFieldRequired('priority') && <span className="text-red-500 mr-1">*</span>}Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="P1">P1 - Critical</SelectItem>
                    <SelectItem value="P2">P2 - High</SelectItem>
                    <SelectItem value="P3">P3 - Medium</SelectItem>
                    <SelectItem value="P4">P4 - Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the priority level of your {type}.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : `Submit ${type === 'incident' ? 'Incident' : 'Request'}`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TicketForm;

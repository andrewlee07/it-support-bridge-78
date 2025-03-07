
import React, { useState } from 'react';
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

interface TicketFormProps {
  onSubmit: (data: Partial<Ticket>) => void;
  type: TicketType;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues = {
    title: '',
    description: '',
    category: '' as TicketCategory,
    priority: 'medium' as TicketPriority,
    type: type,
  };
  
  const form = useForm({ defaultValues });
  
  const handleSubmit = async (data: Partial<Ticket>) => {
    setIsSubmitting(true);
    try {
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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="title"
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
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

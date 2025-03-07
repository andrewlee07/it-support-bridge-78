
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SLA, TicketPriority, TicketType } from '@/utils/types';
import { toast } from 'sonner';

interface SLAFormProps {
  initialData?: SLA;
  onSubmit: (data: Partial<SLA>) => void;
  onCancel: () => void;
}

const SLAForm: React.FC<SLAFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const isEditing = !!initialData;
  
  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '',
    ticketType: initialData?.ticketType || 'incident' as TicketType,
    priorityLevel: initialData?.priorityLevel || 'P3' as TicketPriority,
    responseTimeHours: initialData?.responseTimeHours || 4,
    resolutionTimeHours: initialData?.resolutionTimeHours || 8,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  };

  const form = useForm({ defaultValues });
  
  const handleSubmit = async (data: Partial<SLA>) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(data);
      toast.success(isEditing ? "SLA updated successfully" : "SLA created successfully");
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} SLA. Please try again.`);
      console.error(error);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., P1 Incident SLA" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a descriptive name for this SLA
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
                  placeholder="Describe the purpose of this SLA..." 
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Describe when and how this SLA should be applied
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="ticketType"
            rules={{ required: 'Ticket type is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a ticket type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="incident">Incident</SelectItem>
                    <SelectItem value="service">Service Request</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The type of ticket this SLA applies to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priorityLevel"
            rules={{ required: 'Priority is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
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
                  The priority level this SLA applies to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="responseTimeHours"
            rules={{ 
              required: 'Response time is required',
              min: { value: 0.1, message: 'Minimum response time is 0.1 hours (6 minutes)' }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Response Time (hours)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0.1"
                    step="0.1"
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Target time to first response
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="resolutionTimeHours"
            rules={{ 
              required: 'Resolution time is required',
              min: { value: 0.5, message: 'Minimum resolution time is 0.5 hours (30 minutes)' }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution Time (hours)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0.5"
                    step="0.5"
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Target time to resolution
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update SLA' : 'Create SLA'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SLAForm;

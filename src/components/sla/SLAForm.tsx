
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
import { SLA, TicketPriority } from '@/utils/types';
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
    priorityLevel: initialData?.priorityLevel || 'medium' as TicketPriority,
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
                  placeholder="e.g., High Priority SLA" 
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The priority level this SLA applies to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="responseTimeHours"
            rules={{ 
              required: 'Response time is required',
              min: { value: 1, message: 'Minimum response time is 1 hour' }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Response Time (hours)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
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
              min: { value: 1, message: 'Minimum resolution time is 1 hour' }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution Time (hours)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
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

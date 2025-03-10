
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ProblemPriority } from '@/utils/types/problem';
import AssetServiceSection from '@/components/tickets/form-sections/AssetServiceSection';
import { getAllServices } from '@/utils/mockData/services';

const problemSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string(),
  priority: z.string(),
  relatedIncidents: z.string().optional(),
  resolutionPlan: z.string().optional(),
  associatedAssets: z.array(z.string()).optional(),
  serviceId: z.string().optional()
});

type ProblemFormValues = z.infer<typeof problemSchema>;

interface ProblemFormProps {
  onSubmit: (data: ProblemFormValues) => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: 'P2',
      relatedIncidents: '',
      resolutionPlan: '',
      associatedAssets: [],
      serviceId: ''
    }
  });

  useEffect(() => {
    const fetchServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    
    fetchServices();
  }, []);

  const handleSubmit = async (data: ProblemFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(data);
      form.reset();
      toast.success('Problem record has been created successfully');
    } catch (error) {
      toast.error('Failed to create problem record. Please try again.');
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Recurring network outages in Building B" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a concise description of the problem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the problem in detail..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a detailed explanation of the problem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
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
                  Select the category that best fits the problem.
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
                <FormLabel>Priority*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="P1">P1 - High</SelectItem>
                    <SelectItem value="P2">P2 - Medium</SelectItem>
                    <SelectItem value="P3">P3 - Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the priority level of the problem.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Associated Service</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an associated service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a service associated with this problem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="relatedIncidents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Incidents</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., INC00001, INC00002" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Enter incident IDs separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Add Asset Service Section */}
        <AssetServiceSection form={form} type="problem" />
        
        <FormField
          control={form.control}
          name="resolutionPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolution Plan</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Initial plan to resolve the problem..." 
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Describe the initial steps to investigate and resolve the problem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Problem Record'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProblemForm;

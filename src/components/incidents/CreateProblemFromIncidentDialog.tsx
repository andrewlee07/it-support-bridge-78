
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ticket } from '@/utils/types/ticket';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long",
  }),
  priority: z.enum(["P1", "P2", "P3"]),
  category: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateProblemFromIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: Ticket;
  onSuccess?: (problemId: string) => void;
}

const CreateProblemFromIncidentDialog: React.FC<CreateProblemFromIncidentDialogProps> = ({
  open,
  onOpenChange,
  incident,
  onSuccess
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Problem from incident: ${incident.title}`,
      description: `This problem was created from incident #${incident.id}.\n\n${incident.description}`,
      priority: mapIncidentPriorityToProblemPriority(incident.priority),
      category: incident.category,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, this would call an API to create the problem
      // For now, we'll simulate a successful creation with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const problemId = `PRB-${Math.floor(Math.random() * 10000)}`;
      
      toast.success('Problem created successfully');
      
      if (onSuccess) {
        onSuccess(problemId);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating problem:', error);
      toast.error('Failed to create problem');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Problem from Incident</DialogTitle>
          <DialogDescription>
            Create a new problem record based on this incident. The incident will be automatically linked to the new problem.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear title that describes the problem
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="P1">P1 - Critical</SelectItem>
                        <SelectItem value="P2">P2 - High</SelectItem>
                        <SelectItem value="P3">P3 - Medium</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="access">Access</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6}
                      className="resize-y"
                    />
                  </FormControl>
                  <FormDescription>
                    Details about the problem including relevant information from the incident
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Problem</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to map incident priority to problem priority
function mapIncidentPriorityToProblemPriority(incidentPriority: string): "P1" | "P2" | "P3" {
  switch (incidentPriority) {
    case 'high':
    case 'P1':
      return 'P1';
    case 'medium':
    case 'P2':
      return 'P2';
    case 'low':
    case 'P3':
    case 'P4':
    default:
      return 'P3';
  }
}

export default CreateProblemFromIncidentDialog;

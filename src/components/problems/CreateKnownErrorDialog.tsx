
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
import { Problem } from '@/utils/types/problem';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  symptoms: z.string().min(3, {
    message: "Symptoms must be at least 3 characters long",
  }),
  workaround: z.string().min(3, {
    message: "Workaround must be at least 3 characters long",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateKnownErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problem: Problem;
  onSuccess?: (knownErrorId: string) => void;
}

const CreateKnownErrorDialog: React.FC<CreateKnownErrorDialogProps> = ({
  open,
  onOpenChange,
  problem,
  onSuccess
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Known Error: ${problem.title}`,
      symptoms: problem.description || '',
      workaround: problem.workaround || '',
      description: `This known error was created from problem #${problem.id}.\n\n${problem.rootCause || ''}`,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, this would call an API to create the known error
      // For now, we'll simulate a successful creation with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const knownErrorId = `KE-${Math.floor(Math.random() * 10000)}`;
      
      toast.success('Known Error created successfully');
      
      if (onSuccess) {
        onSuccess(knownErrorId);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating known error:', error);
      toast.error('Failed to create known error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Known Error</DialogTitle>
          <DialogDescription>
            Document this problem as a known error with workarounds and other important information.
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
                    A clear title that describes the known error
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={3}
                      className="resize-y"
                      placeholder="Describe how to identify this issue"
                    />
                  </FormControl>
                  <FormDescription>
                    Describe how users or support staff can identify this issue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="workaround"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workaround</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={3}
                      className="resize-y"
                      placeholder="Describe temporary solutions"
                    />
                  </FormControl>
                  <FormDescription>
                    Document temporary solutions or workarounds for this issue
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
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4}
                      className="resize-y"
                      placeholder="Additional information about the known error"
                    />
                  </FormControl>
                  <FormDescription>
                    Include root cause information and any other relevant details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Known Error</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKnownErrorDialog;

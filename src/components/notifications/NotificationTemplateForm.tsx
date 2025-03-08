
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { NotificationTemplate, EventType } from '@/utils/types/notification';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const templateSchema = z.object({
  name: z.string().min(3, {
    message: 'Template name must be at least 3 characters.',
  }),
  eventType: z.string({
    required_error: 'Please select an event type.',
  }),
  subject: z.string().min(3, {
    message: 'Subject must be at least 3 characters.',
  }),
  body: z.string().min(10, {
    message: 'Body must be at least 10 characters.',
  }),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof templateSchema>;

interface NotificationTemplateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: NotificationTemplate;
  onSave: (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => Promise<NotificationTemplate | null>;
}

const NotificationTemplateForm: React.FC<NotificationTemplateFormProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: initialData?.name || '',
      eventType: initialData?.eventType || '',
      subject: initialData?.subject || '',
      body: initialData?.body || '',
      isActive: initialData?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        name: initialData.name,
        eventType: initialData.eventType,
        subject: initialData.subject,
        body: initialData.body,
        isActive: initialData.isActive,
      });
    } else if (open) {
      form.reset({
        name: '',
        eventType: '',
        subject: '',
        body: '',
        isActive: true,
      });
    }
  }, [open, initialData, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await onSave(data);
      if (result) {
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Failed to save template');
      console.error('Error saving template:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeholderValues = {
    ticketId: 'INC00001',
    ticketTitle: 'Email Service Unavailable',
    status: 'In Progress',
    assignee: 'Jane Smith',
    link: 'https://example.com/tickets/INC00001',
    requester: 'John Doe'
  };

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/\{ticketId\}/g, placeholderValues.ticketId)
      .replace(/\{ticketTitle\}/g, placeholderValues.ticketTitle)
      .replace(/\{status\}/g, placeholderValues.status)
      .replace(/\{assignee\}/g, placeholderValues.assignee)
      .replace(/\{link\}/g, placeholderValues.link)
      .replace(/\{requester\}/g, placeholderValues.requester);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Template' : 'Create Template'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Update the notification template settings and content.' 
              : 'Create a new notification template for sending alerts.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="edit">Edit Template</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter template name" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for this notification template.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="incident-created">Incident Created</SelectItem>
                          <SelectItem value="incident-assigned">Incident Assigned</SelectItem>
                          <SelectItem value="incident-resolved">Incident Resolved</SelectItem>
                          <SelectItem value="service-request-created">Service Request Created</SelectItem>
                          <SelectItem value="service-request-approval-required">Service Request Approval Required</SelectItem>
                          <SelectItem value="service-request-completed">Service Request Completed</SelectItem>
                          <SelectItem value="asset-created">Asset Created</SelectItem>
                          <SelectItem value="asset-updated">Asset Updated</SelectItem>
                          <SelectItem value="asset-assigned">Asset Assigned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        When this notification should be sent.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Email subject line" {...field} />
                      </FormControl>
                      <FormDescription>
                        The subject line of the email notification.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Email body content" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Available placeholders: {'{ticketId}'}, {'{ticketTitle}'}, {'{status}'}, {'{assignee}'}, {'{link}'}, {'{requester}'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>
                          Enable or disable this notification template.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Template'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-md p-4 space-y-2">
              <div className="font-medium">Subject Preview:</div>
              <div className="p-2 bg-muted rounded-md">
                {replacePlaceholders(form.watch('subject'))}
              </div>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="font-medium">Email Body Preview:</div>
              <div className="p-3 bg-muted rounded-md whitespace-pre-line">
                {replacePlaceholders(form.watch('body'))}
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('edit')}
              >
                Back to Edit
              </Button>
              <Button 
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Template'}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationTemplateForm;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNotificationTemplates } from '@/hooks/useNotifications';
import { NotificationTemplate } from '@/utils/types/notification';

// Schema for the notification template form
const templateSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  eventType: z.string().min(1, { message: 'Event type is required.' }),
  subject: z.string().min(3, { message: 'Subject is required.' }),
  body: z.string().min(10, { message: 'Body must be at least 10 characters.' }),
  isActive: z.boolean().default(true),
});

interface NotificationTemplateFormProps {
  template?: NotificationTemplate;
  onClose: () => void;
}

const NotificationTemplateForm: React.FC<NotificationTemplateFormProps> = ({
  template,
  onClose,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { createTemplate, updateTemplate } = useNotificationTemplates();
  const isEditing = !!template;

  // Initialize form with template data or defaults
  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: template?.name || '',
      eventType: template?.eventType || '',
      subject: template?.subject || '',
      body: template?.body || '',
      isActive: template?.isActive !== undefined ? template.isActive : true,
    },
  });

  const onSubmit = async (data: z.infer<typeof templateSchema>) => {
    try {
      if (isEditing && template) {
        await updateTemplate(template.id, data);
      } else {
        await createTemplate(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
      // Add error handling here
    }
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="New Incident Notification" {...field} />
              </FormControl>
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
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="incident-created">Incident Created</SelectItem>
                  <SelectItem value="incident-assigned">Incident Assigned</SelectItem>
                  <SelectItem value="incident-resolved">Incident Resolved</SelectItem>
                  <SelectItem value="service-request-created">Service Request Created</SelectItem>
                  <SelectItem value="service-request-approval-required">Service Request Approval Required</SelectItem>
                  <SelectItem value="service-request-completed">Service Request Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Determines when this notification will be sent
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
                <Input
                  placeholder="New Incident: {ticketId} - {ticketTitle}"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can use placeholders like {'{ticketId}'}, {'{ticketTitle}'}
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
                  placeholder="Hello,

A new incident has been created:

ID: {ticketId}
Title: {ticketTitle}
Status: {status}

You can view the incident here: {link}

Regards,
IT Support Team"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Available placeholders: {'{ticketId}'}, {'{ticketTitle}'}, {'{status}'}, {'{assignee}'}, {'{link}'}
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
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>
                  Enable or disable this notification template
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

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              This is how your notification will appear with sample data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="font-semibold">
              Subject: {form.watch('subject')
                .replace('{ticketId}', 'INC00001')
                .replace('{ticketTitle}', 'Email Service Unavailable')}
            </div>
            <div className="whitespace-pre-wrap border rounded-md p-4 bg-muted/30">
              {form.watch('body')
                .replace('{ticketId}', 'INC00001')
                .replace('{ticketTitle}', 'Email Service Unavailable')
                .replace('{status}', 'New')
                .replace('{assignee}', 'Jane Smith')
                .replace('{link}', 'http://example.com/incidents/INC00001')}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default NotificationTemplateForm;

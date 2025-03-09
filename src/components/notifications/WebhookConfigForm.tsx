
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { WebhookConfig, EventType } from '@/utils/types/email';
import { useWebhookConfigs } from '@/hooks/useNotifications';
import { MultiSelect } from '@/components/ui/multi-select';

const webhookSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  isActive: z.boolean().default(true),
  secretKey: z.string().optional(),
  headers: z.record(z.string()).optional(),
});

type FormValues = z.infer<typeof webhookSchema>;

interface WebhookConfigFormProps {
  initialData?: WebhookConfig;
  onClose: () => void;
}

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({
  initialData,
  onClose,
}) => {
  const { createWebhook, updateWebhook } = useWebhookConfigs();
  const isEditing = !!initialData;

  // States for the multi-select component
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    initialData?.eventTypes.map(e => e.toString()) || []
  );

  // Event type options
  const eventOptions = [
    { value: 'ticket-created', label: 'Ticket Created' },
    { value: 'ticket-updated', label: 'Ticket Updated' },
    { value: 'ticket-assigned', label: 'Ticket Assigned' },
    { value: 'ticket-resolved', label: 'Ticket Resolved' },
    { value: 'sla-breach', label: 'SLA Breach' },
    { value: 'change-approved', label: 'Change Approved' },
    { value: 'change-submitted', label: 'Change Submitted' },
    { value: 'problem-created', label: 'Problem Created' },
    { value: 'problem-resolved', label: 'Problem Resolved' },
  ];

  // Form initialization
  const form = useForm<FormValues>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      name: initialData?.name || '',
      url: initialData?.url || '',
      isActive: initialData?.isActive ?? true,
      secretKey: initialData?.secretKey || '',
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: FormValues) => {
    if (selectedEvents.length === 0) {
      toast.error('Please select at least one event type');
      return;
    }

    try {
      // Prepare the webhook data
      const webhookData = {
        ...data,
        eventTypes: selectedEvents as EventType[],
      };

      if (isEditing && initialData) {
        await updateWebhook(initialData.id, webhookData);
        toast.success('Webhook updated successfully');
      } else {
        await createWebhook(webhookData);
        toast.success('Webhook created successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error saving webhook:', error);
      toast.error('Failed to save webhook');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook Name</FormLabel>
              <FormControl>
                <Input placeholder="Incident Notifications" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name to identify this webhook
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/webhook" {...field} />
              </FormControl>
              <FormDescription>
                The URL where event notifications will be sent
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Event Types</FormLabel>
          <MultiSelect
            options={eventOptions}
            selected={selectedEvents}
            onChange={setSelectedEvents}
            placeholder="Select event types..."
          />
          <FormDescription>
            Select which events should trigger this webhook
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="secretKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Key (Optional)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>
                Used to sign webhook payloads for security verification
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
                  Enable or disable this webhook
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

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {isEditing ? 'Update Webhook' : 'Create Webhook'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WebhookConfigForm;

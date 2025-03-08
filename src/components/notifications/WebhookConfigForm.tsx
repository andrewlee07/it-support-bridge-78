
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useWebhooks } from '@/hooks/useNotifications';
import { WebhookConfig } from '@/utils/types/notification';
import { toast } from '@/hooks/use-toast';

const eventTypes = [
  { id: 'incident-created', label: 'Incident Created' },
  { id: 'incident-assigned', label: 'Incident Assigned' },
  { id: 'incident-resolved', label: 'Incident Resolved' },
  { id: 'service-request-created', label: 'Service Request Created' },
  { id: 'service-request-approval-required', label: 'Service Request Approval Required' },
  { id: 'service-request-completed', label: 'Service Request Completed' },
];

const webhookSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  isActive: z.boolean().default(true),
  eventTypes: z.array(z.string()).min(1, { message: 'Select at least one event type.' }),
  authType: z.enum(['none', 'token', 'basic']),
  authCredentials: z.string().optional(),
  retryCount: z.number().int().min(0).max(10),
  retryInterval: z.number().int().min(1).max(60),
});

interface WebhookConfigFormProps {
  webhook?: WebhookConfig;
  onClose: () => void;
}

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({ webhook, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { createWebhook, updateWebhook, testWebhook } = useWebhooks();
  const isEditing = !!webhook;

  // Initialize form with webhook data or defaults
  const form = useForm<z.infer<typeof webhookSchema>>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      name: webhook?.name || '',
      url: webhook?.url || '',
      isActive: webhook?.isActive !== undefined ? webhook.isActive : true,
      eventTypes: webhook?.eventTypes || [],
      authType: webhook?.authType || 'none',
      authCredentials: webhook?.authCredentials || '',
      retryCount: webhook?.retryCount || 3,
      retryInterval: webhook?.retryInterval || 5,
    },
  });

  const onSubmit = async (data: z.infer<typeof webhookSchema>) => {
    try {
      setLoading(true);
      if (isEditing && webhook) {
        await updateWebhook(webhook.id, data);
      } else {
        await createWebhook(data);
      }
      onClose();
      toast({
        title: `Webhook ${isEditing ? 'updated' : 'created'} successfully`,
        description: `The webhook ${data.name} has been ${isEditing ? 'updated' : 'created'}.`,
      });
    } catch (error) {
      console.error('Error saving webhook:', error);
      toast({
        variant: "destructive",
        title: "Error saving webhook",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestWebhook = async () => {
    const { url, authType, authCredentials } = form.getValues();
    
    // Basic validation
    if (!url) {
      form.setError('url', { message: 'URL is required for testing.' });
      return;
    }
    
    setLoading(true);
    setTestResult(null);
    
    try {
      const result = await testWebhook({
        url,
        authType,
        authCredentials: authCredentials || undefined,
      });
      
      setTestResult({
        success: result.success,
        message: result.message || (result.success ? 'Webhook test successful!' : 'Webhook test failed.'),
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'An error occurred while testing the webhook.',
      });
    } finally {
      setLoading(false);
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Slack Notifications" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://hooks.example.com/services/..." {...field} />
              </FormControl>
              <FormDescription>
                The URL where webhook notifications will be sent
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Authentication</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      None
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="token" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Token
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="basic" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Basic Auth
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('authType') !== 'none' && (
          <FormField
            control={form.control}
            name="authCredentials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch('authType') === 'token' ? 'Token' : 'Credentials'}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={form.watch('authType') === 'token' ? 'Auth token' : 'username:password'}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {form.watch('authType') === 'token'
                    ? 'Authentication token for the webhook'
                    : 'Basic auth credentials in format username:password'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="eventTypes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Events to send</FormLabel>
                <FormDescription>
                  Select which events should trigger this webhook
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {eventTypes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="eventTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="retryCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Retries</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Number of retry attempts on failure (0-10)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retryInterval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retry Interval (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Time between retry attempts (1-60)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        {testResult && (
          <div className={`p-4 rounded-md ${testResult.success ? 'bg-emerald-500/10 text-emerald-700' : 'bg-destructive/10 text-destructive'}`}>
            {testResult.message}
          </div>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestWebhook}
            disabled={loading}
          >
            Test Webhook
          </Button>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {isEditing ? 'Update Webhook' : 'Create Webhook'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default WebhookConfigForm;

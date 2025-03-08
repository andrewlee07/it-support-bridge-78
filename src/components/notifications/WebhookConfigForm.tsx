
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { WebhookConfig, EventType } from '@/utils/types/notification';
import { useWebhooks } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/use-toast';

// Schema for the webhook form
const webhookFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  url: z.string().url({ message: 'Please enter a valid URL' }),
  isActive: z.boolean().default(true),
  eventTypes: z.array(z.string()).min(1, { message: 'Select at least one event type' }),
  authType: z.enum(['none', 'basic', 'token']).default('none'),
  authCredentials: z.string().optional(),
  retryCount: z.number().int().min(0).max(10).default(3),
  retryInterval: z.number().int().min(1).max(60).default(5),
});

type WebhookFormValues = z.infer<typeof webhookFormSchema>;

export interface WebhookConfigFormProps {
  initialData?: WebhookConfig;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Convert EventType array to the form expected values
const mapEventTypesToFormValues = (eventTypes: EventType[] = []): string[] => {
  return eventTypes.map(type => type.toString());
};

// Convert form values back to webhook configuration
const mapFormValuesToWebhook = (values: WebhookFormValues): Omit<WebhookConfig, 'id'> => {
  return {
    name: values.name,
    url: values.url,
    isActive: values.isActive,
    eventTypes: values.eventTypes as EventType[],
    authType: values.authType,
    authCredentials: values.authCredentials,
    retryCount: values.retryCount,
    retryInterval: values.retryInterval,
  };
};

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const { updateWebhook, createWebhook, testWebhook } = useWebhooks();

  // Available event types
  const availableEventTypes = [
    { id: 'incident-created', label: 'Incident Created' },
    { id: 'incident-assigned', label: 'Incident Assigned' },
    { id: 'incident-resolved', label: 'Incident Resolved' },
    { id: 'service-request-created', label: 'Service Request Created' },
    { id: 'service-request-completed', label: 'Service Request Completed' },
    { id: 'problem-created', label: 'Problem Created' },
    { id: 'problem-resolved', label: 'Problem Resolved' },
    { id: 'change-request-submitted', label: 'Change Request Submitted' },
    { id: 'change-request-approved', label: 'Change Request Approved' },
    { id: 'change-request-rejected', label: 'Change Request Rejected' },
  ];

  // Initialize form with default values or existing data
  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          eventTypes: mapEventTypesToFormValues(initialData.eventTypes),
        }
      : {
          name: '',
          url: '',
          isActive: true,
          eventTypes: [],
          authType: 'none',
          authCredentials: '',
          retryCount: 3,
          retryInterval: 5,
        },
  });

  const handleSubmit = async (values: WebhookFormValues) => {
    const webhookData = mapFormValuesToWebhook(values);
    
    try {
      if (initialData?.id) {
        // Update existing webhook
        const result = await updateWebhook(initialData.id, webhookData);
        if (result) {
          toast({
            title: 'Webhook updated',
            description: 'The webhook configuration has been updated successfully.',
          });
        }
      } else {
        // Create new webhook
        const result = await createWebhook(webhookData);
        if (result) {
          toast({
            title: 'Webhook created',
            description: 'The webhook configuration has been created successfully.',
          });
        }
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleTestWebhook = async () => {
    const { url, authType, authCredentials } = form.getValues();
    
    try {
      const response = await testWebhook({ url, authType, authCredentials });
      
      if (response && typeof response === 'object' && 'success' in response) {
        if (response.success) {
          toast({
            title: 'Test successful',
            description: 'The webhook endpoint responded successfully.',
          });
        } else {
          toast({
            title: 'Test failed',
            description: response.message || 'The webhook endpoint failed to respond.',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Test result',
          description: 'Webhook test completed',
        });
      }
    } catch (error) {
      toast({
        title: 'Test error',
        description: error instanceof Error ? error.message : 'An error occurred during testing',
        variant: 'destructive',
      });
    }
  };

  // Form submission handler
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Webhook' : 'Create New Webhook'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Webhook name" {...field} />
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
                    <FormLabel>Webhook URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>
                        Enable or disable this webhook integration
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
            </div>
            
            {/* Event Types */}
            <div>
              <FormField
                control={form.control}
                name="eventTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Event Types</FormLabel>
                      <FormDescription>
                        Select which events should trigger this webhook
                      </FormDescription>
                    </div>
                    {availableEventTypes.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="eventTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={type.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== type.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {type.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Authentication */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="authType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authentication</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select authentication type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                        <SelectItem value="token">API Token</SelectItem>
                      </SelectContent>
                    </Select>
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
                        {form.watch('authType') === 'basic'
                          ? 'Username:Password'
                          : 'API Token'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={
                            form.watch('authType') === 'basic'
                              ? 'username:password'
                              : 'token'
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.watch('authType') === 'basic'
                          ? 'Enter in format username:password'
                          : 'Enter your API token'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {/* Advanced Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Advanced Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="retryCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Retry Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={10}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Max number of retries
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
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Time between retry attempts
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-start">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestWebhook}
                  disabled={!form.watch('url')}
                >
                  Test Webhook
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Webhook' : 'Create Webhook'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default WebhookConfigForm;

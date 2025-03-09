import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWebhooks, EventType } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/use-toast';

// Form schema
const webhookFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  url: z.string().url({ message: 'Must be a valid URL' }),
  eventTypes: z.array(z.string()).min(1, { message: 'Select at least one event type' }),
  authType: z.enum(['none', 'basic', 'token']),
  authCredentials: z.string().optional(),
  isActive: z.boolean().default(true),
  retryCount: z.number().int().min(0).max(10),
  retryInterval: z.number().int().min(1).max(60)
});

type WebhookFormValues = z.infer<typeof webhookFormSchema>;

// Event type options for the form
const eventTypeOptions = [
  { value: 'incident-created', label: 'Incident Created' },
  { value: 'incident-assigned', label: 'Incident Assigned' },
  { value: 'incident-resolved', label: 'Incident Resolved' },
  { value: 'service-request-created', label: 'Service Request Created' },
  { value: 'service-request-approval-required', label: 'Service Request Approval Required' },
  { value: 'service-request-completed', label: 'Service Request Completed' }
];

interface WebhookConfigFormProps {
  initialData?: any; // Use any to avoid type issues for now
  onSuccess?: () => void;
  onCancel?: () => void;
}

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({
  initialData,
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const { createWebhook, updateWebhook, testWebhook } = useWebhooks();

  // Initialize form with default values or existing data
  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          url: initialData.url,
          eventTypes: initialData.eventTypes.map((type: string) => type),
          authType: initialData.authType,
          authCredentials: initialData.authCredentials || '',
          isActive: initialData.isActive,
          retryCount: initialData.retryCount,
          retryInterval: initialData.retryInterval
        }
      : {
          name: '',
          url: 'https://',
          eventTypes: [],
          authType: 'none',
          authCredentials: '',
          isActive: true,
          retryCount: 3,
          retryInterval: 5
        }
  });

  const handleSubmit = async (values: WebhookFormValues) => {
    try {
      let response;
      
      // Create webhook config object
      const webhookData = {
        name: values.name,
        url: values.url,
        eventTypes: values.eventTypes as EventType[],
        authType: values.authType as 'none' | 'basic' | 'token',
        authCredentials: values.authCredentials,
        isActive: values.isActive,
        retryCount: values.retryCount,
        retryInterval: values.retryInterval
      };
      
      if (initialData?.id) {
        // Update existing webhook
        response = await updateWebhook(initialData.id, webhookData);
        if (response.success) {
          toast({
            title: "Webhook Updated",
            description: "Webhook configuration has been updated successfully.",
          });
        } else {
          throw new Error(response.error || "Failed to update webhook");
        }
      } else {
        // Create new webhook
        response = await createWebhook(webhookData);
        if (response.success) {
          toast({
            title: "Webhook Created",
            description: "New webhook configuration has been created successfully.",
          });
        } else {
          throw new Error(response.error || "Failed to create webhook");
        }
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleTestWebhook = async () => {
    const { url, authType, authCredentials } = form.getValues();
    
    try {
      const response = await testWebhook({ 
        url, 
        authType, 
        authCredentials 
      });
      
      if (response.success) {
        toast({
          title: "Test Successful",
          description: "Successfully connected to the webhook endpoint.",
          variant: "success"
        });
      } else {
        toast({
          title: "Test Failed",
          description: response.message || "Failed to connect to the webhook endpoint.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: "An error occurred while testing the webhook.",
        variant: "destructive"
      });
    }
  };

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
                    <MultiSelect
                      options={eventTypeOptions}
                      value={form.watch('eventTypes')}
                      onChange={(value) => form.setValue('eventTypes', value)}
                    />
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

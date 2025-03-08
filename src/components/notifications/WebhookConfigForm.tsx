
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WebhookConfig, EventType } from '@/utils/types/notification';
import { toast } from 'sonner';

const webhookSchema = z.object({
  name: z.string().min(3, {
    message: 'Webhook name must be at least 3 characters.',
  }),
  url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  authType: z.enum(['none', 'basic', 'token']),
  authCredentials: z.string().optional(),
  eventTypes: z.array(z.string()).min(1, {
    message: 'Please select at least one event type.',
  }),
  isActive: z.boolean().default(true),
  retryCount: z.number().int().min(0).max(10),
  retryInterval: z.number().int().min(1).max(60),
});

type FormValues = z.infer<typeof webhookSchema>;

interface WebhookConfigFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: WebhookConfig;
  onSave: (webhook: Omit<WebhookConfig, 'id'>) => Promise<WebhookConfig | null>;
  onTest?: (webhook: WebhookConfig) => Promise<boolean>;
}

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
  onTest
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      name: initialData?.name || '',
      url: initialData?.url || '',
      authType: initialData?.authType || 'none',
      authCredentials: initialData?.authCredentials || '',
      eventTypes: initialData?.eventTypes || [],
      isActive: initialData?.isActive ?? true,
      retryCount: initialData?.retryCount ?? 3,
      retryInterval: initialData?.retryInterval ?? 5,
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        name: initialData.name,
        url: initialData.url,
        authType: initialData.authType,
        authCredentials: initialData.authCredentials || '',
        eventTypes: initialData.eventTypes,
        isActive: initialData.isActive,
        retryCount: initialData.retryCount,
        retryInterval: initialData.retryInterval,
      });
    } else if (open) {
      form.reset({
        name: '',
        url: '',
        authType: 'none',
        authCredentials: '',
        eventTypes: [],
        isActive: true,
        retryCount: 3,
        retryInterval: 5,
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
      toast.error('Failed to save webhook configuration');
      console.error('Error saving webhook configuration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTest = async () => {
    if (!initialData && !form.getValues('url')) {
      toast.error('Please enter a URL before testing');
      return;
    }
    
    setIsTesting(true);
    try {
      if (onTest && initialData) {
        await onTest(initialData);
      } else {
        toast.info('Test feature only available for existing webhooks');
      }
    } finally {
      setIsTesting(false);
    }
  };

  const eventTypeOptions = [
    { value: 'incident-created', label: 'Incident Created' },
    { value: 'incident-assigned', label: 'Incident Assigned' },
    { value: 'incident-resolved', label: 'Incident Resolved' },
    { value: 'service-request-created', label: 'Service Request Created' },
    { value: 'service-request-approval-required', label: 'Service Request Approval Required' },
    { value: 'service-request-completed', label: 'Service Request Completed' },
    { value: 'asset-created', label: 'Asset Created' },
    { value: 'asset-updated', label: 'Asset Updated' },
    { value: 'asset-assigned', label: 'Asset Assigned' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Webhook' : 'Create Webhook'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Update webhook configuration for external system integration.' 
              : 'Configure a new webhook to send notifications to external systems.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter webhook name" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this webhook.
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
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/webhook" {...field} />
                  </FormControl>
                  <FormDescription>
                    The endpoint URL where notification data will be sent.
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
                  <FormLabel>Authentication Type</FormLabel>
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
                        type="password"
                        placeholder={form.watch('authType') === 'token' 
                          ? "Enter authorization token" 
                          : "username:password"}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch('authType') === 'token'
                        ? "The authorization token will be sent in the Authorization header."
                        : "Basic auth credentials in the format username:password."}
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
                  <div className="mb-2">
                    <FormLabel>Events to Send</FormLabel>
                    <FormDescription>
                      Select which events should trigger this webhook.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {eventTypeOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="eventTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = [...(field.value || [])];
                                    if (checked) {
                                      field.onChange([...currentValues, option.value]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          (value) => value !== option.value
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
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
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of retry attempts if the webhook fails.
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
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          field.onChange(isNaN(value) ? 1 : value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Time between retry attempts in minutes.
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
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>
                      Enable or disable this webhook.
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
            
            <DialogFooter className="gap-2">
              {initialData && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleTest}
                  disabled={isTesting}
                >
                  {isTesting ? 'Testing...' : 'Test Webhook'}
                </Button>
              )}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Webhook'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookConfigForm;

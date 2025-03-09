
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import { toast } from 'sonner';
import { WebhookConfig, EventType, useWebhookConfigs } from '@/hooks/useNotifications';

interface WebhookConfigFormProps {
  initialData?: WebhookConfig;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const WebhookConfigForm: React.FC<WebhookConfigFormProps> = ({ 
  initialData, 
  onSuccess, 
  onCancel 
}) => {
  const { createWebhook, updateWebhook, isCreating, isUpdating } = useWebhookConfigs();
  const isEditing = !!initialData;
  
  // Form state
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    url: initialData?.url || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    secretKey: initialData?.secretKey || '',
    eventTypes: initialData?.eventTypes || [],
    headers: initialData?.headers || {},
  });
  
  // Header form
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!formData.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    
    if (formData.eventTypes.length === 0) {
      newErrors.eventTypes = 'At least one event type must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleEventTypesChange = (values: string[]) => {
    setFormData({
      ...formData,
      eventTypes: values as EventType[],
    });
    
    // Clear error when field is edited
    if (errors.eventTypes) {
      setErrors({ ...errors, eventTypes: '' });
    }
  };
  
  const addHeader = () => {
    if (headerKey.trim() && headerValue.trim()) {
      setFormData({
        ...formData,
        headers: {
          ...formData.headers,
          [headerKey]: headerValue,
        },
      });
      setHeaderKey('');
      setHeaderValue('');
    }
  };
  
  const removeHeader = (key: string) => {
    const newHeaders = { ...formData.headers };
    delete newHeaders[key];
    setFormData({
      ...formData,
      headers: newHeaders,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (isEditing && initialData) {
      updateWebhook(
        { 
          id: initialData.id, 
          updates: formData as any
        },
        {
          onSuccess: () => {
            toast.success('Webhook configuration updated');
            if (onSuccess) onSuccess();
          },
          onError: () => {
            toast.error('Failed to update webhook configuration');
          }
        }
      );
    } else {
      createWebhook(
        formData as any,
        {
          onSuccess: () => {
            toast.success('Webhook configuration created');
            if (onSuccess) onSuccess();
          },
          onError: () => {
            toast.error('Failed to create webhook configuration');
          }
        }
      );
    }
  };
  
  const eventTypeOptions = [
    { label: 'Ticket Created', value: 'ticket-created' },
    { label: 'Ticket Updated', value: 'ticket-updated' },
    { label: 'Ticket Assigned', value: 'ticket-assigned' },
    { label: 'Ticket Resolved', value: 'ticket-resolved' },
    { label: 'SLA Breach', value: 'sla-breach' },
    { label: 'Change Submitted', value: 'change-submitted' },
    { label: 'Change Approved', value: 'change-approved' },
    { label: 'Problem Created', value: 'problem-created' },
    { label: 'Problem Resolved', value: 'problem-resolved' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Webhook Configuration' : 'New Webhook Configuration'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Webhook name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Webhook URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/webhook"
                  className={errors.url ? 'border-red-500' : ''}
                />
                {errors.url && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.url}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secretKey">Secret Key (optional)</Label>
              <Input
                id="secretKey"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleInputChange}
                placeholder="Secret key for webhook signature"
              />
              <p className="text-sm text-muted-foreground">
                This key will be used to sign webhook payloads for security.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Event Types</Label>
              <MultiSelect
                options={eventTypeOptions}
                onValueChange={handleEventTypesChange}
                defaultValues={formData.eventTypes}
                placeholder="Select event types..."
                className={errors.eventTypes ? 'border-red-500' : ''}
              />
              {errors.eventTypes && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.eventTypes}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Custom Headers</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                <Input
                  placeholder="Header Name"
                  value={headerKey}
                  onChange={(e) => setHeaderKey(e.target.value)}
                  className="sm:col-span-2"
                />
                <Input
                  placeholder="Header Value"
                  value={headerValue}
                  onChange={(e) => setHeaderValue(e.target.value)}
                  className="sm:col-span-2"
                />
                <Button type="button" onClick={addHeader} disabled={!headerKey || !headerValue}>
                  Add
                </Button>
              </div>
              
              {Object.keys(formData.headers).length > 0 && (
                <div className="mt-2 space-y-2">
                  {Object.entries(formData.headers).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-muted rounded-md">
                      <div>
                        <span className="font-semibold">{key}:</span> {value}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHeader(key)}
                        className="h-7 text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, isActive: checked as boolean })
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isEditing ? 'Update Webhook' : 'Create Webhook'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WebhookConfigForm;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { toast } from 'sonner';
import { EmailTemplate } from '@/utils/types/email';

interface EmailTemplateEditorProps {
  initialData?: EmailTemplate;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const isEditing = !!initialData;
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ subject: string; body: string } | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    subject: initialData?.subject || '',
    body: initialData?.body || '',
    triggerOn: initialData?.triggerOn || 'ticket-created',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });
  
  // Test variables
  const [testVariables, setTestVariables] = useState<Record<string, string>>({
    ticketId: 'INC-12345',
    ticketTitle: 'Network connectivity issue',
    userName: 'John Doe',
    agentName: 'Jane Smith',
    managerName: 'Richard Wilson',
    ticketPriority: 'High',
    changeId: 'CHG-6789',
    changeTitle: 'Database server upgrade',
    startDate: '2023-06-15 22:00',
    endDate: '2023-06-16 02:00',
  });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleTestVariableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTestVariables({
      ...testVariables,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      triggerOn: value as EmailTemplate['triggerOn'],
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && initialData) {
        const response = await emailNotificationApi.updateEmailTemplate(
          initialData.id,
          formData as Partial<EmailTemplate>
        );
        
        if (response.success) {
          toast.success('Email template updated successfully');
          if (onSuccess) onSuccess();
        } else {
          toast.error(`Failed to update template: ${response.error}`);
        }
      } else {
        const response = await emailNotificationApi.createEmailTemplate(
          formData as Omit<EmailTemplate, 'id'>
        );
        
        if (response.success) {
          toast.success('Email template created successfully');
          if (onSuccess) onSuccess();
        } else {
          toast.error(`Failed to create template: ${response.error}`);
        }
      }
    } catch (error) {
      toast.error('Error saving email template');
      console.error(error);
    }
  };
  
  const handleTestTemplate = async () => {
    setIsTesting(true);
    try {
      // Fix: Remove the second argument that's causing TS2554 error
      const response = await emailNotificationApi.testEmailTemplate(
        { subject: formData.subject, body: formData.body }
      );
      
      if (response.success) {
        // Fix: Set state correctly to avoid TS2345 error
        if (response.data) {
          setTestResult(response.data);
        }
      } else {
        toast.error(`Test failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Error testing template');
      console.error(error);
    } finally {
      setIsTesting(false);
    }
  };
  
  const triggerEvents = [
    { label: 'Ticket Created', value: 'ticket-created' },
    { label: 'Ticket Updated', value: 'ticket-updated' },
    { label: 'Ticket Assigned', value: 'ticket-assigned' },
    { label: 'Ticket Resolved', value: 'ticket-resolved' },
    { label: 'SLA Breach', value: 'sla-breach' },
    { label: 'Change Submitted', value: 'change-submitted' },
    { label: 'Change Approved', value: 'change-approved' },
    { label: 'Problem Created', value: 'problem-created' },
    { label: 'Problem Resolved', value: 'problem-resolved' },
    { label: 'Incident Created', value: 'incident-created' },
    { label: 'Incident Assigned', value: 'incident-assigned' },
    { label: 'Incident Resolved', value: 'incident-resolved' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Email Template' : 'Create Email Template'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g., Ticket Created Notification"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="triggerOn">Trigger Event</Label>
              <Select
                value={formData.triggerOn}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a trigger event" />
                </SelectTrigger>
                <SelectContent>
                  {triggerEvents.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="E.g., Your ticket #{ticketId} has been created"
                required
              />
              <p className="text-sm text-muted-foreground">
                Use {"{variable}"} syntax to include dynamic content
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body">Email Body</Label>
              <Textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Hello {userName},&#10;&#10;Your ticket #{ticketId} has been created..."
                className="min-h-40"
                required
              />
              <p className="text-sm text-muted-foreground">
                Use {"{variable}"} syntax to include dynamic content
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            
            <div className="pt-4 flex justify-between">
              <div className="space-x-2">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="button" variant="secondary" onClick={handleTestTemplate}>
                  Test Template
                </Button>
              </div>
              <Button type="submit">
                {isEditing ? 'Update Template' : 'Create Template'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle>Template Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <div className="p-3 bg-muted rounded-md">
                {testResult.subject}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Body</Label>
              <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">
                {testResult.body}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Test Variables</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(testVariables).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label htmlFor={`var-${key}`} className="text-xs">
                      {key}
                    </Label>
                    <Input
                      id={`var-${key}`}
                      name={key}
                      value={value}
                      onChange={handleTestVariableChange}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTestTemplate}
                disabled={isTesting}
                className="mt-2"
              >
                {isTesting ? 'Testing...' : 'Update Preview'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailTemplateEditor;

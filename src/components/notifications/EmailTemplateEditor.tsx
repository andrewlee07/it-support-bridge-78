
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { EmailTemplate } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

// Template form schema
const templateFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  body: z.string().min(10, { message: 'Body must be at least 10 characters' }),
  triggerOn: z.string().min(1, { message: 'Trigger event is required' }),
  isActive: z.boolean().default(true),
});

type EmailTemplateFormValues = z.infer<typeof templateFormSchema>;

interface EmailTemplateEditorProps {
  initialData?: EmailTemplate;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Event type options
const eventTypeOptions = [
  { value: 'ticket-created', label: 'Ticket Created' },
  { value: 'ticket-updated', label: 'Ticket Updated' },
  { value: 'ticket-assigned', label: 'Ticket Assigned' },
  { value: 'ticket-resolved', label: 'Ticket Resolved' },
  { value: 'sla-breach', label: 'SLA Breach' },
  { value: 'change-approved', label: 'Change Request Approved' },
  { value: 'change-submitted', label: 'Change Request Submitted' },
  { value: 'problem-created', label: 'Problem Created' },
  { value: 'problem-resolved', label: 'Problem Resolved' },
];

// Variable suggestion helper component
const VariableSuggestions: React.FC = () => {
  const variables = [
    { name: '{userName}', description: 'Name of the user' },
    { name: '{ticketId}', description: 'Ticket ID number' },
    { name: '{ticketTitle}', description: 'Title of the ticket' },
    { name: '{agentName}', description: 'Name of the assigned agent' },
    { name: '{changeId}', description: 'Change request ID' },
    { name: '{ticketPriority}', description: 'Priority of the ticket' },
    { name: '{managerName}', description: 'Manager name' },
  ];

  return (
    <div className="mt-4 bg-muted/50 p-3 rounded-md">
      <p className="text-sm font-medium mb-2">Available Variables:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {variables.map((variable) => (
          <div key={variable.name} className="flex items-start gap-1">
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{variable.name}</code>
            <span className="text-xs text-muted-foreground">{variable.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  
  // Initialize form with default values or existing data
  const form = useForm<EmailTemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          subject: initialData.subject,
          body: initialData.body,
          triggerOn: initialData.triggerOn,
          isActive: initialData.isActive,
        }
      : {
          name: '',
          subject: '',
          body: '',
          triggerOn: '',
          isActive: true,
        },
  });

  const handleSubmit = async (values: EmailTemplateFormValues) => {
    try {
      if (initialData?.id) {
        // Update existing template
        const result = await emailNotificationApi.updateEmailTemplate(initialData.id, values);
        if (result.success) {
          toast({
            title: "Template Updated",
            description: "Email template has been updated successfully.",
          });
        } else {
          throw new Error(result.error || "Failed to update template");
        }
      } else {
        // Create new template
        const result = await emailNotificationApi.createEmailTemplate(values);
        if (result.success) {
          toast({
            title: "Template Created",
            description: "New email template has been created successfully.",
          });
        } else {
          throw new Error(result.error || "Failed to create template");
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

  const handleTestTemplate = () => {
    const { subject, body } = form.getValues();
    
    // Preview the template with sample data
    const sampleData = {
      userName: "John Doe",
      ticketId: "TK-12345",
      ticketTitle: "System Outage",
      agentName: "Jane Smith",
      managerName: "Michael Johnson",
      ticketPriority: "High",
      changeId: "CR-7890"
    };
    
    let previewSubject = subject;
    let previewBody = body;
    
    // Replace variables with sample data
    Object.entries(sampleData).forEach(([key, value]) => {
      const pattern = new RegExp(`{${key}}`, 'g');
      previewSubject = previewSubject.replace(pattern, value);
      previewBody = previewBody.replace(pattern, value);
    });
    
    toast({
      title: "Template Preview",
      description: (
        <div className="mt-2 space-y-2">
          <div>
            <strong>Subject:</strong> 
            <div className="bg-muted p-2 rounded mt-1 text-sm">{previewSubject}</div>
          </div>
          <div>
            <strong>Body:</strong> 
            <div className="bg-muted p-2 rounded mt-1 text-sm whitespace-pre-line">{previewBody}</div>
          </div>
        </div>
      ),
      duration: 10000,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Email Template' : 'Create New Email Template'}</CardTitle>
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
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Ticket Created Notification" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="triggerOn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Event</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      When should this email template be sent?
                    </FormDescription>
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
                        Enable or disable this email template
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
            
            {/* Email Content */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Your ticket #{ticketId} has been created" {...field} />
                    </FormControl>
                    <FormDescription>
                      Use variables like {'{ticketId}'} to include dynamic content
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
                    <FormLabel>Email Body</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter email content here..." 
                        className="min-h-[200px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <VariableSuggestions />
              
              <div className="flex justify-start">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestTemplate}
                >
                  Preview Template
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
              {initialData ? 'Update Template' : 'Create Template'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default EmailTemplateEditor;

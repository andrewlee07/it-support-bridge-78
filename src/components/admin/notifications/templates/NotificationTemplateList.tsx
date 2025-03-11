import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotificationTemplate } from '@/utils/types/email';

const templateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  eventType: z.string().min(1, "Event type is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Template body is required")
});

type TemplateFormValues = z.infer<typeof templateSchema>;

const mockTemplates: NotificationTemplate[] = [
  {
    id: 'template-1',
    name: 'Incident Created',
    eventType: 'incident-created',
    subject: 'New incident created: {{incident.title}}',
    body: 'A new incident has been created with ID {{incident.id}}. Please check the details.',
    lastModified: new Date().toISOString(),
    lastModifiedBy: 'John Doe',
    isActive: true  // Add the missing isActive property
  },
  {
    id: 'template-2',
    name: 'Problem Assigned',
    eventType: 'problem-assigned',
    subject: 'Problem assigned: {{problem.title}}',
    body: 'A problem has been assigned to you: {{problem.description}}',
    lastModified: new Date().toISOString(),
    lastModifiedBy: 'Jane Smith',
    isActive: true  // Add the missing isActive property
  }
];

const NotificationTemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [isEditTemplateDialogOpen, setIsEditTemplateDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: '',
      eventType: '',
      subject: '',
      body: ''
    }
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredTemplates = searchQuery
    ? templates.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.eventType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : templates;
  
  const handleNewTemplate = () => {
    form.reset({
      name: '',
      eventType: '',
      subject: '',
      body: ''
    });
    setIsNewTemplateDialogOpen(true);
  };
  
  const handleEditTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      form.reset({
        name: template.name,
        eventType: template.eventType,
        subject: template.subject,
        body: template.body
      });
      setSelectedTemplateId(id);
      setIsEditTemplateDialogOpen(true);
    }
  };
  
  const handleAddTemplate = (data: TemplateFormValues) => {
    const newTemplate: NotificationTemplate = {
      id: `template-${Date.now()}`,
      name: data.name,
      eventType: data.eventType,
      subject: data.subject,
      body: data.body,
      lastModified: new Date().toISOString(),
      lastModifiedBy: 'Current User',
      isActive: true  // Add the missing isActive property
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setIsNewTemplateDialogOpen(false);
    toast.success('Template created successfully');
  };
  
  const handleUpdateTemplate = (data: TemplateFormValues) => {
    setTemplates(prev => prev.map(template => 
      template.id === selectedTemplateId
        ? {
            ...template,
            name: data.name,
            eventType: data.eventType,
            subject: data.subject,
            body: data.body,
            lastModified: new Date().toISOString(),
            lastModifiedBy: 'Current User'
          }
        : template
    ));
    setIsEditTemplateDialogOpen(false);
    toast.success('Template updated successfully');
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    toast.success('Template deleted successfully');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button onClick={handleNewTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Modified By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map(template => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.eventType}</TableCell>
                    <TableCell>{new Date(template.lastModified).toLocaleDateString()}</TableCell>
                    <TableCell>{template.lastModifiedBy}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTemplate(template.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No templates found. Try adjusting your search or create a new template.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* New Template Dialog */}
      <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Notification Template</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTemplate)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter template name" {...field} />
                    </FormControl>
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
                        <SelectItem value="incident-updated">Incident Updated</SelectItem>
                        <SelectItem value="incident-resolved">Incident Resolved</SelectItem>
                        <SelectItem value="problem-created">Problem Created</SelectItem>
                        <SelectItem value="problem-assigned">Problem Assigned</SelectItem>
                        <SelectItem value="problem-resolved">Problem Resolved</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Enter email subject" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Template</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter template body" 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setIsNewTemplateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Template</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Template Dialog */}
      <Dialog open={isEditTemplateDialogOpen} onOpenChange={setIsEditTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Notification Template</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateTemplate)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter template name" {...field} />
                    </FormControl>
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
                        <SelectItem value="incident-updated">Incident Updated</SelectItem>
                        <SelectItem value="incident-resolved">Incident Resolved</SelectItem>
                        <SelectItem value="problem-created">Problem Created</SelectItem>
                        <SelectItem value="problem-assigned">Problem Assigned</SelectItem>
                        <SelectItem value="problem-resolved">Problem Resolved</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Enter email subject" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Template</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter template body" 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setIsEditTemplateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Template</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationTemplateList;

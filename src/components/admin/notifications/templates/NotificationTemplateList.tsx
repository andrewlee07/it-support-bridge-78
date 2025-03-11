
import React, { useState } from 'react';
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  FileText, 
  Mail, 
  MessageSquare,
  Bell 
} from 'lucide-react';
import { EnhancedNotificationTemplate } from '@/utils/types/eventBus/notificationTypes';
import { mockEmailTemplates } from '@/utils/mockData/emailTemplates';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Convert email templates to enhanced templates for the mockup
const mockTemplates: EnhancedNotificationTemplate[] = mockEmailTemplates.map(template => ({
  id: template.id,
  name: template.name,
  category: template.triggerOn.split('-')[0],
  tags: [template.triggerOn],
  description: template.subject,
  metadata: {
    processType: template.triggerOn.split('-')[0],
    audience: ['users', 'agents'],
    importance: 'medium' as const
  },
  baseTemplate: {
    subject: template.subject,
    body: template.body
  },
  channelVariants: {
    email: {
      format: 'html',
      content: template.body
    },
    inApp: {
      format: 'text',
      content: template.subject
    }
  },
  currentVersion: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// Get channel icon based on channel name
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'slack':
    case 'teams':
      return <MessageSquare className="h-4 w-4" />;
    case 'inApp':
      return <Bell className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const NotificationTemplateList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] = useState<EnhancedNotificationTemplate[]>(mockTemplates);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [isEditTemplateDialogOpen, setIsEditTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EnhancedNotificationTemplate | null>(null);
  const { toast } = useToast();
  
  // Filter templates based on search query
  const filteredTemplates = searchQuery
    ? templates.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : templates;
  
  const handleNewTemplate = () => {
    setIsNewTemplateDialogOpen(true);
  };
  
  const handleEditTemplate = (template: EnhancedNotificationTemplate) => {
    setSelectedTemplate(template);
    setIsEditTemplateDialogOpen(true);
  };
  
  const handleAddTemplate = () => {
    const newTemplate: EnhancedNotificationTemplate = {
      id: `template-${Date.now()}`,
      name: "New Template",
      category: "notification",
      tags: ["custom"],
      description: "New notification template",
      metadata: {
        processType: "notification",
        audience: ["users"],
        importance: "medium"
      },
      baseTemplate: {
        subject: "New Notification",
        body: "This is a new notification template."
      },
      channelVariants: {
        email: {
          format: "html",
          content: "<p>This is a new notification template.</p>"
        },
        inApp: {
          format: "text",
          content: "New notification"
        }
      },
      currentVersion: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setIsNewTemplateDialogOpen(false);
    toast({
      title: "Template created",
      description: "New notification template has been created successfully."
    });
  };
  
  const handleUpdateTemplate = () => {
    if (selectedTemplate) {
      setTemplates(prev => prev.map(template => 
        template.id === selectedTemplate.id ? 
        {...selectedTemplate, updatedAt: new Date().toISOString()} : template
      ));
      setIsEditTemplateDialogOpen(false);
      toast({
        title: "Template updated",
        description: "Notification template has been updated successfully."
      });
    }
  };
    
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">
                      <div>
                        {template.name}
                        <div className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {template.channelVariants && Object.keys(template.channelVariants).map(channel => (
                          <div key={channel} className="flex items-center" title={channel}>
                            {getChannelIcon(channel)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={template.metadata.importance === 'critical' ? 'destructive' : 'secondary'}>
                        {template.metadata.importance}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the template creation form. In a production environment, this would include fields for template name, content, and channel variant configuration.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTemplate}>
              Create Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Template Dialog */}
      <Dialog open={isEditTemplateDialogOpen} onOpenChange={setIsEditTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the template editing form. In a production environment, this would include fields for editing template name, content, and channel variants.
            </p>
            {selectedTemplate && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedTemplate.name}</p>
                <p><strong>Category:</strong> {selectedTemplate.category}</p>
                <p><strong>Description:</strong> {selectedTemplate.description}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTemplate}>
              Update Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationTemplateList;

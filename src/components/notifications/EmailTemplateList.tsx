
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { EmailTemplate } from '@/utils/types';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { useToast } from '@/hooks/use-toast';
import EmailTemplateEditor from './EmailTemplateEditor';

const EmailTemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | undefined>(undefined);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await emailNotificationApi.getEmailTemplates();
      if (response.success) {
        setTemplates(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to load email templates",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading templates",
        variant: "destructive",
      });
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleAddTemplate = () => {
    setSelectedTemplate(undefined);
    setIsEditorOpen(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  const handleToggleActive = async (template: EmailTemplate) => {
    try {
      const updatedTemplate = { ...template, isActive: !template.isActive };
      const response = await emailNotificationApi.updateEmailTemplate(template.id, updatedTemplate);
      
      if (response.success) {
        setTemplates(prev => 
          prev.map(t => t.id === template.id ? { ...t, isActive: !t.isActive } : t)
        );
        toast({
          title: updatedTemplate.isActive ? "Template Activated" : "Template Deactivated",
          description: `${template.name} has been ${updatedTemplate.isActive ? "activated" : "deactivated"}.`,
        });
      } else {
        toast({
          title: "Update Failed",
          description: response.error || "Failed to update template status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Failed to toggle template status:", error);
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedTemplate(undefined);
  };

  const handleEditorSuccess = () => {
    setIsEditorOpen(false);
    setSelectedTemplate(undefined);
    fetchTemplates();
  };

  // Map trigger events to readable labels
  const getTriggerLabel = (trigger: string): string => {
    const triggerMap: Record<string, string> = {
      'ticket-created': 'Ticket Created',
      'ticket-updated': 'Ticket Updated',
      'ticket-assigned': 'Ticket Assigned',
      'ticket-resolved': 'Ticket Resolved',
      'sla-breach': 'SLA Breach',
      'change-approved': 'Change Request Approved',
      'change-submitted': 'Change Request Submitted',
      'problem-created': 'Problem Created',
      'problem-resolved': 'Problem Resolved',
    };
    
    return triggerMap[trigger] || trigger;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Templates</h2>
        <Button onClick={handleAddTemplate}>Add Template</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No email templates found</p>
            <Button onClick={handleAddTemplate}>Create Your First Template</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <Badge variant={template.isActive ? "success" : "secondary"}>
                    {template.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Trigger: {getTriggerLabel(template.triggerOn)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Subject:</h4>
                    <p className="bg-muted/30 p-2 rounded text-sm">{template.subject}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Body:</h4>
                    <div className="bg-muted/30 p-2 rounded text-sm max-h-[100px] overflow-y-auto whitespace-pre-line">
                      {template.body}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={template.isActive}
                      onCheckedChange={() => handleToggleActive(template)}
                    />
                    <span className="text-sm">
                      {template.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTemplate(template)}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <EmailTemplateEditor
              initialData={selectedTemplate}
              onSuccess={handleEditorSuccess}
              onCancel={handleCloseEditor}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import EmailTemplateList from './EmailTemplateList';
import EmailTemplateEditor from './EmailTemplateEditor';
import NotificationLogsList from './NotificationLogsList';
import NotificationSystemHealth from './NotificationSystemHealth';
import WebhookConfigList from './WebhookConfigList';
import { useDisclosure } from '@/hooks/useDisclosure';
import { EmailTemplate } from '@/utils/types';

interface NotificationDashboardProps {
  className?: string;
}

const NotificationDashboard: React.FC<NotificationDashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const { isOpen: isEditorOpen, onOpen: openEditor, onClose: closeEditor } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | undefined>(undefined);

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    openEditor();
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(undefined);
    openEditor();
  };

  const handleEditorClose = () => {
    setSelectedTemplate(undefined);
    closeEditor();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Notification System</h1>
        
        {activeTab === 'templates' && (
          <Button onClick={handleAddTemplate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Notification Logs</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {isEditorOpen ? (
            <EmailTemplateEditor
              initialData={selectedTemplate}
              onSuccess={closeEditor}
              onCancel={handleEditorClose}
            />
          ) : (
            <EmailTemplateList onEditTemplate={handleEditTemplate} />
          )}
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookConfigList />
        </TabsContent>

        <TabsContent value="logs">
          <NotificationLogsList />
        </TabsContent>

        <TabsContent value="health">
          <NotificationSystemHealth />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center">
                <p className="text-muted-foreground">Notification system settings will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationDashboard;

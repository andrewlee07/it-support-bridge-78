import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MailCheck, 
  Settings, 
  Info, 
  Trash2, 
  Calendar, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  ListChecks,
  User,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { EmailTemplate, EventType } from '@/utils/types/email';

interface EmailNotificationServiceProps {
  userId?: string;
}

const EmailNotificationService: React.FC<EmailNotificationServiceProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailSettings, setEmailSettings] = useState({
    taskAssigned: true,
    taskDueSoon: true,
    taskOverdue: true,
    taskStatusChanged: true,
    taskCreated: false,
    dailySummary: true
  });

  const handleToggleEmailEnabled = async (checked: boolean) => {
    setEmailEnabled(checked);
    if (checked) {
      toast.success('Email notifications enabled');
    } else {
      toast.info('Email notifications disabled');
    }
  };

  const handleToggleSetting = (setting: string, checked: boolean) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: checked
    }));
    toast.success(`Setting updated`);
  };

  const triggerTestEmail = async () => {
    try {
      await emailNotificationApi.testEmailTemplate({
        subject: 'Test Email from Task Management System',
        body: 'This is a test email to verify your notification settings are working correctly.'
      });
      toast.success('Test email sent');
    } catch (error) {
      toast.error('Failed to send test email');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Email Notifications</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="email-enabled" className="text-sm text-muted-foreground">
              {emailEnabled ? 'Enabled' : 'Disabled'}
            </Label>
            <Switch 
              id="email-enabled" 
              checked={emailEnabled} 
              onCheckedChange={handleToggleEmailEnabled} 
              aria-label="Toggle email notifications"
            />
          </div>
        </div>
        <CardDescription>Configure how and when you receive email notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Task Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-assigned" className="flex items-center">
                    <Badge className="mr-2 bg-blue-500" variant="secondary">
                      <User className="h-3 w-3 mr-1" />
                      Assigned
                    </Badge>
                    When tasks are assigned to me
                  </Label>
                  <Switch 
                    id="task-assigned" 
                    checked={emailSettings.taskAssigned} 
                    onCheckedChange={(checked) => handleToggleSetting('taskAssigned', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-due-soon" className="flex items-center">
                    <Badge className="mr-2 bg-amber-500" variant="secondary">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due Soon
                    </Badge>
                    When tasks are due within 24 hours
                  </Label>
                  <Switch 
                    id="task-due-soon" 
                    checked={emailSettings.taskDueSoon} 
                    onCheckedChange={(checked) => handleToggleSetting('taskDueSoon', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-overdue" className="flex items-center">
                    <Badge className="mr-2 bg-red-500" variant="secondary">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Overdue
                    </Badge>
                    When tasks become overdue
                  </Label>
                  <Switch 
                    id="task-overdue" 
                    checked={emailSettings.taskOverdue} 
                    onCheckedChange={(checked) => handleToggleSetting('taskOverdue', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-status-changed" className="flex items-center">
                    <Badge className="mr-2 bg-purple-500" variant="secondary">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Status
                    </Badge>
                    When task status changes
                  </Label>
                  <Switch 
                    id="task-status-changed" 
                    checked={emailSettings.taskStatusChanged} 
                    onCheckedChange={(checked) => handleToggleSetting('taskStatusChanged', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-created" className="flex items-center">
                    <Badge className="mr-2 bg-green-500" variant="secondary">
                      <Plus className="h-3 w-3 mr-1" />
                      Created
                    </Badge>
                    When new tasks are created
                  </Label>
                  <Switch 
                    id="task-created" 
                    checked={emailSettings.taskCreated} 
                    onCheckedChange={(checked) => handleToggleSetting('taskCreated', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-summary" className="flex items-center">
                    <Badge className="mr-2 bg-indigo-500" variant="secondary">
                      <ListChecks className="h-3 w-3 mr-1" />
                      Summary
                    </Badge>
                    Daily summary of tasks
                  </Label>
                  <Switch 
                    id="daily-summary" 
                    checked={emailSettings.dailySummary} 
                    onCheckedChange={(checked) => handleToggleSetting('dailySummary', checked)}
                    disabled={!emailEnabled}
                  />
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t">
                <Button onClick={triggerTestEmail} disabled={!emailEnabled} className="w-full">
                  <MailCheck className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <EmailTemplateList />
          </TabsContent>
          
          <TabsContent value="history">
            <EmailNotificationHistory userId={userId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Sub-component for Email Templates List
const EmailTemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await emailNotificationApi.getEmailTemplates();
        if (response.success) {
          setTemplates(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch email templates:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  if (templates.length === 0) {
    return (
      <div className="text-center py-8">
        <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">No email templates</h3>
        <p className="text-muted-foreground">No email templates are configured yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">{template.name}</CardTitle>
              <Badge variant={template.isActive ? "default" : "outline"}>
                {template.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Trigger: {template.triggerOn.replace(/-/g, ' ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm font-medium">Subject: {template.subject}</div>
            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.body}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Sub-component for Email Notification History
const EmailNotificationHistory: React.FC<{ userId?: string }> = ({ userId }) => {
  // This would fetch from a real API in a production environment
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">Email History</h3>
        <p className="text-muted-foreground">Your recent email notification history will appear here.</p>
      </div>
    </div>
  );
};

export default EmailNotificationService;


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  BellRing, 
  Settings2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotificationSettings as Settings } from '@/components/shared/notifications/types';
import NotificationCategoriesSection from '@/components/settings/notifications/NotificationCategoriesSection';
import DeliveryMethodsSection from '@/components/settings/notifications/DeliveryMethodsSection';
import PriorityLevelsSection from '@/components/settings/notifications/PriorityLevelsSection';
import EmailNotificationService from '@/components/shared/notifications/EmailNotificationService';
import { useAuth } from '@/contexts/AuthContext';

interface NotificationSettingsProps {
  settings: Settings;
  onToggle: (category: string, value: string) => void;
  onSave: () => void;
  onBack: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onToggle,
  onSave,
  onBack
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold">Notification Settings</h2>
        </div>
        <Link to="/settings" className="text-sm text-blue-500 hover:underline">
          All Settings
        </Link>
      </div>
      
      <div className="p-3 space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <NotificationCategoriesSection
                categories={settings.categories}
                onToggle={onToggle}
              />
              
              <DeliveryMethodsSection
                methods={settings.deliveryMethods}
                onToggle={onToggle}
              />
              
              <PriorityLevelsSection
                levels={settings.priorityLevels}
                onToggle={onToggle}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="email">
            <EmailNotificationService userId={user?.id} />
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Advanced Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Notification Digests</Label>
                    <p className="text-sm text-muted-foreground">
                      Group multiple notifications into a single digest message
                    </p>
                  </div>
                  <Switch id="notification-digests" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Only deliver high priority notifications during off hours
                    </p>
                  </div>
                  <Switch id="quiet-hours" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications on your desktop when the browser is open
                    </p>
                  </div>
                  <Switch id="desktop-notifications" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="border-t p-3 flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>Cancel</Button>
        <Button onClick={onSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;

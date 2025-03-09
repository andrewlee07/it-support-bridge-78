
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NotificationCategoriesSection from './notifications/NotificationCategoriesSection';
import DeliveryMethodsSection from './notifications/DeliveryMethodsSection';
import PriorityLevelsSection from './notifications/PriorityLevelsSection';
import { NotificationSettings } from '@/hooks/useUserSettings';

interface NotificationsTabProps {
  notificationSettings: NotificationSettings;
  handleNotificationToggle: (category: string, value: string) => void;
  handleSave: () => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ 
  notificationSettings, 
  handleNotificationToggle, 
  handleSave 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Control which notifications you receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <NotificationCategoriesSection 
          categories={notificationSettings.categories} 
          onToggle={handleNotificationToggle} 
        />
        
        <DeliveryMethodsSection 
          methods={notificationSettings.deliveryMethods} 
          onToggle={handleNotificationToggle} 
        />
        
        <PriorityLevelsSection 
          levels={notificationSettings.priorityLevels} 
          onToggle={handleNotificationToggle} 
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;

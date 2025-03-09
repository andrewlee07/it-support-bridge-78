
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotificationSettings as Settings } from './types';
import NotificationCategoriesSection from '@/components/settings/notifications/NotificationCategoriesSection';
import DeliveryMethodsSection from '@/components/settings/notifications/DeliveryMethodsSection';
import PriorityLevelsSection from '@/components/settings/notifications/PriorityLevelsSection';

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
  return (
    <div>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onBack}
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
      
      <div className="border-t p-3">
        <Button className="w-full" onClick={onSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;

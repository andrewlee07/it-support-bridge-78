
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { NotificationSettings } from '@/components/shared/notifications/types';

export const useUserSettings = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    categories: {
      incidents: true,
      security: true,
      bugs: true,
      testCases: true,
      backlogItems: true,
      releases: true,
      assets: true,
      changes: true,
      knowledge: true,
      tasks: true
    },
    deliveryMethods: {
      inApp: true,
      email: true
    },
    priorityLevels: {
      critical: true,
      high: true,
      medium: false,
      low: false
    }
  });

  const handleNotificationToggle = (category: string, value: string) => {
    setNotificationSettings(prev => {
      if (category.includes('.')) {
        const [mainCategory, subCategory] = category.split('.');
        return {
          ...prev,
          [mainCategory]: {
            ...prev[mainCategory],
            [subCategory]: value
          }
        };
      }
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [value]: !prev[category][value]
        }
      };
    });
  };
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    toast({
      title: "Theme updated",
      description: `Theme set to ${!isDark ? 'dark' : 'light'} mode`,
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return {
    isDark,
    notificationSettings,
    toggleTheme,
    handleNotificationToggle,
    handleSave
  };
};

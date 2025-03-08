
import { useState, useEffect } from 'react';
import { 
  StatusSynchronizationSettings, 
  defaultStatusSynchronizationSettings 
} from '@/utils/types/StatusSynchronizationSettings';
import { toast } from 'sonner';

// This is a mock implementation for now
export const useStatusSynchronization = () => {
  const [settings, setSettings] = useState<StatusSynchronizationSettings>(
    defaultStatusSynchronizationSettings
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to load settings
    setTimeout(() => {
      // Try to load from localStorage
      const savedSettings = localStorage.getItem('statusSyncSettings');
      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings));
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
          // Fall back to defaults
          setSettings(defaultStatusSynchronizationSettings);
        }
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const updateSettings = (newSettings: StatusSynchronizationSettings) => {
    setSettings(newSettings);
    
    // Save to localStorage for persistence
    localStorage.setItem('statusSyncSettings', JSON.stringify(newSettings));
    
    toast.success('Status synchronization settings updated');
    return true;
  };

  // Add the validateConfiguration function
  const validateConfiguration = (config: StatusSynchronizationSettings): boolean => {
    // Simple validation - ensures all required fields are present
    return (
      config.enableCascadingUpdates !== undefined &&
      config.enableDateSynchronization !== undefined &&
      config.notifyOnStatusChange !== undefined &&
      config.allowOverrides !== undefined &&
      !!config.releaseToBacklogMapping &&
      !!config.releaseToBugMapping
    );
  };

  return {
    settings,
    isLoading,
    updateSettings,
    validateConfiguration
  };
};

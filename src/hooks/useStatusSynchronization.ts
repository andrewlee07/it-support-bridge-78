
import { useState, useEffect } from 'react';
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { MandatoryFieldConfig } from '@/utils/types/configuration';
import { useToast } from './use-toast';
import { 
  getStatusSynchronizationSettings, 
  updateStatusSynchronizationSettings,
  getMandatoryFieldsConfig,
  updateMandatoryFieldsConfig
} from '@/api/statusSynchronization';

export const useStatusSynchronization = () => {
  const [settings, setSettings] = useState<StatusSynchronizationSettings>({
    enableCascadingUpdates: true,
    enableDateSynchronization: false,
    notifyOnStatusChange: true,
    allowOverrides: true,
    releaseToBacklogMapping: {
      'Planned': 'open',
      'In Progress': 'in-progress',
      'Deployed': 'completed',
      'Cancelled': 'deferred'
    },
    releaseToBugMapping: {
      'Planned': 'open',
      'In Progress': 'in_progress',
      'Deployed': 'fixed',
      'Cancelled': 'closed'
    }
  });

  const [mandatoryFields, setMandatoryFields] = useState<MandatoryFieldConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await getStatusSynchronizationSettings();
      setSettings(data);
      
      // Fetch mandatory fields
      const fields = await getMandatoryFieldsConfig('release');
      setMandatoryFields(fields);
      
      setError(null);
    } catch (err) {
      setError('Failed to load settings');
      toast({
        title: 'Error',
        description: 'Failed to load settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: StatusSynchronizationSettings) => {
    setIsLoading(true);
    try {
      await updateStatusSynchronizationSettings(newSettings);
      setSettings(newSettings);
      toast({
        title: 'Settings updated',
        description: 'Status synchronization settings have been updated successfully.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateMandatoryFields = async (fields: MandatoryFieldConfig[]) => {
    setIsLoading(true);
    try {
      await updateMandatoryFieldsConfig('release', fields);
      setMandatoryFields(fields);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update mandatory fields. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateConfiguration = () => {
    // Validate the configuration (e.g., make sure all necessary mappings exist)
    return true;
  };

  const refresh = () => {
    fetchSettings();
  };

  return {
    settings,
    updateSettings,
    mandatoryFields,
    updateMandatoryFields,
    isLoading,
    error,
    validateConfiguration,
    refresh,
  };
};


import { useState, useEffect } from 'react';
import { ConfigurableEntityType, ModuleConfiguration } from '@/utils/types/configuration';
import { toast } from 'sonner';

// Mock data - in a real app this would come from an API
const mockModuleConfigurations: ModuleConfiguration[] = [
  {
    id: 'incident-autoclose-1',
    moduleType: 'incident',
    configType: 'autoClose',
    configName: 'autoCloseTimeframeInDays',
    configDisplayName: 'Auto-close Timeframe (Days)',
    configValue: '5',
    description: 'Number of days after which resolved incidents are automatically closed',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-request-autoclose-1',
    moduleType: 'service-request',
    configType: 'autoClose',
    configName: 'autoCloseTimeframeInDays',
    configDisplayName: 'Auto-close Timeframe (Days)',
    configValue: '5',
    description: 'Number of days after which fulfilled service requests are automatically closed',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useModuleConfigurations = (moduleType: ConfigurableEntityType) => {
  const [configurations, setConfigurations] = useState<ModuleConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    // Filter mock configurations by module type
    const filteredConfigs = mockModuleConfigurations.filter(
      config => config.moduleType === moduleType
    );
    
    setTimeout(() => {
      setConfigurations(filteredConfigs);
      setIsLoading(false);
    }, 500);
  }, [moduleType]);

  const updateConfiguration = (configId: string, newValue: string) => {
    setConfigurations(prevConfigs => 
      prevConfigs.map(config => 
        config.id === configId 
          ? { ...config, configValue: newValue, updatedAt: new Date() } 
          : config
      )
    );
    
    // Update mock data as well (to persist changes in this demo)
    const configIndex = mockModuleConfigurations.findIndex(c => c.id === configId);
    if (configIndex !== -1) {
      mockModuleConfigurations[configIndex].configValue = newValue;
      mockModuleConfigurations[configIndex].updatedAt = new Date();
    }
    
    toast.success('Configuration updated successfully');
    
    return true;
  };

  return {
    configurations,
    isLoading,
    updateConfiguration
  };
};

// Helper function to get a specific configuration value
export const getConfigurationValue = (
  moduleType: ConfigurableEntityType,
  configName: string,
  defaultValue: string
): string => {
  const config = mockModuleConfigurations.find(
    c => c.moduleType === moduleType && c.configName === configName && c.isActive
  );
  
  return config ? config.configValue : defaultValue;
};

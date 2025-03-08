
import { 
  ConfigurableDropdown, 
  DropdownOption,
  ApiResponse,
  PaginatedResponse
} from '../../types';
import { 
  getDropdownConfigurations, 
  setDropdownConfigurations,
  getDropdownConfigurationById,
  getDropdownConfigurationsByEntityType
} from '../../mockData/dropdownConfigurations';
import { 
  simulateApiResponse, 
  simulatePaginatedResponse, 
  createApiErrorResponse, 
  createApiSuccessResponse 
} from '../../mockData/apiHelpers';

// Helper function to find configuration and option indices
export const findConfigurationAndOption = (
  configId: string,
  optionId?: string
): { 
  configurations: ConfigurableDropdown[],
  configIndex: number, 
  configuration?: ConfigurableDropdown,
  optionIndex?: number
} => {
  const configurations = getDropdownConfigurations();
  const configIndex = configurations.findIndex(config => config.id === configId);
  
  if (configIndex === -1) {
    return { configurations, configIndex: -1 };
  }
  
  const configuration = configurations[configIndex];
  
  if (!optionId) {
    return { configurations, configIndex, configuration };
  }
  
  const optionIndex = configuration.options.findIndex(option => option.id === optionId);
  
  return { configurations, configIndex, configuration, optionIndex };
};

// Helper function to update configurations in storage
export const updateConfigurations = (
  configurations: ConfigurableDropdown[],
  configIndex: number,
  updatedConfiguration: ConfigurableDropdown
): ConfigurableDropdown[] => {
  const updatedConfigurations = [
    ...configurations.slice(0, configIndex),
    updatedConfiguration,
    ...configurations.slice(configIndex + 1),
  ];
  
  setDropdownConfigurations(updatedConfigurations);
  
  return updatedConfigurations;
};

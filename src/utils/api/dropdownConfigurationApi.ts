
import { v4 as uuidv4 } from 'uuid';
import { 
  ConfigurableDropdown, 
  DropdownOption, 
  ConfigurableEntityType,
  ApiResponse,
  PaginatedResponse
} from '../types';
import { 
  getDropdownConfigurations, 
  setDropdownConfigurations,
  getDropdownConfigurationById,
  getDropdownConfigurationsByEntityType,
  createDropdownOption
} from '../mockData/dropdownConfigurations';
import { simulateApiResponse, simulatePaginatedResponse } from '../mockData/apiHelpers';

export const dropdownConfigurationApi = {
  // Get all dropdown configurations
  getAllDropdownConfigurations: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<ConfigurableDropdown>> => {
    const configurations = getDropdownConfigurations();
    return simulatePaginatedResponse(configurations, page, limit);
  },
  
  // Get dropdown configurations by entity type
  getDropdownConfigurationsByEntity: async (
    entityType: ConfigurableEntityType,
  ): Promise<ApiResponse<ConfigurableDropdown[]>> => {
    const configurations = getDropdownConfigurationsByEntityType(entityType);
    return simulateApiResponse(configurations);
  },
  
  // Get a single dropdown configuration by ID
  getDropdownConfigurationById: async (
    id: string
  ): Promise<ApiResponse<ConfigurableDropdown>> => {
    const configuration = getDropdownConfigurationById(id);
    
    if (!configuration) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    return simulateApiResponse(configuration);
  },
  
  // Create a new dropdown configuration
  createDropdownConfiguration: async (
    data: {
      entityType: ConfigurableEntityType;
      fieldName: string;
      displayName: string;
      isRequired: boolean;
      options: { label: string; value: string; }[];
    }
  ): Promise<ApiResponse<ConfigurableDropdown>> => {
    const configurations = getDropdownConfigurations();
    
    // Check for duplicate field name for this entity type
    const isDuplicate = configurations.some(
      config => config.entityType === data.entityType && config.fieldName === data.fieldName
    );
    
    if (isDuplicate) {
      return {
        success: false,
        error: `A configuration for ${data.entityType} with field name '${data.fieldName}' already exists`,
      };
    }
    
    const now = new Date();
    const newConfiguration: ConfigurableDropdown = {
      id: uuidv4(),
      entityType: data.entityType,
      fieldName: data.fieldName,
      displayName: data.displayName,
      options: data.options.map((option, index) => ({
        id: uuidv4(),
        label: option.label,
        value: option.value,
        isActive: true,
        sortOrder: index + 1,
      })),
      isRequired: data.isRequired,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    
    const updatedConfigurations = [...configurations, newConfiguration];
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(newConfiguration);
  },
  
  // Update an existing dropdown configuration
  updateDropdownConfiguration: async (
    id: string,
    data: Partial<Omit<ConfigurableDropdown, 'id' | 'entityType' | 'fieldName' | 'createdAt'>>
  ): Promise<ApiResponse<ConfigurableDropdown>> => {
    const configurations = getDropdownConfigurations();
    const configIndex = configurations.findIndex(config => config.id === id);
    
    if (configIndex === -1) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    const updatedConfiguration = {
      ...configurations[configIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    const updatedConfigurations = [
      ...configurations.slice(0, configIndex),
      updatedConfiguration,
      ...configurations.slice(configIndex + 1),
    ];
    
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(updatedConfiguration);
  },
  
  // Add a new option to a dropdown configuration
  addDropdownOption: async (
    configId: string,
    data: { label: string; value: string; }
  ): Promise<ApiResponse<DropdownOption>> => {
    const configurations = getDropdownConfigurations();
    const configIndex = configurations.findIndex(config => config.id === configId);
    
    if (configIndex === -1) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    const configuration = configurations[configIndex];
    
    // Check for duplicate value
    const isDuplicate = configuration.options.some(option => option.value === data.value);
    if (isDuplicate) {
      return {
        success: false,
        error: `An option with value '${data.value}' already exists in this dropdown`,
      };
    }
    
    const newOption = createDropdownOption(configId, data.label, data.value);
    
    const updatedConfiguration = {
      ...configuration,
      options: [...configuration.options, newOption],
      updatedAt: new Date(),
    };
    
    const updatedConfigurations = [
      ...configurations.slice(0, configIndex),
      updatedConfiguration,
      ...configurations.slice(configIndex + 1),
    ];
    
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(newOption);
  },
  
  // Update a dropdown option
  updateDropdownOption: async (
    configId: string,
    optionId: string,
    data: Partial<Omit<DropdownOption, 'id'>>
  ): Promise<ApiResponse<DropdownOption>> => {
    const configurations = getDropdownConfigurations();
    const configIndex = configurations.findIndex(config => config.id === configId);
    
    if (configIndex === -1) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    const configuration = configurations[configIndex];
    const optionIndex = configuration.options.findIndex(option => option.id === optionId);
    
    if (optionIndex === -1) {
      return {
        success: false,
        error: 'Dropdown option not found',
      };
    }
    
    // If trying to update the value, check for duplicates
    if (data.value && data.value !== configuration.options[optionIndex].value) {
      const isDuplicate = configuration.options.some(
        (option, idx) => idx !== optionIndex && option.value === data.value
      );
      
      if (isDuplicate) {
        return {
          success: false,
          error: `An option with value '${data.value}' already exists in this dropdown`,
        };
      }
    }
    
    const updatedOption = {
      ...configuration.options[optionIndex],
      ...data,
    };
    
    const updatedOptions = [
      ...configuration.options.slice(0, optionIndex),
      updatedOption,
      ...configuration.options.slice(optionIndex + 1),
    ];
    
    const updatedConfiguration = {
      ...configuration,
      options: updatedOptions,
      updatedAt: new Date(),
    };
    
    const updatedConfigurations = [
      ...configurations.slice(0, configIndex),
      updatedConfiguration,
      ...configurations.slice(configIndex + 1),
    ];
    
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(updatedOption);
  },
  
  // Delete a dropdown option (soft delete by setting isActive to false)
  deleteDropdownOption: async (
    configId: string,
    optionId: string
  ): Promise<ApiResponse<boolean>> => {
    const configurations = getDropdownConfigurations();
    const configIndex = configurations.findIndex(config => config.id === configId);
    
    if (configIndex === -1) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    const configuration = configurations[configIndex];
    const optionIndex = configuration.options.findIndex(option => option.id === optionId);
    
    if (optionIndex === -1) {
      return {
        success: false,
        error: 'Dropdown option not found',
      };
    }
    
    const updatedOption = {
      ...configuration.options[optionIndex],
      isActive: false,
    };
    
    const updatedOptions = [
      ...configuration.options.slice(0, optionIndex),
      updatedOption,
      ...configuration.options.slice(optionIndex + 1),
    ];
    
    const updatedConfiguration = {
      ...configuration,
      options: updatedOptions,
      updatedAt: new Date(),
    };
    
    const updatedConfigurations = [
      ...configurations.slice(0, configIndex),
      updatedConfiguration,
      ...configurations.slice(configIndex + 1),
    ];
    
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(true);
  },
  
  // Reorder dropdown options
  reorderDropdownOptions: async (
    configId: string,
    optionIds: string[]
  ): Promise<ApiResponse<boolean>> => {
    const configurations = getDropdownConfigurations();
    const configIndex = configurations.findIndex(config => config.id === configId);
    
    if (configIndex === -1) {
      return {
        success: false,
        error: 'Dropdown configuration not found',
      };
    }
    
    const configuration = configurations[configIndex];
    
    // Validate that all option IDs exist in the configuration
    const optionExists = optionIds.every(id => 
      configuration.options.some(option => option.id === id)
    );
    
    if (!optionExists) {
      return {
        success: false,
        error: 'One or more option IDs are invalid',
      };
    }
    
    // Create a map of option IDs to options
    const optionsMap = configuration.options.reduce<Record<string, DropdownOption>>(
      (acc, option) => {
        acc[option.id] = option;
        return acc;
      },
      {}
    );
    
    // Create new options array with updated sort orders
    const updatedOptions = optionIds.map((id, index) => ({
      ...optionsMap[id],
      sortOrder: index + 1,
    }));
    
    // Add any options that weren't in the reorder list at the end
    const missingOptions = configuration.options.filter(
      option => !optionIds.includes(option.id)
    );
    
    const allOptions = [
      ...updatedOptions,
      ...missingOptions.map((option, index) => ({
        ...option,
        sortOrder: updatedOptions.length + index + 1,
      })),
    ];
    
    const updatedConfiguration = {
      ...configuration,
      options: allOptions,
      updatedAt: new Date(),
    };
    
    const updatedConfigurations = [
      ...configurations.slice(0, configIndex),
      updatedConfiguration,
      ...configurations.slice(configIndex + 1),
    ];
    
    setDropdownConfigurations(updatedConfigurations);
    
    return simulateApiResponse(true);
  },
};

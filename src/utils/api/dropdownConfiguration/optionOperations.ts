
import { v4 as uuidv4 } from 'uuid';
import { 
  DropdownOption,
  ApiResponse
} from '../../types';
import { createDropdownOption } from '../../mockData/dropdownConfigurations';
import { 
  createApiErrorResponse,
  createApiSuccessResponse
} from '../../mockData/apiHelpers';
import { findConfigurationAndOption, updateConfigurations } from './apiHelpers';

// Add a new option to a dropdown configuration
export const addDropdownOption = async (
  configId: string,
  data: { label: string; value: string; }
): Promise<ApiResponse<DropdownOption>> => {
  const { configurations, configIndex, configuration } = findConfigurationAndOption(configId);
  
  if (configIndex === -1) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  // Check for duplicate value
  const isDuplicate = configuration!.options.some(option => option.value === data.value);
  if (isDuplicate) {
    return createApiErrorResponse(`An option with value '${data.value}' already exists in this dropdown`, 400);
  }
  
  const newOption = createDropdownOption(configId, data.label, data.value);
  
  const updatedConfiguration = {
    ...configuration!,
    options: [...configuration!.options, newOption],
    updatedAt: new Date(),
  };
  
  updateConfigurations(configurations, configIndex, updatedConfiguration);
  
  return createApiSuccessResponse(newOption);
};

// Update a dropdown option
export const updateDropdownOption = async (
  configId: string,
  optionId: string,
  data: Partial<Omit<DropdownOption, 'id'>>
): Promise<ApiResponse<DropdownOption>> => {
  const { configurations, configIndex, configuration, optionIndex } = 
    findConfigurationAndOption(configId, optionId);
  
  if (configIndex === -1) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  if (optionIndex === -1 || optionIndex === undefined) {
    return createApiErrorResponse('Dropdown option not found', 404);
  }
  
  // If trying to update the value, check for duplicates
  if (data.value && data.value !== configuration!.options[optionIndex].value) {
    const isDuplicate = configuration!.options.some(
      (option, idx) => idx !== optionIndex && option.value === data.value
    );
    
    if (isDuplicate) {
      return createApiErrorResponse(`An option with value '${data.value}' already exists in this dropdown`, 400);
    }
  }
  
  const updatedOption = {
    ...configuration!.options[optionIndex],
    ...data,
  };
  
  const updatedOptions = [
    ...configuration!.options.slice(0, optionIndex),
    updatedOption,
    ...configuration!.options.slice(optionIndex + 1),
  ];
  
  const updatedConfiguration = {
    ...configuration!,
    options: updatedOptions,
    updatedAt: new Date(),
  };
  
  updateConfigurations(configurations, configIndex, updatedConfiguration);
  
  return createApiSuccessResponse(updatedOption);
};

// Delete a dropdown option (soft delete by setting isActive to false)
export const deleteDropdownOption = async (
  configId: string,
  optionId: string
): Promise<ApiResponse<boolean>> => {
  const { configurations, configIndex, configuration, optionIndex } = 
    findConfigurationAndOption(configId, optionId);
  
  if (configIndex === -1) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  if (optionIndex === -1 || optionIndex === undefined) {
    return createApiErrorResponse('Dropdown option not found', 404);
  }
  
  const updatedOption = {
    ...configuration!.options[optionIndex],
    isActive: false,
  };
  
  const updatedOptions = [
    ...configuration!.options.slice(0, optionIndex),
    updatedOption,
    ...configuration!.options.slice(optionIndex + 1),
  ];
  
  const updatedConfiguration = {
    ...configuration!,
    options: updatedOptions,
    updatedAt: new Date(),
  };
  
  updateConfigurations(configurations, configIndex, updatedConfiguration);
  
  return createApiSuccessResponse(true);
};

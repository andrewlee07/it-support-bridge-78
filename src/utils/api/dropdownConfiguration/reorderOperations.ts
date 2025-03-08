
import { 
  DropdownOption,
  ApiResponse
} from '../../types';
import { 
  createApiErrorResponse,
  createApiSuccessResponse
} from '../../mockData/apiHelpers';
import { findConfigurationAndOption, updateConfigurations } from './apiHelpers';

// Reorder dropdown options
export const reorderDropdownOptions = async (
  configId: string,
  optionIds: string[]
): Promise<ApiResponse<boolean>> => {
  const { configurations, configIndex, configuration } = findConfigurationAndOption(configId);
  
  if (configIndex === -1) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  // Validate that all option IDs exist in the configuration
  const optionExists = optionIds.every(id => 
    configuration!.options.some(option => option.id === id)
  );
  
  if (!optionExists) {
    return createApiErrorResponse('One or more option IDs are invalid', 400);
  }
  
  // Create a map of option IDs to options
  const optionsMap = configuration!.options.reduce<Record<string, DropdownOption>>(
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
  const missingOptions = configuration!.options.filter(
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
    ...configuration!,
    options: allOptions,
    updatedAt: new Date(),
  };
  
  updateConfigurations(configurations, configIndex, updatedConfiguration);
  
  return createApiSuccessResponse(true);
};

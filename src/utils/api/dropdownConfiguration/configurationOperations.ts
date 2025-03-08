
import { v4 as uuidv4 } from 'uuid';
import { 
  ConfigurableDropdown, 
  ConfigurableEntityType,
  ApiResponse,
  PaginatedResponse
} from '../../types';
import { 
  getDropdownConfigurations, 
  setDropdownConfigurations,
  getDropdownConfigurationById as getConfigById,
  getDropdownConfigurationsByEntityType
} from '../../mockData/dropdownConfigurations';
import { 
  simulateApiResponse, 
  simulatePaginatedResponse, 
  createApiErrorResponse, 
  createApiSuccessResponse 
} from '../../mockData/apiHelpers';
import { findConfigurationAndOption, updateConfigurations } from './apiHelpers';

// Get all dropdown configurations
export const getAllDropdownConfigurations = async (
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<ConfigurableDropdown>> => {
  const configurations = getDropdownConfigurations();
  return simulatePaginatedResponse(configurations, page, limit);
};

// Get dropdown configurations by entity type
export const getDropdownConfigurationsByEntity = async (
  entityType: ConfigurableEntityType,
): Promise<ApiResponse<ConfigurableDropdown[]>> => {
  const configurations = getDropdownConfigurationsByEntityType(entityType);
  return simulateApiResponse(configurations);
};

// Get a single dropdown configuration by ID
export const getDropdownConfigurationById = async (
  id: string
): Promise<ApiResponse<ConfigurableDropdown>> => {
  const configuration = getConfigById(id);
  
  if (!configuration) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  return createApiSuccessResponse(configuration);
};

// Create a new dropdown configuration
export const createDropdownConfiguration = async (
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
    return createApiErrorResponse(`A configuration for ${data.entityType} with field name '${data.fieldName}' already exists`, 400);
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
  
  return createApiSuccessResponse(newConfiguration);
};

// Update an existing dropdown configuration
export const updateDropdownConfiguration = async (
  id: string,
  data: Partial<Omit<ConfigurableDropdown, 'id' | 'entityType' | 'fieldName' | 'createdAt'>>
): Promise<ApiResponse<ConfigurableDropdown>> => {
  const { configurations, configIndex, configuration } = findConfigurationAndOption(id);
  
  if (configIndex === -1) {
    return createApiErrorResponse('Dropdown configuration not found', 404);
  }
  
  const updatedConfiguration = {
    ...configuration!,
    ...data,
    updatedAt: new Date(),
  };
  
  updateConfigurations(configurations, configIndex, updatedConfiguration);
  
  return createApiSuccessResponse(updatedConfiguration);
};


export interface ModuleConfiguration {
  id: string;
  moduleName: string;
  configKey: string;
  configValue: string;
  configDisplayName: string;
  description: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  isEnabled: boolean;
  isSystem: boolean;
  validationRegex?: string;
  allowedValues?: string[];
  
  // Fields needed by existing components
  moduleType?: string;
  configType?: string;
  configName?: string;
  isActive?: boolean;
}

export type ConfigurableEntityType = 
  | 'ticket' 
  | 'asset' 
  | 'change' 
  | 'bug' 
  | 'user' 
  | 'service'
  | 'incident'
  | 'service-request'
  | 'task'
  | 'problem'
  | 'release';

export interface MandatoryFieldConfig {
  id?: string; // Make id optional to allow objects without id
  entityType: ConfigurableEntityType;
  fieldName: string;
  displayName: string;
  description?: string;
  isRequired: boolean;
  isResolutionField?: boolean;
  isSystem?: boolean;
  order?: number;
}

export interface DropdownOption {
  id: string;
  value: string;
  label: string;
  color?: string;
  isDefault?: boolean;
  order: number;
  isDisabled?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface ConfigurableDropdown {
  id: string;
  entityType: ConfigurableEntityType;
  fieldName: string;
  displayName: string;
  description?: string;
  isRequired: boolean;
  isMulti: boolean;
  isSortable: boolean;
  options: DropdownOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  configId?: string | null;
  onClose: () => void;
  isNew?: boolean;
}

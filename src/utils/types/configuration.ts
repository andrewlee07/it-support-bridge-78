
// Define the entity types that can be configured in the system
export type ConfigurableEntityType = 
  | 'incident' 
  | 'service-request'
  | 'problem'
  | 'change'
  | 'backlog-item'
  | 'security'
  | 'bug'
  | 'ticket'
  | 'asset'
  | 'user'
  | 'release';

// Configuration metadata
export interface ConfigurationMeta {
  entityType: ConfigurableEntityType;
  lastModified: Date;
  modifiedBy: string;
  version: number;
}

// Define the structure for a configurable dropdown
export interface ConfigurableDropdown {
  id: string;
  name: string;
  options: DropdownOption[];
  entityType: ConfigurableEntityType;
  displayName: string;
  fieldName: string;
  isRequired: boolean;
}

// Define the structure for a dropdown option
export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  color?: string;
  isActive?: boolean;
  sortOrder?: number;
}

// Props for the DropdownConfigForm
export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  onSave: (dropdown: ConfigurableDropdown) => void;
  onCancel: () => void;
  onClose: () => void;
  isNew: boolean;
  configId?: string;
}

// Define the structure for mandatory field configuration
export interface MandatoryFieldConfig {
  fieldName: string;
  displayName: string;
  isRequired: boolean;
  entityType: ConfigurableEntityType;
  description?: string;
  isResolutionField?: boolean;
}

// Define the structure for module configuration
export interface ModuleConfiguration {
  id: string;
  moduleName: string;
  configName: string;
  configDisplayName: string;
  configValue: string;
  description: string;
  updatedAt: Date;
  updatedBy: string;
  isEnabled: boolean;
}

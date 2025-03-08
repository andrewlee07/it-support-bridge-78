// Configuration types for dropdown fields
export type ConfigurableEntityType = 'ticket' | 'asset' | 'change' | 'user' | 'incident' | 'service-request' | 'backlog' | 'release' | 'problem' | 'bug';

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ConfigurableDropdown {
  id: string;
  entityType: ConfigurableEntityType;
  fieldName: string;
  displayName: string;
  options: DropdownOption[];
  isRequired: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Configuration settings for dropdown fields in admin panel
export interface DropdownConfigFormProps {
  isNew: boolean;
  configId: string | null;
  entityType: ConfigurableEntityType;
  onClose: () => void;
}

// System configuration types
export interface SystemConfiguration {
  id: string;
  moduleType: ConfigurableEntityType;
  settingName: string;
  settingDisplayName: string;
  settingValue: string;
  settingDataType: 'string' | 'number' | 'boolean' | 'date';
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Module-specific configuration interface
export interface ModuleConfiguration {
  id: string;
  moduleType: ConfigurableEntityType;
  configType: 'sla' | 'workflow' | 'autoClose' | 'notification' | 'general';
  configName: string;
  configDisplayName: string;
  configValue: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Configuration for mandatory fields
export interface MandatoryFieldConfig {
  fieldName: string;
  displayName: string;
  isRequired: boolean;
  entityType: ConfigurableEntityType;
  description?: string;
}

// Updated module configuration to include mandatory fields
export interface ModuleConfigurationWithMandatory extends ModuleConfiguration {
  mandatoryFields?: MandatoryFieldConfig[];
}

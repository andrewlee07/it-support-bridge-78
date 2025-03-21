
export type ConfigurableEntityType = 
  | 'incident' 
  | 'service-request' 
  | 'change' 
  | 'problem' 
  | 'security' 
  | 'ticket' 
  | 'asset' 
  | 'user' 
  | 'release' 
  | 'bug' 
  | 'backlog';

export interface MandatoryFieldConfig {
  fieldName: string;
  displayName: string;
  isRequired: boolean;
  entityType: ConfigurableEntityType;
  description?: string;
  isResolutionField?: boolean;
}

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface ConfigurableDropdown {
  id: string;
  entityType: ConfigurableEntityType;
  options: DropdownOption[];
  createdAt: Date;
  updatedAt: Date;
  displayName?: string;
  fieldName?: string;
  isRequired?: boolean;
  isActive?: boolean;
}

export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  onSave: (data: Partial<ConfigurableDropdown>) => void;
  onCancel: () => void;
  configId?: string;
  isNew?: boolean;
  onClose?: () => void;
}

export interface ModuleConfiguration {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  configOptions?: Record<string, any>;
  moduleType?: string;
  configType?: string;
  configName?: string;
  configDisplayName?: string;
  configValue?: string;
  isActive?: boolean;
}

export interface NavigationItem {
  href: string;
  icon?: any;
  title: string;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  submenu?: NavigationItem[];
}

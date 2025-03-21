// Define the entity types that can be configured in the system
export type ConfigurableEntityType = 
  | 'incident' 
  | 'service-request'
  | 'problem'
  | 'change'
  | 'backlog-item'
  | 'security';  // Add the security type

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
}

// Define the structure for a dropdown option
export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  color?: string;
}

// Props for the DropdownConfigForm
export interface DropdownConfigFormProps {
  entityType: ConfigurableEntityType;
  onSave: (dropdown: ConfigurableDropdown) => void;
  onCancel: () => void;
}


// Configuration types for dropdown fields
export type ConfigurableEntityType = 'ticket' | 'asset' | 'change' | 'user' | 'incident' | 'service-request' | 'backlog' | 'release';

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

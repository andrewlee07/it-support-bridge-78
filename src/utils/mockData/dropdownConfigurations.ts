import { v4 as uuidv4 } from 'uuid';
import { ConfigurableDropdown, DropdownOption, ConfigurableEntityType } from '../types';

// Initial dropdown configurations
export const mockDropdownConfigurations: ConfigurableDropdown[] = [
  // Incident configurations
  {
    id: 'dropdown-incident-category',
    entityType: 'incident',
    fieldName: 'category',
    displayName: 'Incident Category',
    options: [
      { id: 'inc-cat-1', label: 'Hardware', value: 'hardware', isActive: true, sortOrder: 1 },
      { id: 'inc-cat-2', label: 'Software', value: 'software', isActive: true, sortOrder: 2 },
      { id: 'inc-cat-3', label: 'Network', value: 'network', isActive: true, sortOrder: 3 },
      { id: 'inc-cat-4', label: 'Access', value: 'access', isActive: true, sortOrder: 4 },
      { id: 'inc-cat-5', label: 'Other', value: 'other', isActive: true, sortOrder: 5 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-incident-priority',
    entityType: 'incident',
    fieldName: 'priority',
    displayName: 'Incident Priority',
    options: [
      { id: 'inc-pri-1', label: 'Low', value: 'low', isActive: true, sortOrder: 1 },
      { id: 'inc-pri-2', label: 'Medium', value: 'medium', isActive: true, sortOrder: 2 },
      { id: 'inc-pri-3', label: 'High', value: 'high', isActive: true, sortOrder: 3 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  // Service request configurations
  {
    id: 'dropdown-service-category',
    entityType: 'service-request',
    fieldName: 'category',
    displayName: 'Service Request Category',
    options: [
      { id: 'srv-cat-1', label: 'Hardware', value: 'hardware', isActive: true, sortOrder: 1 },
      { id: 'srv-cat-2', label: 'Software', value: 'software', isActive: true, sortOrder: 2 },
      { id: 'srv-cat-3', label: 'Network', value: 'network', isActive: true, sortOrder: 3 },
      { id: 'srv-cat-4', label: 'Access', value: 'access', isActive: true, sortOrder: 4 },
      { id: 'srv-cat-5', label: 'Other', value: 'other', isActive: true, sortOrder: 5 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  // Change request configurations
  {
    id: 'dropdown-change-category',
    entityType: 'change',
    fieldName: 'changeCategory',
    displayName: 'Change Category',
    options: [
      { id: 'chg-cat-1', label: 'Standard', value: 'standard', isActive: true, sortOrder: 1 },
      { id: 'chg-cat-2', label: 'Normal', value: 'normal', isActive: true, sortOrder: 2 },
      { id: 'chg-cat-3', label: 'Emergency', value: 'emergency', isActive: true, sortOrder: 3 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-change-priority',
    entityType: 'change',
    fieldName: 'priority',
    displayName: 'Change Priority',
    options: [
      { id: 'chg-pri-1', label: 'Low', value: 'low', isActive: true, sortOrder: 1 },
      { id: 'chg-pri-2', label: 'Medium', value: 'medium', isActive: true, sortOrder: 2 },
      { id: 'chg-pri-3', label: 'High', value: 'high', isActive: true, sortOrder: 3 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-change-closure',
    entityType: 'change',
    fieldName: 'closureReason',
    displayName: 'Change Closure Reason',
    options: [
      { id: 'chg-cls-1', label: 'Successful', value: 'successful', isActive: true, sortOrder: 1 },
      { id: 'chg-cls-2', label: 'Successful with Issues', value: 'successful-with-issues', isActive: true, sortOrder: 2 },
      { id: 'chg-cls-3', label: 'Rolled Back', value: 'rolled-back', isActive: true, sortOrder: 3 },
      { id: 'chg-cls-4', label: 'Failed', value: 'failed', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  // Asset configurations
  {
    id: 'dropdown-asset-type',
    entityType: 'asset',
    fieldName: 'type',
    displayName: 'Asset Type',
    options: [
      { id: 'ast-typ-1', label: 'Hardware', value: 'hardware', isActive: true, sortOrder: 1 },
      { id: 'ast-typ-2', label: 'Software', value: 'software', isActive: true, sortOrder: 2 },
      { id: 'ast-typ-3', label: 'License', value: 'license', isActive: true, sortOrder: 3 },
      { id: 'ast-typ-4', label: 'Other', value: 'other', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-asset-status',
    entityType: 'asset',
    fieldName: 'status',
    displayName: 'Asset Status',
    options: [
      { id: 'ast-sts-1', label: 'Available', value: 'available', isActive: true, sortOrder: 1 },
      { id: 'ast-sts-2', label: 'In Use', value: 'in-use', isActive: true, sortOrder: 2 },
      { id: 'ast-sts-3', label: 'Maintenance', value: 'maintenance', isActive: true, sortOrder: 3 },
      { id: 'ast-sts-4', label: 'Retired', value: 'retired', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  // Bug configurations
  {
    id: 'dropdown-bug-severity',
    entityType: 'bug',
    fieldName: 'severity',
    displayName: 'Bug Severity',
    options: [
      { id: 'bug-sev-1', label: 'Critical', value: 'critical', isActive: true, sortOrder: 1 },
      { id: 'bug-sev-2', label: 'Major', value: 'major', isActive: true, sortOrder: 2 },
      { id: 'bug-sev-3', label: 'Minor', value: 'minor', isActive: true, sortOrder: 3 },
      { id: 'bug-sev-4', label: 'Trivial', value: 'trivial', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-bug-priority',
    entityType: 'bug',
    fieldName: 'priority',
    displayName: 'Bug Priority',
    options: [
      { id: 'bug-pri-1', label: 'Urgent', value: 'urgent', isActive: true, sortOrder: 1 },
      { id: 'bug-pri-2', label: 'High', value: 'high', isActive: true, sortOrder: 2 },
      { id: 'bug-pri-3', label: 'Medium', value: 'medium', isActive: true, sortOrder: 3 },
      { id: 'bug-pri-4', label: 'Low', value: 'low', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-bug-status',
    entityType: 'bug',
    fieldName: 'status',
    displayName: 'Bug Status',
    options: [
      { id: 'bug-sts-1', label: 'New', value: 'new', isActive: true, sortOrder: 1 },
      { id: 'bug-sts-2', label: 'Open', value: 'open', isActive: true, sortOrder: 2 },
      { id: 'bug-sts-3', label: 'In Progress', value: 'in-progress', isActive: true, sortOrder: 3 },
      { id: 'bug-sts-4', label: 'Fixed', value: 'fixed', isActive: true, sortOrder: 4 },
      { id: 'bug-sts-5', label: 'Verified', value: 'verified', isActive: true, sortOrder: 5 },
      { id: 'bug-sts-6', label: 'Closed', value: 'closed', isActive: true, sortOrder: 6 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  // IT Security Case configurations
  {
    id: 'dropdown-security-type',
    entityType: 'security-case',
    fieldName: 'type',
    displayName: 'Security Case Type',
    options: [
      { id: 'sec-typ-1', label: 'Data Breach', value: 'data-breach', isActive: true, sortOrder: 1 },
      { id: 'sec-typ-2', label: 'SAR', value: 'sar', isActive: true, sortOrder: 2 },
      { id: 'sec-typ-3', label: 'Compliance', value: 'compliance', isActive: true, sortOrder: 3 },
      { id: 'sec-typ-4', label: 'Threat', value: 'threat', isActive: true, sortOrder: 4 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-security-status',
    entityType: 'security-case',
    fieldName: 'status',
    displayName: 'Security Case Status',
    options: [
      { id: 'sec-sts-1', label: 'Active', value: 'active', isActive: true, sortOrder: 1 },
      { id: 'sec-sts-2', label: 'Pending', value: 'pending', isActive: true, sortOrder: 2 },
      { id: 'sec-sts-3', label: 'Resolved', value: 'resolved', isActive: true, sortOrder: 3 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dropdown-security-priority',
    entityType: 'security-case',
    fieldName: 'priority',
    displayName: 'Security Case Priority',
    options: [
      { id: 'sec-pri-1', label: 'Low', value: 'low', isActive: true, sortOrder: 1 },
      { id: 'sec-pri-2', label: 'Medium', value: 'medium', isActive: true, sortOrder: 2 },
      { id: 'sec-pri-3', label: 'High', value: 'high', isActive: true, sortOrder: 3 },
    ],
    isRequired: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// In-memory storage for dropdown configurations
let dropdownConfigurations = [...mockDropdownConfigurations];

// Helper functions for dropdown configurations
export const getDropdownConfigurations = () => dropdownConfigurations;

export const setDropdownConfigurations = (configurations: ConfigurableDropdown[]) => {
  dropdownConfigurations = configurations;
};

export const getDropdownConfigurationById = (id: string) => {
  return dropdownConfigurations.find(config => config.id === id);
};

export const getDropdownConfigurationsByEntityType = (entityType: ConfigurableEntityType) => {
  return dropdownConfigurations.filter(config => config.entityType === entityType);
};

export const getDropdownConfigurationByFieldName = (entityType: ConfigurableEntityType, fieldName: string) => {
  return dropdownConfigurations.find(
    config => config.entityType === entityType && config.fieldName === fieldName
  );
};

export const getDropdownOptionsByField = (entityType: ConfigurableEntityType, fieldName: string) => {
  const config = getDropdownConfigurationByFieldName(entityType, fieldName);
  return config ? config.options.filter(option => option.isActive).sort((a, b) => a.sortOrder - b.sortOrder) : [];
};

export const getDropdownOptionsMapByField = (entityType: ConfigurableEntityType, fieldName: string) => {
  const options = getDropdownOptionsByField(entityType, fieldName);
  return options.reduce<Record<string, string>>((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {});
};

export const createDropdownOption = (configId: string, label: string, value: string): DropdownOption => {
  const config = getDropdownConfigurationById(configId);
  if (!config) throw new Error(`Configuration with ID ${configId} not found`);
  
  // Calculate the next sort order
  const maxSortOrder = config.options.reduce((max, option) => Math.max(max, option.sortOrder), 0);
  
  return {
    id: uuidv4(),
    label,
    value,
    isActive: true,
    sortOrder: maxSortOrder + 1
  };
};

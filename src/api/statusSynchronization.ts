
import { ConfigurableEntityType, MandatoryFieldConfig } from '@/utils/types/configuration';

// Function to get mandatory fields configuration
export const getMandatoryFieldsConfig = async (entityType: ConfigurableEntityType): Promise<MandatoryFieldConfig[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMandatoryFields[entityType] || []);
    }, 500);
  });
};

// Function to update mandatory fields configuration
export const updateMandatoryFieldsConfig = async (
  entityType: ConfigurableEntityType,
  fields: MandatoryFieldConfig[]
): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      mockMandatoryFields[entityType] = fields;
      resolve(true);
    }, 500);
  });
};

// Function to get status synchronization settings
export const getStatusSynchronizationSettings = async (): Promise<Record<string, any>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        enabled: true,
        syncChangeToTicket: true,
        syncReleaseToTicket: false
      });
    }, 500);
  });
};

// Function to update status synchronization settings
export const updateStatusSynchronizationSettings = async (settings: Record<string, any>): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Function to synchronize release status
export const synchronizeReleaseStatus = async (releaseId: string, status: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Mock data
const mockMandatoryFields: Record<ConfigurableEntityType, MandatoryFieldConfig[]> = {
  'incident': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'incident', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'incident', isResolutionField: false },
    { fieldName: 'assignedTo', displayName: 'Assigned To', isRequired: false, entityType: 'incident', isResolutionField: false },
    { fieldName: 'resolutionNotes', displayName: 'Resolution Notes', isRequired: true, entityType: 'incident', isResolutionField: true },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: false, entityType: 'incident', isResolutionField: true },
  ],
  'service-request': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'service-request', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'service-request', isResolutionField: false },
    { fieldName: 'requestedFor', displayName: 'Requested For', isRequired: false, entityType: 'service-request', isResolutionField: false },
    { fieldName: 'fulfillmentNotes', displayName: 'Fulfillment Notes', isRequired: true, entityType: 'service-request', isResolutionField: true },
  ],
  'change': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'change', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'change', isResolutionField: false },
    { fieldName: 'implementationPlan', displayName: 'Implementation Plan', isRequired: true, entityType: 'change', isResolutionField: false },
    { fieldName: 'rollbackPlan', displayName: 'Rollback Plan', isRequired: true, entityType: 'change', isResolutionField: false },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: true, entityType: 'change', isResolutionField: true },
  ],
  'problem': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'problem', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'problem', isResolutionField: false },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: true, entityType: 'problem', isResolutionField: true },
    { fieldName: 'workaround', displayName: 'Workaround', isRequired: false, entityType: 'problem', isResolutionField: false },
  ],
  'security': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'security', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'security', isResolutionField: false },
    { fieldName: 'securityClassification', displayName: 'Security Classification', isRequired: true, entityType: 'security', isResolutionField: false },
    { fieldName: 'resolutionNotes', displayName: 'Resolution Notes', isRequired: true, entityType: 'security', isResolutionField: true },
  ],
  'ticket': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'ticket', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'ticket', isResolutionField: false },
  ],
  'asset': [
    { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'asset', isResolutionField: false },
    { fieldName: 'assetType', displayName: 'Asset Type', isRequired: true, entityType: 'asset', isResolutionField: false },
  ],
  'user': [
    { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'user', isResolutionField: false },
    { fieldName: 'email', displayName: 'Email', isRequired: true, entityType: 'user', isResolutionField: false },
  ],
  'release': [
    { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'release', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'release', isResolutionField: false },
    { fieldName: 'releaseNotes', displayName: 'Release Notes', isRequired: true, entityType: 'release', isResolutionField: true },
  ],
  'bug': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'bug', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'bug', isResolutionField: false },
    { fieldName: 'stepsToReproduce', displayName: 'Steps to Reproduce', isRequired: true, entityType: 'bug', isResolutionField: false },
  ],
  'backlog': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'backlog', isResolutionField: false },
    { fieldName: 'description', displayName: 'Description', isRequired: false, entityType: 'backlog', isResolutionField: false },
    { fieldName: 'acceptanceCriteria', displayName: 'Acceptance Criteria', isRequired: true, entityType: 'backlog', isResolutionField: false },
  ]
};

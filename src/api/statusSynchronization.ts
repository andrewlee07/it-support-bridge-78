
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { MandatoryFieldConfig, ConfigurableEntityType } from '@/utils/types/configuration';
import { synchronizeBacklogItemsForRelease } from '@/utils/mockData/backlog/backlogReleaseOperations';

// Simulate API delay
const apiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Mock data for status synchronization settings
let statusSynchronizationSettings: StatusSynchronizationSettings = {
  enableCascadingUpdates: true,
  enableDateSynchronization: false,
  notifyOnStatusChange: true,
  allowOverrides: true,
  releaseToBacklogMapping: {
    'Planned': 'open',
    'In Progress': 'in-progress',
    'Deployed': 'completed',
    'Cancelled': 'deferred'
  },
  releaseToBugMapping: {
    'Planned': 'open', 
    'In Progress': 'in_progress',
    'Deployed': 'fixed',
    'Cancelled': 'closed'
  }
};

// Mock data for mandatory fields by entity type
let mandatoryFieldsConfig: Record<ConfigurableEntityType, MandatoryFieldConfig[]> = {
  'release': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'release', description: 'The name of the release' },
    { fieldName: 'version', displayName: 'Version', isRequired: false, entityType: 'release', description: 'The version number of the release' },
    { fieldName: 'description', displayName: 'Description', isRequired: false, entityType: 'release', description: 'A detailed description of the release' },
    { fieldName: 'plannedDate', displayName: 'Planned Date', isRequired: false, entityType: 'release', description: 'The planned release date' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'release', description: 'The current status of the release' }
  ],
  'ticket': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'ticket', description: 'The title of the ticket' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'ticket', description: 'A detailed description of the ticket' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'ticket', description: 'The priority level of the ticket' },
    { fieldName: 'category', displayName: 'Category', isRequired: false, entityType: 'ticket', description: 'The category of the ticket' }
  ],
  'backlog': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'backlog', description: 'The title of the backlog item' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'backlog', description: 'A detailed description of the backlog item' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'backlog', description: 'The status of the backlog item' },
    { fieldName: 'points', displayName: 'Story Points', isRequired: false, entityType: 'backlog', description: 'The story points assigned to this item' },
    { fieldName: 'assignee', displayName: 'Assignee', isRequired: false, entityType: 'backlog', description: 'The person assigned to the backlog item' }
  ],
  'incident': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'incident', description: 'The title of the incident' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'incident', description: 'A detailed description of the incident' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'incident', description: 'The priority level of the incident' },
    { fieldName: 'impact', displayName: 'Impact', isRequired: false, entityType: 'incident', description: 'The impact of the incident' },
    { fieldName: 'category', displayName: 'Category', isRequired: false, entityType: 'incident', description: 'The category of the incident' },
    { fieldName: 'affectedServices', displayName: 'Affected Services', isRequired: false, entityType: 'incident', description: 'Services affected by this incident' }
  ],
  'change': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'change', description: 'The title of the change request' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'change', description: 'A detailed description of the change request' },
    { fieldName: 'implementationPlan', displayName: 'Implementation Plan', isRequired: true, entityType: 'change', description: 'The plan for implementing the change' },
    { fieldName: 'rollbackPlan', displayName: 'Rollback Plan', isRequired: true, entityType: 'change', description: 'The plan for rolling back the change if needed' },
    { fieldName: 'startDate', displayName: 'Start Date', isRequired: false, entityType: 'change', description: 'The planned start date for the change' },
    { fieldName: 'endDate', displayName: 'End Date', isRequired: false, entityType: 'change', description: 'The planned end date for the change' },
    { fieldName: 'approvers', displayName: 'Approvers', isRequired: false, entityType: 'change', description: 'People who need to approve this change' }
  ],
  'service-request': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'service-request', description: 'The title of the service request' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'service-request', description: 'A detailed description of the service request' },
    { fieldName: 'requestedFor', displayName: 'Requested For', isRequired: false, entityType: 'service-request', description: 'The person this request is for' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'service-request', description: 'The priority level of the service request' },
    { fieldName: 'dueDate', displayName: 'Due Date', isRequired: false, entityType: 'service-request', description: 'The date by which this request should be fulfilled' }
  ],
  'problem': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'problem', description: 'The title of the problem' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'problem', description: 'A detailed description of the problem' },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: false, entityType: 'problem', description: 'The root cause of the problem' },
    { fieldName: 'workaround', displayName: 'Workaround', isRequired: false, entityType: 'problem', description: 'A workaround for the problem if available' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'problem', description: 'The priority level of the problem' },
    { fieldName: 'affectedServices', displayName: 'Affected Services', isRequired: false, entityType: 'problem', description: 'Services affected by this problem' }
  ],
  'asset': [
    { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'asset', description: 'The name of the asset' },
    { fieldName: 'assetType', displayName: 'Asset Type', isRequired: true, entityType: 'asset', description: 'The type of asset' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'asset', description: 'The current status of the asset' },
    { fieldName: 'location', displayName: 'Location', isRequired: false, entityType: 'asset', description: 'The location of the asset' },
    { fieldName: 'assignedTo', displayName: 'Assigned To', isRequired: false, entityType: 'asset', description: 'The person this asset is assigned to' }
  ],
  'user': []
};

// Get status synchronization settings
export const getStatusSynchronizationSettings = async (): Promise<StatusSynchronizationSettings> => {
  await apiDelay();
  return { ...statusSynchronizationSettings };
};

// Update status synchronization settings
export const updateStatusSynchronizationSettings = async (
  settings: StatusSynchronizationSettings
): Promise<StatusSynchronizationSettings> => {
  await apiDelay();
  statusSynchronizationSettings = { ...settings };
  return { ...statusSynchronizationSettings };
};

// Get mandatory fields configuration by entity type
export const getMandatoryFieldsConfig = async (
  entityType: ConfigurableEntityType
): Promise<MandatoryFieldConfig[]> => {
  await apiDelay();
  return [...(mandatoryFieldsConfig[entityType] || [])];
};

// Update mandatory fields configuration
export const updateMandatoryFieldsConfig = async (
  entityType: ConfigurableEntityType,
  fields: MandatoryFieldConfig[]
): Promise<MandatoryFieldConfig[]> => {
  await apiDelay();
  mandatoryFieldsConfig[entityType] = [...fields];
  return [...fields];
};

// Synchronize release status with related items
export const synchronizeReleaseStatus = async (
  releaseId: string, 
  status: string
): Promise<{ updatedItems: number }> => {
  await apiDelay();
  
  // Only proceed if cascading updates are enabled
  if (!statusSynchronizationSettings.enableCascadingUpdates) {
    return { updatedItems: 0 };
  }
  
  try {
    // Synchronize backlog items
    const updatedCount = await synchronizeBacklogItemsForRelease(releaseId);
    
    // In a real implementation, we'd also synchronize bugs here
    
    return { updatedItems: updatedCount };
  } catch (error) {
    console.error('Error synchronizing release status:', error);
    return { updatedItems: 0 };
  }
};

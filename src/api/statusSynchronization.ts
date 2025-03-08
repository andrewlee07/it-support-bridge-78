
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { MandatoryFieldConfig, ConfigurableEntityType } from '@/utils/types/configuration';

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
    { fieldName: 'impact', displayName: 'Impact', isRequired: false, entityType: 'incident', description: 'The impact of the incident' }
  ],
  'change': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'change', description: 'The title of the change request' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'change', description: 'A detailed description of the change request' },
    { fieldName: 'implementationPlan', displayName: 'Implementation Plan', isRequired: true, entityType: 'change', description: 'The plan for implementing the change' },
    { fieldName: 'rollbackPlan', displayName: 'Rollback Plan', isRequired: true, entityType: 'change', description: 'The plan for rolling back the change if needed' }
  ],
  'asset': [],
  'user': [],
  'service-request': [],
  'problem': [],
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

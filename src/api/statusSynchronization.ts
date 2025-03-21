import { ConfigurableEntityType, MandatoryFieldConfig } from '@/utils/types/configuration';

// Function to generate mandatory fields for incidents
const getIncidentMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'incident', description: 'Title of the incident' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'incident', description: 'Detailed description of the incident' },
  { fieldName: 'category', displayName: 'Category', isRequired: true, entityType: 'incident', description: 'Category of the incident' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'incident', description: 'Priority of the incident' }
];

// Function to generate mandatory fields for service requests
const getServiceRequestMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'service-request', description: 'Title of the service request' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'service-request', description: 'Detailed description of the service request' },
  { fieldName: 'serviceId', displayName: 'Service', isRequired: true, entityType: 'service-request', description: 'Service being requested' },
  { fieldName: 'requestType', displayName: 'Request Type', isRequired: true, entityType: 'service-request', description: 'Type of service request' }
];

// Function to generate mandatory fields for changes
const getChangeMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'change', description: 'Title of the change request' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'change', description: 'Detailed description of the change request' },
  { fieldName: 'category', displayName: 'Category', isRequired: true, entityType: 'change', description: 'Category of the change request' },
  { fieldName: 'implementationPlan', displayName: 'Implementation Plan', isRequired: true, entityType: 'change', description: 'Plan for implementing the change' },
  { fieldName: 'rollbackPlan', displayName: 'Rollback Plan', isRequired: true, entityType: 'change', description: 'Plan for rolling back the change' }
];

// Function to generate mandatory fields for problems
const getProblemMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'problem', description: 'Title of the problem' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'problem', description: 'Detailed description of the problem' },
  { fieldName: 'category', displayName: 'Category', isRequired: true, entityType: 'problem', description: 'Category of the problem' },
  { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'problem', description: 'Status of the problem' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'problem', description: 'Priority of the problem' }
];

// Function to generate mandatory fields for security cases
const getSecurityMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'security', description: 'Title of the security case' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'security', description: 'Detailed description of the security case' },
  { fieldName: 'category', displayName: 'Category', isRequired: true, entityType: 'security', description: 'Category of the security case' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'security', description: 'Priority of the security case' }
];

// Function to generate mandatory fields for tickets
const getTicketMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'ticket', description: 'Title of the ticket' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'ticket', description: 'Detailed description of the ticket' },
  { fieldName: 'type', displayName: 'Type', isRequired: true, entityType: 'ticket', description: 'Type of the ticket' },
  { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'ticket', description: 'Status of the ticket' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'ticket', description: 'Priority of the ticket' }
];

// Function to generate mandatory fields for assets
const getAssetMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'asset', description: 'Name of the asset' },
  { fieldName: 'type', displayName: 'Type', isRequired: true, entityType: 'asset', description: 'Type of the asset' },
  { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'asset', description: 'Status of the asset' }
];

// Function to generate mandatory fields for users
const getUserMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'user', description: 'Name of the user' },
  { fieldName: 'email', displayName: 'Email', isRequired: true, entityType: 'user', description: 'Email of the user' },
  { fieldName: 'role', displayName: 'Role', isRequired: true, entityType: 'user', description: 'Role of the user' }
];

// Function to generate mandatory fields for releases
const getReleaseMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'release', description: 'Title of the release' },
  { fieldName: 'version', displayName: 'Version', isRequired: true, entityType: 'release', description: 'Version of the release' },
  { fieldName: 'type', displayName: 'Type', isRequired: true, entityType: 'release', description: 'Type of the release' },
  { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'release', description: 'Status of the release' }
];

// Function to generate mandatory fields for bugs
const getBugMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'bug', description: 'Title of the bug' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'bug', description: 'Detailed description of the bug' },
  { fieldName: 'severity', displayName: 'Severity', isRequired: true, entityType: 'bug', description: 'Severity of the bug' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'bug', description: 'Priority of the bug' }
];

// Function to generate mandatory fields for backlog
const getBacklogMandatoryFields = (): MandatoryFieldConfig[] => [
  { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'backlog', description: 'Title of the backlog item' },
  { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'backlog', description: 'Detailed description of the backlog item' },
  { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'backlog', description: 'Status of the backlog item' },
  { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'backlog', description: 'Priority of the backlog item' }
];

// Predefined mandatory fields
const mandatoryFieldsConfig: Record<ConfigurableEntityType, MandatoryFieldConfig[]> = {
  'incident': [...getIncidentMandatoryFields()],
  'service-request': [...getServiceRequestMandatoryFields()],
  'change': [...getChangeMandatoryFields()],
  'problem': [...getProblemMandatoryFields()],
  'security': [...getSecurityMandatoryFields()],
  'ticket': [...getTicketMandatoryFields()],
  'asset': [...getAssetMandatoryFields()],
  'user': [...getUserMandatoryFields()],
  'release': [...getReleaseMandatoryFields()],
  'bug': [...getBugMandatoryFields()],
  'backlog': [...getBacklogMandatoryFields()]
};

// Function to get mandatory fields configuration for a specific entity type
export const getMandatoryFieldsConfig = async (entityType: ConfigurableEntityType): Promise<MandatoryFieldConfig[]> => {
  return mandatoryFieldsConfig[entityType] || [];
};

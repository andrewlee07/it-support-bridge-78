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
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'release', description: 'The current status of the release' },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: false, entityType: 'release', description: 'Notes about the release closure', isResolutionField: true },
    { fieldName: 'completionSummary', displayName: 'Completion Summary', isRequired: false, entityType: 'release', description: 'Summary of the release completion', isResolutionField: true }
  ],
  'ticket': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'ticket', description: 'The title of the ticket' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'ticket', description: 'A detailed description of the ticket' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'ticket', description: 'The priority level of the ticket' },
    { fieldName: 'category', displayName: 'Category', isRequired: false, entityType: 'ticket', description: 'The category of the ticket' },
    { fieldName: 'resolution', displayName: 'Resolution Details', isRequired: false, entityType: 'ticket', description: 'Details about how the ticket was resolved', isResolutionField: true },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: false, entityType: 'ticket', description: 'The root cause of the issue', isResolutionField: true },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: false, entityType: 'ticket', description: 'Additional notes about the ticket closure', isResolutionField: true }
  ],
  'backlog': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'backlog', description: 'The title of the backlog item' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'backlog', description: 'A detailed description of the backlog item' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'backlog', description: 'The status of the backlog item' },
    { fieldName: 'points', displayName: 'Story Points', isRequired: false, entityType: 'backlog', description: 'The story points assigned to this item' },
    { fieldName: 'assignee', displayName: 'Assignee', isRequired: false, entityType: 'backlog', description: 'The person assigned to the backlog item' },
    { fieldName: 'completionNotes', displayName: 'Completion Notes', isRequired: false, entityType: 'backlog', description: 'Notes about the completion of this item', isResolutionField: true },
    { fieldName: 'acceptanceCriteria', displayName: 'Acceptance Criteria Met', isRequired: false, entityType: 'backlog', description: 'Details about how acceptance criteria were met', isResolutionField: true }
  ],
  'incident': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'incident', description: 'The title of the incident' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'incident', description: 'A detailed description of the incident' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: true, entityType: 'incident', description: 'The priority level of the incident' },
    { fieldName: 'impact', displayName: 'Impact', isRequired: false, entityType: 'incident', description: 'The impact of the incident' },
    { fieldName: 'category', displayName: 'Category', isRequired: false, entityType: 'incident', description: 'The category of the incident' },
    { fieldName: 'affectedServices', displayName: 'Affected Services', isRequired: false, entityType: 'incident', description: 'Services affected by this incident' },
    { fieldName: 'resolution', displayName: 'Resolution Details', isRequired: false, entityType: 'incident', description: 'Details about how the incident was resolved', isResolutionField: true },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: false, entityType: 'incident', description: 'The root cause of the incident', isResolutionField: true },
    { fieldName: 'closureReason', displayName: 'Closure Reason', isRequired: false, entityType: 'incident', description: 'Reason for closing the incident', isResolutionField: true }
  ],
  'change': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'change', description: 'The title of the change request' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'change', description: 'A detailed description of the change request' },
    { fieldName: 'implementationPlan', displayName: 'Implementation Plan', isRequired: true, entityType: 'change', description: 'The plan for implementing the change' },
    { fieldName: 'rollbackPlan', displayName: 'Rollback Plan', isRequired: true, entityType: 'change', description: 'The plan for rolling back the change if needed' },
    { fieldName: 'startDate', displayName: 'Start Date', isRequired: false, entityType: 'change', description: 'The planned start date for the change' },
    { fieldName: 'endDate', displayName: 'End Date', isRequired: false, entityType: 'change', description: 'The planned end date for the change' },
    { fieldName: 'approvers', displayName: 'Approvers', isRequired: false, entityType: 'change', description: 'People who need to approve this change' },
    { fieldName: 'closureReason', displayName: 'Closure Reason', isRequired: false, entityType: 'change', description: 'Reason for closing the change (success/failure/etc)', isResolutionField: true },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: false, entityType: 'change', description: 'Detailed notes about the change closure', isResolutionField: true },
    { fieldName: 'implementationResults', displayName: 'Implementation Results', isRequired: false, entityType: 'change', description: 'Results of the change implementation', isResolutionField: true }
  ],
  'service-request': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'service-request', description: 'The title of the service request' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'service-request', description: 'A detailed description of the service request' },
    { fieldName: 'requestedFor', displayName: 'Requested For', isRequired: false, entityType: 'service-request', description: 'The person this request is for' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'service-request', description: 'The priority level of the service request' },
    { fieldName: 'dueDate', displayName: 'Due Date', isRequired: false, entityType: 'service-request', description: 'The date by which this request should be fulfilled' },
    { fieldName: 'fulfillmentDetails', displayName: 'Fulfillment Details', isRequired: false, entityType: 'service-request', description: 'Details about how the request was fulfilled', isResolutionField: true },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: false, entityType: 'service-request', description: 'Additional notes about the request closure', isResolutionField: true }
  ],
  'problem': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'problem', description: 'The title of the problem' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'problem', description: 'A detailed description of the problem' },
    { fieldName: 'rootCause', displayName: 'Root Cause', isRequired: false, entityType: 'problem', description: 'The root cause of the problem', isResolutionField: true },
    { fieldName: 'workaround', displayName: 'Workaround', isRequired: false, entityType: 'problem', description: 'A workaround for the problem if available' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'problem', description: 'The priority level of the problem' },
    { fieldName: 'affectedServices', displayName: 'Affected Services', isRequired: false, entityType: 'problem', description: 'Services affected by this problem' },
    { fieldName: 'resolutionDescription', displayName: 'Resolution Description', isRequired: false, entityType: 'problem', description: 'Description of how the problem was resolved', isResolutionField: true },
    { fieldName: 'closureNotes', displayName: 'Closure Notes', isRequired: false, entityType: 'problem', description: 'Notes about closing the problem', isResolutionField: true },
    { fieldName: 'knownErrorDetails', displayName: 'Known Error Details', isRequired: false, entityType: 'problem', description: 'Details if this is classified as a known error', isResolutionField: true }
  ],
  'asset': [
    { fieldName: 'name', displayName: 'Name', isRequired: true, entityType: 'asset', description: 'The name of the asset' },
    { fieldName: 'assetType', displayName: 'Asset Type', isRequired: true, entityType: 'asset', description: 'The type of asset' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'asset', description: 'The current status of the asset' },
    { fieldName: 'location', displayName: 'Location', isRequired: false, entityType: 'asset', description: 'The location of the asset' },
    { fieldName: 'assignedTo', displayName: 'Assigned To', isRequired: false, entityType: 'asset', description: 'The person this asset is assigned to' },
    { fieldName: 'retirementReason', displayName: 'Retirement Reason', isRequired: false, entityType: 'asset', description: 'Reason for retiring this asset', isResolutionField: true },
    { fieldName: 'disposalMethod', displayName: 'Disposal Method', isRequired: false, entityType: 'asset', description: 'Method used to dispose of this asset', isResolutionField: true }
  ],
  'bug': [
    { fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'bug', description: 'The title of the bug' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'bug', description: 'A detailed description of the bug' },
    { fieldName: 'stepsToReproduce', displayName: 'Steps to Reproduce', isRequired: true, entityType: 'bug', description: 'Steps to reproduce the bug' },
    { fieldName: 'severity', displayName: 'Severity', isRequired: true, entityType: 'bug', description: 'The severity level of the bug' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'bug', description: 'The priority level of the bug' },
    { fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'bug', description: 'The current status of the bug' },
    { fieldName: 'assignedDeveloper', displayName: 'Assigned Developer', isRequired: false, entityType: 'bug', description: 'The developer assigned to fix the bug' },
    { fieldName: 'fixDetails', displayName: 'Fix Details', isRequired: false, entityType: 'bug', description: 'Details about how the bug was fixed', isResolutionField: true },
    { fieldName: 'verificationNotes', displayName: 'Verification Notes', isRequired: false, entityType: 'bug', description: 'Notes from verifying the bug fix', isResolutionField: true }
  ],
  'user': [],
  'test': [
    { fieldName: 'title', displayName: 'Test Title', isRequired: true, entityType: 'test', description: 'The title of the test case' },
    { fieldName: 'description', displayName: 'Description', isRequired: true, entityType: 'test', description: 'A detailed description of the test case' },
    { fieldName: 'steps', displayName: 'Test Steps', isRequired: true, entityType: 'test', description: 'Step-by-step instructions to perform the test' },
    { fieldName: 'expectedResults', displayName: 'Expected Results', isRequired: true, entityType: 'test', description: 'The expected outcomes of the test' },
    { fieldName: 'assignedTester', displayName: 'Assigned Tester', isRequired: false, entityType: 'test', description: 'The person assigned to execute this test' },
    { fieldName: 'priority', displayName: 'Priority', isRequired: false, entityType: 'test', description: 'The priority level of the test case' },
    { fieldName: 'testType', displayName: 'Test Type', isRequired: false, entityType: 'test', description: 'The type of test (functional, integration, etc.)' },
    { fieldName: 'testNotes', displayName: 'Test Notes', isRequired: false, entityType: 'test', description: 'Additional notes about the test case' },
    { fieldName: 'executionStatus', displayName: 'Execution Status', isRequired: false, entityType: 'test', description: 'The current execution status of the test' },
    { fieldName: 'executionNotes', displayName: 'Execution Notes', isRequired: false, entityType: 'test', description: 'Notes about the test execution', isResolutionField: true },
    { fieldName: 'actualResults', displayName: 'Actual Results', isRequired: false, entityType: 'test', description: 'The actual results of the test execution', isResolutionField: true }
  ]
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

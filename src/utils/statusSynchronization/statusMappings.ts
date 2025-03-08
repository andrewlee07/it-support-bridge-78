
import { ReleaseStatus } from '@/utils/types/release';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';
import { BugStatus } from '@/utils/types/test/testStatus';

// Default mappings between release status and backlog item status
export const defaultReleaseToBacklogStatusMapping: Record<ReleaseStatus, BacklogItemStatus> = {
  'Planned': 'open',
  'In Progress': 'in-progress',
  'Deployed': 'completed',
  'Cancelled': 'deferred'
};

// Default mappings between release status and bug status
export const defaultReleaseToBugStatusMapping: Record<ReleaseStatus, BugStatus> = {
  'Planned': 'open',
  'In Progress': 'in_progress',
  'Deployed': 'closed',
  'Cancelled': 'closed'
};

// Interface for custom status mappings (to be stored in configuration)
export interface StatusMappingConfiguration {
  releaseToBacklogMapping: Record<ReleaseStatus, BacklogItemStatus>;
  releaseToBugMapping: Record<ReleaseStatus, BugStatus>;
  enableCascadingUpdates: boolean;
  enableDateSynchronization: boolean;
  notifyOnStatusChange: boolean;
  allowOverrides: boolean;
}

// Default configuration
export const defaultStatusMappingConfiguration: StatusMappingConfiguration = {
  releaseToBacklogMapping: defaultReleaseToBacklogStatusMapping,
  releaseToBugMapping: defaultReleaseToBugStatusMapping,
  enableCascadingUpdates: true,
  enableDateSynchronization: true,
  notifyOnStatusChange: true,
  allowOverrides: true
};

// Helper functions to determine if we should update statuses
export const shouldUpdateBacklogStatus = (
  releaseStatus: ReleaseStatus, 
  currentBacklogStatus: BacklogItemStatus,
  config: StatusMappingConfiguration
): boolean => {
  if (!config.enableCascadingUpdates) return false;
  
  // Never update completed items unless allowed by configuration
  if (currentBacklogStatus === 'completed' && !config.allowOverrides) return false;
  
  // Don't downgrade from in-progress to open
  if (currentBacklogStatus === 'in-progress' && 
      config.releaseToBacklogMapping[releaseStatus] === 'open') return false;
  
  return true;
};

export const shouldUpdateBugStatus = (
  releaseStatus: ReleaseStatus, 
  currentBugStatus: BugStatus,
  config: StatusMappingConfiguration
): boolean => {
  if (!config.enableCascadingUpdates) return false;
  
  // Never update closed bugs unless allowed by configuration
  if ((currentBugStatus === 'closed' || currentBugStatus === 'fixed') 
      && !config.allowOverrides) return false;
  
  return true;
};

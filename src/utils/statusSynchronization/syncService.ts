
import { 
  StatusSynchronizationSettings, 
  ReleaseStatus,
  BacklogItemStatus,
  BugStatus 
} from '@/utils/types';
import { 
  updateReleaseStatus 
} from '@/utils/api/releaseApi';
import { 
  getBacklogItemsByReleaseId,
  updateBacklogItem 
} from '@/utils/api/backlogApi';
import {
  getBugsByReleaseId,
  updateBugStatus
} from '@/utils/api/bugApi';
import { toast } from 'sonner';

// Default sync configuration
export const defaultSyncConfig: StatusSynchronizationSettings = {
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
    'Planned': 'new',
    'In Progress': 'in-progress',
    'Deployed': 'fixed',
    'Cancelled': 'closed'
  }
};

// Validates a sync configuration
export const validateSyncConfiguration = (config: StatusSynchronizationSettings): boolean => {
  // Check if all required fields are present
  if (
    config.enableCascadingUpdates === undefined ||
    config.enableDateSynchronization === undefined ||
    config.notifyOnStatusChange === undefined ||
    config.allowOverrides === undefined ||
    !config.releaseToBacklogMapping ||
    !config.releaseToBugMapping
  ) {
    return false;
  }

  // Check if all release statuses have a corresponding backlog and bug status
  const releaseStatuses: ReleaseStatus[] = ['Planned', 'In Progress', 'Deployed', 'Cancelled'];
  for (const status of releaseStatuses) {
    if (
      !config.releaseToBacklogMapping[status] ||
      !config.releaseToBugMapping[status]
    ) {
      return false;
    }
  }

  return true;
};

// Load sync configuration from local storage or use default
export const loadSyncConfiguration = (): StatusSynchronizationSettings => {
  const savedConfig = localStorage.getItem('statusSyncConfig');
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      if (validateSyncConfiguration(parsedConfig)) {
        return parsedConfig;
      }
    } catch (e) {
      console.error('Error parsing saved sync configuration', e);
    }
  }
  return defaultSyncConfig;
};

// Save sync configuration to local storage
export const saveSyncConfiguration = (config: StatusSynchronizationSettings): void => {
  if (validateSyncConfiguration(config)) {
    localStorage.setItem('statusSyncConfig', JSON.stringify(config));
  }
};

// Synchronize status changes
export const synchronizeStatusChanges = async (
  releaseId: string,
  newStatus: ReleaseStatus,
  userId: string,
  config: StatusSynchronizationSettings = loadSyncConfiguration()
): Promise<boolean> => {
  if (!config.enableCascadingUpdates) {
    return true;
  }

  try {
    // Synchronize backlog items
    const backlogResponse = await getBacklogItemsByReleaseId(releaseId);
    if (backlogResponse.success && backlogResponse.data) {
      const targetBacklogStatus = config.releaseToBacklogMapping[newStatus];
      for (const item of backlogResponse.data) {
        await updateBacklogItem(item.id, {
          ...item,
          status: targetBacklogStatus as BacklogItemStatus
        });
      }
    }

    // Synchronize bugs
    const bugsResponse = await getBugsByReleaseId(releaseId);
    if (bugsResponse.success && bugsResponse.data) {
      const targetBugStatus = config.releaseToBugMapping[newStatus];
      for (const bug of bugsResponse.data) {
        await updateBugStatus(bug.id, targetBugStatus as BugStatus);
      }
    }

    if (config.notifyOnStatusChange) {
      toast.success(`Status changes synchronized for Release ${releaseId}`);
    }

    return true;
  } catch (error) {
    console.error('Error synchronizing status changes:', error);
    toast.error(`Failed to synchronize status changes for Release ${releaseId}`);
    return false;
  }
};

export default {
  defaultSyncConfig,
  validateSyncConfiguration,
  loadSyncConfiguration,
  saveSyncConfiguration,
  synchronizeStatusChanges
};

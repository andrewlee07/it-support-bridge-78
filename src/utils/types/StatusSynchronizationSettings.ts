
import { BacklogItemStatus } from './backlogTypes';
import { ReleaseStatus } from './release';

export interface StatusSynchronizationSettings {
  enableCascadingUpdates: boolean;
  enableDateSynchronization: boolean;
  notifyOnStatusChange: boolean;
  allowOverrides: boolean;
  releaseToBacklogMapping: Record<ReleaseStatus, BacklogItemStatus>;
  releaseToBugMapping: Record<ReleaseStatus, string>;
}

export const defaultStatusSynchronizationSettings: StatusSynchronizationSettings = {
  enableCascadingUpdates: true,
  enableDateSynchronization: true,
  notifyOnStatusChange: true,
  allowOverrides: false,
  releaseToBacklogMapping: {
    'Planned': 'open',
    'In Progress': 'in-progress',
    'Deployed': 'completed',
    'Cancelled': 'deferred'
  },
  releaseToBugMapping: {
    'Planned': 'open',
    'In Progress': 'in-progress',
    'Deployed': 'fixed',
    'Cancelled': 'closed'
  }
};

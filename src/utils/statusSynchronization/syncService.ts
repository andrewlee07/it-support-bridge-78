
import { updateBacklogItem } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { ReleaseStatus } from '@/utils/types/release';
import { Bug } from '@/utils/types/test/bug';

// Interface for a status change request
interface StatusChangeRequest {
  releaseId: string;
  newStatus: ReleaseStatus;
  settings: StatusSynchronizationSettings;
}

// Update bug status based on release status
const updateBugStatus = (bugId: string, newStatus: string): Promise<any> => {
  // This function would call the real API in a production environment
  console.log(`Updating bug ${bugId} status to ${newStatus}`);
  return Promise.resolve({ success: true });
};

// Function to synchronize status changes across entities
export const synchronizeStatusChanges = async (request: StatusChangeRequest): Promise<boolean> => {
  const { releaseId, newStatus, settings } = request;

  if (!settings.enableCascadingUpdates) {
    console.log('Cascading updates disabled. No synchronization performed.');
    return true;
  }

  try {
    // Get all backlog items for this release
    const response = await fetch(`/api/backlog?releaseId=${releaseId}`);
    const backlogItems: BacklogItem[] = await response.json();

    // For each backlog item, update its status based on the mapping
    for (const item of backlogItems) {
      const mappedStatus = settings.releaseToBacklogMapping[newStatus];
      
      if (mappedStatus && (!settings.allowOverrides || item.status !== 'blocked')) {
        await updateBacklogItem(item.id, {
          ...item,
          status: mappedStatus as BacklogItemStatus
        });

        // If the backlog item has related bugs, update their status too
        if (item.relatedBugIds && item.relatedBugIds.length > 0) {
          const bugStatus = settings.releaseToBugMapping[newStatus];
          
          for (const bugId of item.relatedBugIds) {
            await updateBugStatus(bugId, bugStatus);
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Status synchronization failed:', error);
    return false;
  }
};


import { ReleaseStatus } from '@/utils/types/release';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { Bug } from '@/utils/types/test/bug';
import { 
  StatusMappingConfiguration, 
  defaultStatusMappingConfiguration,
  shouldUpdateBacklogStatus,
  shouldUpdateBugStatus 
} from './statusMappings';
import { updateBacklogItem } from '@/utils/api/backlogApi';
import { updateBug } from '@/utils/api/bugApi';
import { createNotification } from '@/utils/api/notificationApi';
import { HistoryEntry } from '@/utils/types/backlogTypes';
import { v4 as uuidv4 } from 'uuid';

interface SyncResult {
  success: boolean;
  updatedItems: {
    backlogItems: BacklogItem[];
    bugs: Bug[];
  };
  errors: string[];
}

export const synchronizeReleaseDependencies = async (
  releaseId: string,
  newStatus: ReleaseStatus,
  plannedDate: Date | null,
  userId: string,
  config: StatusMappingConfiguration = defaultStatusMappingConfiguration
): Promise<SyncResult> => {
  const result: SyncResult = {
    success: true,
    updatedItems: {
      backlogItems: [],
      bugs: []
    },
    errors: []
  };

  try {
    // 1. Find all backlog items linked to this release
    const { fetchBacklogItems } = await import('@/utils/api/backlogApi');
    const backlogResponse = await fetchBacklogItems(releaseId);

    if (backlogResponse.success && backlogResponse.data) {
      // 2. Update backlog items if needed
      const backlogUpdatePromises = backlogResponse.data.map(async (item) => {
        try {
          const shouldUpdate = shouldUpdateBacklogStatus(
            newStatus, 
            item.status,
            config
          );

          if (shouldUpdate) {
            const newBacklogStatus = config.releaseToBacklogMapping[newStatus];
            
            // Create history entry
            const historyEntry: HistoryEntry = {
              id: uuidv4(),
              field: 'status',
              previousValue: item.status,
              newValue: newBacklogStatus,
              changedBy: userId,
              changedAt: new Date(),
            };
            
            // Update the backlog item with new status
            const updatedItem = {
              ...item,
              status: newBacklogStatus,
              history: [...(item.history || []), historyEntry],
              updatedAt: new Date()
            };
            
            // If date synchronization is enabled, update due date
            if (config.enableDateSynchronization && plannedDate) {
              updatedItem.dueDate = plannedDate;
            }
            
            const updateResponse = await updateBacklogItem(item.id, updatedItem);
            
            if (updateResponse.success && updateResponse.data) {
              result.updatedItems.backlogItems.push(updateResponse.data);
              
              // Create notification if enabled
              if (config.notifyOnStatusChange) {
                await createNotification({
                  type: 'backlog',
                  title: `Backlog item status updated`,
                  message: `Status was automatically changed from ${item.status} to ${newBacklogStatus} due to release status change`,
                  entityId: item.id,
                  severity: 'info',
                  userId: item.assignee || item.creator
                });
              }
            }
          }
        } catch (error) {
          result.errors.push(`Failed to update backlog item ${item.id}: ${error}`);
        }
      });
      
      await Promise.all(backlogUpdatePromises);
    }
    
    // 3. Find and update bugs linked to this release
    const { fetchBugs } = await import('@/utils/api/bugApi');
    const bugsResponse = await fetchBugs({ releaseId });
    
    if (bugsResponse.success && bugsResponse.data) {
      const bugUpdatePromises = bugsResponse.data.map(async (bug) => {
        try {
          const shouldUpdate = shouldUpdateBugStatus(
            newStatus,
            bug.status,
            config
          );
          
          if (shouldUpdate) {
            const newBugStatus = config.releaseToBugMapping[newStatus];
            
            const updatedBug = {
              ...bug,
              status: newBugStatus,
              updatedAt: new Date()
            };
            
            const updateResponse = await updateBug(bug.id, updatedBug);
            
            if (updateResponse.success && updateResponse.data) {
              result.updatedItems.bugs.push(updateResponse.data);
              
              // Create notification if enabled
              if (config.notifyOnStatusChange) {
                await createNotification({
                  type: 'bug',
                  title: `Bug status updated`,
                  message: `Status was automatically changed from ${bug.status} to ${newBugStatus} due to release status change`,
                  entityId: bug.id,
                  severity: 'info',
                  userId: bug.assignedDeveloper || bug.createdBy
                });
              }
            }
          }
        } catch (error) {
          result.errors.push(`Failed to update bug ${bug.id}: ${error}`);
        }
      });
      
      await Promise.all(bugUpdatePromises);
    }
  } catch (error) {
    result.success = false;
    result.errors.push(`Failed to synchronize release dependencies: ${error}`);
  }
  
  result.success = result.errors.length === 0;
  return result;
}

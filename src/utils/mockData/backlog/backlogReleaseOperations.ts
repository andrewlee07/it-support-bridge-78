
import { BacklogItem } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from './backlogItems';
import { createApiSuccessResponse, createApiErrorResponse } from '../apiHelpers';
import { v4 as uuidv4 } from 'uuid';
import { getStatusSynchronizationSettings } from '@/api/statusSynchronization';
import { getReleaseById } from '@/utils/api/release';

// Assign a backlog item to a release
export const assignToRelease = (
  itemId: string,
  releaseId: string
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  backlogItems[itemIndex].releaseId = releaseId;
  
  // Add history entry
  if (!backlogItems[itemIndex].history) {
    backlogItems[itemIndex].history = [];
  }

  backlogItems[itemIndex].history.push({
    id: uuidv4(),
    field: 'releaseId',
    previousValue: 'None',
    newValue: releaseId,
    changedBy: 'system',
    changedAt: new Date()
  });
  
  // Update status if needed based on synchronization settings
  updateItemStatusBasedOnRelease(itemIndex, releaseId);
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

// Remove a backlog item from a release
export const removeFromRelease = (itemId: string): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      error: 'Backlog item not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  const previousReleaseId = backlogItems[itemIndex].releaseId;
  delete backlogItems[itemIndex].releaseId;
  
  // Add history entry
  if (!backlogItems[itemIndex].history) {
    backlogItems[itemIndex].history = [];
  }

  backlogItems[itemIndex].history.push({
    id: uuidv4(),
    field: 'releaseId',
    previousValue: previousReleaseId || 'None',
    newValue: 'None',
    changedBy: 'system',
    changedAt: new Date()
  });
  
  return {
    success: true,
    data: backlogItems[itemIndex],
    status: 200,
    statusCode: 200
  };
};

// Helper function to update item status based on release status synchronization
const updateItemStatusBasedOnRelease = async (itemIndex: number, releaseId: string) => {
  try {
    // Get synchronization settings
    const settings = await getStatusSynchronizationSettings();
    
    if (!settings.enableCascadingUpdates) {
      return;
    }
    
    // Get release details
    const releaseResponse = await getReleaseById(releaseId);
    
    if (!releaseResponse.success) {
      return;
    }
    
    const release = releaseResponse.data;
    
    // Get the mapped status for the release status
    const newStatus = settings.releaseToBacklogMapping[release.status];
    
    if (newStatus && backlogItems[itemIndex].status !== newStatus) {
      const previousStatus = backlogItems[itemIndex].status;
      backlogItems[itemIndex].status = newStatus;
      
      // Add history entry
      if (!backlogItems[itemIndex].history) {
        backlogItems[itemIndex].history = [];
      }
      
      backlogItems[itemIndex].history.push({
        id: uuidv4(),
        field: 'status',
        previousValue: previousStatus,
        newValue: newStatus,
        changedBy: 'system-sync',
        changedAt: new Date()
      });
      
      // Update due date if enabled
      if (settings.enableDateSynchronization && release.plannedDate) {
        const previousDueDate = backlogItems[itemIndex].dueDate;
        backlogItems[itemIndex].dueDate = new Date(release.plannedDate);
        
        backlogItems[itemIndex].history.push({
          id: uuidv4(),
          field: 'dueDate',
          previousValue: previousDueDate ? previousDueDate.toISOString() : 'None',
          newValue: release.plannedDate.toISOString(),
          changedBy: 'system-sync',
          changedAt: new Date()
        });
      }
    }
  } catch (error) {
    console.error("Failed to update item status based on release:", error);
  }
};

// Function to synchronize all backlog items for a release
export const synchronizeBacklogItemsForRelease = async (
  releaseId: string
): Promise<number> => {
  const items = backlogItems.filter(item => item.releaseId === releaseId);
  let updatedCount = 0;
  
  for (let i = 0; i < items.length; i++) {
    const itemIndex = backlogItems.findIndex(item => item.id === items[i].id);
    if (itemIndex !== -1) {
      await updateItemStatusBasedOnRelease(itemIndex, releaseId);
      updatedCount++;
    }
  }
  
  return updatedCount;
};

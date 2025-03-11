
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  KanbanBoardConfig, 
  sprintColumnsConfig, 
  generateAssigneeColumns, 
  priorityColumnsConfig, 
  generateLabelColumns,
  generateReleaseColumns
} from '@/utils/types/kanbanTypes';
import { UseKanbanBoardProps } from './types';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { ViewDimension } from '@/hooks/backlog/kanban/types';

export function useKanbanBoardColumnConfig(
  props: UseKanbanBoardProps,
  boardConfig: KanbanBoardConfig,
  setBoardConfig: (config: KanbanBoardConfig) => void
) {
  const { backlogItems, viewDimension } = props;

  // Generate dynamic columns based on the view dimension
  useEffect(() => {
    let newConfig: KanbanBoardConfig = {...boardConfig, viewType: viewDimension};
    
    if (viewDimension === 'status') {
      // Use default status columns
      if (!boardConfig.columns.some(col => col.id === 'open')) {
        newConfig.columns = newConfig.columns; // No change needed
      }
    } 
    else if (viewDimension === 'sprint') {
      // Use sprint columns
      if (!boardConfig.columns.some(col => col.id.startsWith('sprint-'))) {
        newConfig.columns = sprintColumnsConfig;
      }
    }
    else if (viewDimension === 'assignee') {
      // Generate columns based on unique assignees in backlog items
      const uniqueAssignees = Array.from(
        new Set(
          backlogItems
            .filter(item => item.assignee)
            .map(item => ({
              id: item.assignee || 'unassigned',
              name: typeof item.assignee === 'string' ? item.assignee : 'Unassigned'
            }))
        )
      );
      
      // Add an unassigned column if not already included
      if (!uniqueAssignees.some(a => a.id === 'unassigned')) {
        uniqueAssignees.push({ id: 'unassigned', name: 'Unassigned' });
      }
      
      newConfig.columns = generateAssigneeColumns(uniqueAssignees);
    }
    else if (viewDimension === 'priority') {
      // Use priority columns
      newConfig.columns = priorityColumnsConfig;
    }
    else if (viewDimension === 'label') {
      // Generate columns based on unique labels in backlog items
      const allLabels = backlogItems.flatMap(item => item.labels || []);
      const uniqueLabels = Array.from(new Set(allLabels));
      
      // Add a "No Label" option
      if (uniqueLabels.length > 0 && !uniqueLabels.includes('No Label')) {
        uniqueLabels.push('No Label');
      }
      
      newConfig.columns = generateLabelColumns(uniqueLabels.length > 0 ? uniqueLabels : ['No Label']);
    }
    else if (viewDimension === 'release') {
      // Generate columns based on releases
      const uniqueReleases = Array.from(
        new Set(
          backlogItems
            .filter(item => item.releaseId)
            .map(item => item.releaseId || 'unassigned')
        )
      );
      
      // Add an unassigned column if not already included
      if (!uniqueReleases.includes('unassigned')) {
        uniqueReleases.push('unassigned');
      }
      
      newConfig.columns = generateReleaseColumns ? generateReleaseColumns(uniqueReleases) : newConfig.columns;
    }
    // Handle additional dimensions like 'progress' and 'due-date' can be added here
    
    setBoardConfig(newConfig);
  }, [viewDimension, backlogItems, boardConfig.viewType]);

  const getItemsForColumn = (columnStatusValue: string, columnId: string): BacklogItem[] => {
    if (viewDimension === 'status') {
      return backlogItems.filter(item => item.status === columnStatusValue);
    } 
    else if (viewDimension === 'sprint') {
      return backlogItems.filter(item => 
        columnStatusValue === 'backlog' 
          ? !item.releaseId 
          : columnId === item.releaseId
      );
    }
    else if (viewDimension === 'assignee') {
      const assigneeValue = columnId.replace('assignee-', '');
      return backlogItems.filter(item => 
        assigneeValue === 'unassigned' 
          ? !item.assignee 
          : item.assignee === assigneeValue
      );
    }
    else if (viewDimension === 'priority') {
      const priority = columnId.replace('priority-', '');
      return backlogItems.filter(item => 
        priority === 'none' 
          ? !item.priority 
          : item.priority === priority
      );
    }
    else if (viewDimension === 'label') {
      const label = columnId.replace('label-', '');
      return backlogItems.filter(item => 
        label === 'No Label' 
          ? !item.labels || item.labels.length === 0 
          : item.labels && item.labels.includes(label)
      );
    }
    else if (viewDimension === 'release') {
      const releaseId = columnId.replace('release-', '');
      return backlogItems.filter(item => 
        releaseId === 'unassigned' 
          ? !item.releaseId 
          : item.releaseId === releaseId
      );
    }
    // Additional dimensions like 'progress' and 'due-date' can be handled here
    
    return [];
  };

  const handleAddBucket = () => {
    // Create a new column/bucket
    const newBucketId = uuidv4();
    const newBucketName = `Bucket ${boardConfig.columns.length + 1}`;
    const newStatusValue = `bucket-${boardConfig.columns.length + 1}`;
    
    const newColumn = {
      id: newBucketId,
      displayName: newBucketName,
      statusValue: newStatusValue,
      order: boardConfig.columns.length + 1,
      color: 'bg-gray-50 dark:bg-gray-950'
    };
    
    const updatedConfig = {
      ...boardConfig,
      columns: [...boardConfig.columns, newColumn]
    };
    
    setBoardConfig(updatedConfig);
  };

  return {
    getItemsForColumn,
    handleAddBucket
  };
}

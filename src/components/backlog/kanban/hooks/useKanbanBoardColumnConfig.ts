
import { useEffect } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { 
  KanbanBoardConfig, 
  defaultKanbanConfig, 
  sprintColumnsConfig, 
  generateAssigneeColumns, 
  priorityColumnsConfig, 
  generateLabelColumns 
} from '@/utils/types/kanbanTypes';

export const useKanbanBoardColumnConfig = (
  boardConfig: KanbanBoardConfig,
  setBoardConfig: React.Dispatch<React.SetStateAction<KanbanBoardConfig>>,
  viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label',
  backlogItems: BacklogItem[]
) => {
  // Generate dynamic columns based on the view dimension
  useEffect(() => {
    let newConfig: KanbanBoardConfig = {...boardConfig, viewType: viewDimension};
    
    if (viewDimension === 'status') {
      // Use default status columns
      if (!boardConfig.columns.some(col => col.id === 'open')) {
        newConfig.columns = defaultKanbanConfig.columns;
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
    
    setBoardConfig(newConfig);
  }, [viewDimension, backlogItems, boardConfig]);
};

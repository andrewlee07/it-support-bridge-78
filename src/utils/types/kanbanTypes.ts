
import { ViewDimension } from "@/hooks/backlog/kanban/types";

export interface KanbanColumnConfig {
  id: string;
  displayName: string;
  statusValue: string;
  order: number;
  color: string;
}

export interface KanbanBoardConfig {
  columns: KanbanColumnConfig[];
  layout: 'horizontal' | 'grid';
  viewType: ViewDimension;
  defaultCollapsed: string[];
}

export const defaultKanbanConfig: KanbanBoardConfig = {
  columns: [
    {
      id: 'open',
      displayName: 'Open',
      statusValue: 'open',
      order: 1,
      color: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      id: 'in-progress',
      displayName: 'In Progress',
      statusValue: 'in-progress',
      order: 2,
      color: 'bg-yellow-50 dark:bg-yellow-950'
    },
    {
      id: 'ready',
      displayName: 'Ready for Testing',
      statusValue: 'ready',
      order: 3,
      color: 'bg-orange-50 dark:bg-orange-950'
    },
    {
      id: 'completed',
      displayName: 'Completed',
      statusValue: 'completed',
      order: 4,
      color: 'bg-green-50 dark:bg-green-950'
    }
  ],
  layout: 'horizontal',
  viewType: 'status',
  defaultCollapsed: []
};

export const sprintColumnsConfig: KanbanColumnConfig[] = [
  {
    id: 'backlog',
    displayName: 'Backlog',
    statusValue: 'backlog',
    order: 1,
    color: 'bg-gray-50 dark:bg-gray-950'
  },
  {
    id: 'sprint-1',
    displayName: 'Sprint 1',
    statusValue: 'sprint-1',
    order: 2,
    color: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    id: 'sprint-2',
    displayName: 'Sprint 2',
    statusValue: 'sprint-2',
    order: 3,
    color: 'bg-indigo-50 dark:bg-indigo-950'
  },
  {
    id: 'sprint-3',
    displayName: 'Sprint 3',
    statusValue: 'sprint-3',
    order: 4,
    color: 'bg-purple-50 dark:bg-purple-950'
  }
];

interface AssigneeInfo {
  id: string;
  name: string;
}

export const generateAssigneeColumns = (assignees: AssigneeInfo[]): KanbanColumnConfig[] => {
  return assignees.map((assignee, index) => ({
    id: `assignee-${assignee.id}`,
    displayName: assignee.name,
    statusValue: assignee.id,
    order: index + 1,
    color: 'bg-gray-50 dark:bg-gray-950'
  }));
};

export const priorityColumnsConfig: KanbanColumnConfig[] = [
  {
    id: 'priority-critical',
    displayName: 'Critical',
    statusValue: 'critical',
    order: 1,
    color: 'bg-red-50 dark:bg-red-950'
  },
  {
    id: 'priority-high',
    displayName: 'High',
    statusValue: 'high',
    order: 2,
    color: 'bg-orange-50 dark:bg-orange-950'
  },
  {
    id: 'priority-medium',
    displayName: 'Medium',
    statusValue: 'medium',
    order: 3,
    color: 'bg-yellow-50 dark:bg-yellow-950'
  },
  {
    id: 'priority-low',
    displayName: 'Low',
    statusValue: 'low',
    order: 4,
    color: 'bg-green-50 dark:bg-green-950'
  },
  {
    id: 'priority-none',
    displayName: 'No Priority',
    statusValue: 'none',
    order: 5,
    color: 'bg-gray-50 dark:bg-gray-950'
  }
];

export const generateLabelColumns = (labels: string[]): KanbanColumnConfig[] => {
  return labels.map((label, index) => ({
    id: `label-${label.replace(/\s+/g, '-').toLowerCase()}`,
    displayName: label,
    statusValue: label,
    order: index + 1,
    color: 'bg-gray-50 dark:bg-gray-950'
  }));
};

export const generateReleaseColumns = (releases: string[]): KanbanColumnConfig[] => {
  return releases.map((releaseId, index) => {
    const displayName = releaseId === 'unassigned' 
      ? 'No Release' 
      : `Release ${releaseId.replace('release-', '')}`;
      
    return {
      id: `release-${releaseId}`,
      displayName,
      statusValue: releaseId,
      order: index + 1,
      color: 'bg-gray-50 dark:bg-gray-950'
    };
  });
};

// Additional column generators for new dimensions like progress and due date can be added here


// Kanban board configuration types
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
  defaultCollapsed: string[];
}

// Default configuration
export const defaultKanbanConfig: KanbanBoardConfig = {
  columns: [
    { id: 'open', displayName: 'To Do', statusValue: 'open', order: 1, color: 'bg-blue-50 dark:bg-blue-950' },
    { id: 'in-progress', displayName: 'In Progress', statusValue: 'in-progress', order: 2, color: 'bg-yellow-50 dark:bg-yellow-950' },
    { id: 'ready', displayName: 'Ready', statusValue: 'ready', order: 3, color: 'bg-green-50 dark:bg-green-950' },
    { id: 'blocked', displayName: 'Blocked', statusValue: 'blocked', order: 4, color: 'bg-red-50 dark:bg-red-950' },
    { id: 'completed', displayName: 'Completed', statusValue: 'completed', order: 5, color: 'bg-purple-50 dark:bg-purple-950' },
    { id: 'deferred', displayName: 'Deferred', statusValue: 'deferred', order: 6, color: 'bg-gray-50 dark:bg-gray-950' },
  ],
  layout: 'horizontal',
  defaultCollapsed: []
};

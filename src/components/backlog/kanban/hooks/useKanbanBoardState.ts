
import { useState, useEffect } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { KanbanBoardConfig, defaultKanbanConfig, sprintColumnsConfig } from '@/utils/types/kanbanTypes';
import { KanbanBoardState } from './types';

export const useKanbanBoardState = (viewDimension: 'status' | 'sprint' | 'assignee' | 'priority' | 'label'): KanbanBoardState => {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<string | undefined>(undefined);

  // Load configuration from localStorage if available
  useEffect(() => {
    const savedConfig = localStorage.getItem('kanbanBoardConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setBoardConfig(prev => ({
          ...parsedConfig,
          viewType: viewDimension // Always use the current view dimension
        }));
        
        // Load collapsed columns from saved config
        if (parsedConfig.defaultCollapsed) {
          setCollapsedColumns(parsedConfig.defaultCollapsed);
        }
      } catch (e) {
        console.error('Failed to parse saved kanban config:', e);
      }
    }
  }, [viewDimension]);

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('kanbanBoardConfig', JSON.stringify(boardConfig));
  }, [boardConfig]);

  // Setup event listener for custom events
  useEffect(() => {
    const handleOpenConfigEvent = () => {
      setConfigOpen(true);
    };

    const boardElement = document.querySelector('[data-kanban-board]');
    if (boardElement) {
      boardElement.addEventListener('openConfig', handleOpenConfigEvent);
    }

    return () => {
      if (boardElement) {
        boardElement.removeEventListener('openConfig', handleOpenConfigEvent);
      }
    };
  }, [boardConfig]); // Re-attach when boardConfig changes

  return {
    collapsedColumns,
    boardConfig,
    configOpen,
    newItemDialogOpen,
    editingItem,
    defaultStatus
  };
};

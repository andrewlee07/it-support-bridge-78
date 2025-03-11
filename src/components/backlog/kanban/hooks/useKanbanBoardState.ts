
import { useState, useEffect } from 'react';
import { KanbanBoardConfig, defaultKanbanConfig } from '@/utils/types/kanbanTypes';
import { KanbanBoardState, UseKanbanBoardProps } from './types';

export function useKanbanBoardState({ viewDimension }: Pick<UseKanbanBoardProps, 'viewDimension'>): KanbanBoardState {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [boardConfig, setBoardConfig] = useState<KanbanBoardConfig>(defaultKanbanConfig);
  const [configOpen, setConfigOpen] = useState(false);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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
  
  return {
    collapsedColumns,
    boardConfig,
    configOpen,
    newItemDialogOpen,
    editingItem,
    defaultStatus
  };
}

export function useKanbanBoardStateSetters(
  state: KanbanBoardState
): {
  setCollapsedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setBoardConfig: React.Dispatch<React.SetStateAction<KanbanBoardConfig>>;
  setConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<any>>;
  setDefaultStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
} {
  // We can't actually return the setters from the original hook,
  // so this is just a placeholder for the integration pattern
  return {
    setCollapsedColumns: () => {},
    setBoardConfig: () => {},
    setConfigOpen: () => {},
    setNewItemDialogOpen: () => {},
    setEditingItem: () => {},
    setDefaultStatus: () => {}
  };
}

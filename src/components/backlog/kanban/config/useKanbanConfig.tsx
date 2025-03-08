
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { KanbanBoardConfig, KanbanColumnConfig } from '@/utils/types/kanbanTypes';

export function useKanbanConfig(initialConfig: KanbanBoardConfig) {
  const [localConfig, setLocalConfig] = useState<KanbanBoardConfig>(() => ({
    ...initialConfig,
    columns: [...initialConfig.columns].sort((a, b) => a.order - b.order)
  }));

  const handleAddColumn = (displayName: string, statusValue: string) => {
    if (!displayName || !statusValue) return;

    const newColumn: KanbanColumnConfig = {
      id: uuidv4(),
      displayName,
      statusValue,
      order: localConfig.columns.length + 1,
      color: `bg-gray-50 dark:bg-gray-950`
    };

    setLocalConfig(prev => ({
      ...prev,
      columns: [...prev.columns, newColumn]
    }));
  };

  const handleRemoveColumn = (columnId: string) => {
    setLocalConfig(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.id !== columnId),
      defaultCollapsed: prev.defaultCollapsed.filter(id => id !== columnId)
    }));
  };

  const handleMoveColumn = (columnId: string, direction: 'up' | 'down') => {
    const columns = [...localConfig.columns];
    const index = columns.findIndex(col => col.id === columnId);
    
    if (direction === 'up' && index > 0) {
      const temp = columns[index - 1].order;
      columns[index - 1].order = columns[index].order;
      columns[index].order = temp;
      
      // Swap the elements in the array too
      [columns[index - 1], columns[index]] = [columns[index], columns[index - 1]];
    } else if (direction === 'down' && index < columns.length - 1) {
      const temp = columns[index + 1].order;
      columns[index + 1].order = columns[index].order;
      columns[index].order = temp;
      
      // Swap the elements in the array too
      [columns[index + 1], columns[index]] = [columns[index], columns[index + 1]];
    }
    
    setLocalConfig(prev => ({
      ...prev,
      columns
    }));
  };

  const handleToggleVisibility = (columnId: string, isVisible: boolean) => {
    setLocalConfig(prev => ({
      ...prev,
      defaultCollapsed: isVisible
        ? prev.defaultCollapsed.filter(id => id !== columnId)
        : [...prev.defaultCollapsed, columnId]
    }));
  };

  const handleLayoutChange = (layout: 'horizontal' | 'grid') => {
    setLocalConfig(prev => ({
      ...prev,
      layout
    }));
  };

  const getFinalConfig = () => {
    // Re-order columns sequentially
    const orderedColumns = [...localConfig.columns]
      .sort((a, b) => a.order - b.order)
      .map((col, index) => ({
        ...col,
        order: index + 1
      }));

    return {
      ...localConfig,
      columns: orderedColumns
    };
  };

  return {
    config: localConfig,
    handleAddColumn,
    handleRemoveColumn,
    handleMoveColumn,
    handleToggleVisibility,
    handleLayoutChange,
    getFinalConfig
  };
}

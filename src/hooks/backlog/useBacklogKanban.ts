
import { useState } from 'react';
import { 
  useBacklogFetch, 
  useBacklogDrag, 
  useBacklogActions, 
  useViewDimension,
} from './kanban';
import type { ViewDimension } from './kanban/types';

export type { ViewDimension };

/**
 * Main hook for backlog kanban functionality
 * Combines smaller, more focused hooks
 */
export const useBacklogKanban = () => {
  // Get backlog items and loading state
  const { backlogItems, setBacklogItems, isLoading } = useBacklogFetch();
  
  // Get view dimension state and handler
  const { viewDimension, handleViewDimensionChange } = useViewDimension();
  
  // Get drag and drop handler
  const { handleDragEnd } = useBacklogDrag({ 
    backlogItems, 
    setBacklogItems, 
    viewDimension 
  });
  
  // Get item action handlers
  const { handleEditItem, handleQuickStatusChange, handleCreateItem } = useBacklogActions({
    backlogItems,
    setBacklogItems
  });

  return {
    backlogItems,
    isLoading,
    viewDimension,
    handleDragEnd,
    handleEditItem,
    handleQuickStatusChange,
    handleCreateItem,
    handleViewDimensionChange,
  };
};


import { useState } from 'react';
import { toast } from 'sonner';
import { ViewDimension } from './types';

/**
 * Hook for managing view dimension of the kanban board
 */
export const useViewDimension = (initialDimension: ViewDimension = 'status') => {
  const [viewDimension, setViewDimension] = useState<ViewDimension>(initialDimension);

  const handleViewDimensionChange = (dimension: ViewDimension) => {
    setViewDimension(dimension);
    toast.success(`Board view changed to: By ${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`);
  };

  return {
    viewDimension,
    handleViewDimensionChange
  };
};

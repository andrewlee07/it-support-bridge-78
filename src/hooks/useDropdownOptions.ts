
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  ConfigurableEntityType, 
  DropdownOption 
} from '@/utils/types';
import { getDropdownOptionsByField } from '@/utils/mockData/dropdownConfigurations';

/**
 * Hook to fetch dropdown options for a specific entity field
 */
export const useDropdownOptions = (
  entityType: ConfigurableEntityType,
  fieldName: string
) => {
  // Cache options in React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['dropdownOptions', entityType, fieldName],
    queryFn: () => getDropdownOptionsByField(entityType, fieldName),
  });

  return {
    options: data || [],
    isLoading,
    error,
  };
};

/**
 * Hook to manage dynamic select options with labels and values
 */
export const useSelectOptions = (
  entityType: ConfigurableEntityType,
  fieldName: string
) => {
  const { options, isLoading, error } = useDropdownOptions(entityType, fieldName);
  
  // Transform options into the format expected by the Select component
  const selectOptions = options.map(option => ({
    label: option.label,
    value: option.value,
  }));
  
  return {
    selectOptions,
    isLoading,
    error,
  };
};

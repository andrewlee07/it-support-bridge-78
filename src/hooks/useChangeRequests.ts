
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChangeStatus } from '@/utils/types';
import { changeApi } from '@/utils/api/changeApi';
import { ChangeEvent } from 'react';

interface UseChangeRequestsParams {
  filter?: 'all' | 'pending' | 'upcoming' | 'completed';
  userId?: string;
}

export const useChangeRequests = (params?: UseChangeRequestsParams) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'upcoming' | 'completed'>(params?.filter || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filter = activeTab;
  const userId = params?.userId;

  let statusFilter: ChangeStatus[] = [];
  
  switch (filter) {
    case 'pending':
      statusFilter = ['submitted'];
      break;
    case 'upcoming':
      statusFilter = ['approved'];
      break;
    case 'completed':
      statusFilter = ['completed'];
      break;
    default:
      // 'all' tab - no status filter
      break;
  }
  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['changes', filter, userId, searchQuery],
    queryFn: async () => {
      const response = await changeApi.getChangeRequests(1, 50, {
        status: statusFilter.length > 0 ? statusFilter : undefined,
        createdBy: userId, // Using createdBy instead of assignedToUserId
        search: searchQuery
      });
      
      return response;
    }
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Create a properly typed callback for tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'all' | 'pending' | 'upcoming' | 'completed');
  };

  return {
    changes: data?.items || [],
    loading: isLoading,
    error: isError ? error : null,
    refetch,
    activeTab,
    setActiveTab: handleTabChange, // Return the wrapper function instead
    searchQuery,
    handleSearchChange,
    isLoading,
    isError
  };
};

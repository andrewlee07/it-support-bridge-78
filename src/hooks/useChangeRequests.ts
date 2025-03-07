
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChangeStatus } from '@/utils/types';
import { changeApi } from '@/utils/api/changeApi';

export const useChangeRequests = (initialTab = 'all', initialSearchQuery = '') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Query for change requests
  const { data: changesData, isLoading, isError, refetch } = useQuery({
    queryKey: ['changes', activeTab, searchQuery],
    queryFn: async () => {
      let statusFilter: ChangeStatus[] = [];
      
      switch (activeTab) {
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
      
      const response = await changeApi.getChangeRequests(1, 50, {
        status: statusFilter.length > 0 ? statusFilter : undefined,
        search: searchQuery || undefined
      });
      
      return response;
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    handleSearchChange,
    changesData,
    isLoading,
    isError,
    refetch,
    changes: changesData?.items || []
  };
};

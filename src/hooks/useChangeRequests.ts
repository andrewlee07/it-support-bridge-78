
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChangeStatus } from '@/utils/types';
import { changeApi } from '@/utils/api/changeApi';

interface UseChangeRequestsParams {
  filter?: 'all' | 'pending' | 'upcoming' | 'completed';
  userId?: string;
}

export const useChangeRequests = (params?: UseChangeRequestsParams) => {
  const filter = params?.filter || 'all';
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
    queryKey: ['changes', filter, userId],
    queryFn: async () => {
      const response = await changeApi.getChangeRequests(1, 50, {
        status: statusFilter.length > 0 ? statusFilter : undefined,
        assignedToUserId: userId
      });
      
      return response;
    }
  });

  return {
    changes: data?.items || [],
    loading: isLoading,
    error: isError ? error : null,
    refetch
  };
};

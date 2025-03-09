
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReleaseStatus } from '@/utils/types';
import { getReleases, getReleaseMetrics } from '@/utils/api/releaseApi';

export const useReleasesData = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReleaseStatus | undefined>(undefined);
  
  const getStatusFromTab = (tab: string): ReleaseStatus | undefined => {
    switch (tab) {
      case 'planned': return 'Planned';
      case 'inProgress': return 'In Progress';
      case 'deployed': return 'Deployed';
      default: return undefined;
    }
  };
  
  const { 
    data: releasesData, 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ['releases', activeTab, searchQuery, statusFilter],
    queryFn: async () => {
      const status = statusFilter || getStatusFromTab(activeTab);
      const response = await getReleases();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch releases');
      }
      return response.data;
    }
  });
  
  const {
    data: metricsData,
    isLoading: isLoadingMetrics
  } = useQuery({
    queryKey: ['releaseMetrics'],
    queryFn: async () => {
      const response = await getReleaseMetrics();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch metrics');
      }
      return response.data;
    }
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setStatusFilter(undefined);
  };

  return {
    // State
    activeTab,
    searchQuery,
    statusFilter,
    // Data
    releasesData,
    isLoading,
    isError,
    metricsData,
    isLoadingMetrics,
    // Actions
    setSearchQuery,
    setStatusFilter,
    handleTabChange,
    refetch
  };
};

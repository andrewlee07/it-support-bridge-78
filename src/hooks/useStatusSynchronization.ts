
import { useCallback, useEffect, useState } from 'react';
import { 
  getStatusSynchronizationSettings,
  updateStatusSynchronizationSettings,
  synchronizeReleaseStatus
} from '@/api/statusSynchronization';
import { StatusSynchronizationSettings, defaultStatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';
import { ReleaseStatus } from '@/utils/types/release';

export function useStatusSynchronization() {
  const [settings, setSettings] = useState<StatusSynchronizationSettings>(defaultStatusSynchronizationSettings);

  // Fetch settings
  const { isLoading, refetch } = useQuery({
    queryKey: ['statusSynchronizationSettings'],
    queryFn: async () => {
      const response = await getStatusSynchronizationSettings();
      if (response.success) {
        setSettings(response.data);
      }
      return response.data;
    }
  });

  // Mutation for updating settings
  const updateMutation = useMutation({
    mutationFn: updateStatusSynchronizationSettings,
    onSuccess: (data) => {
      setSettings(data.data);
    }
  });

  // Function to update settings
  const updateSettings = useCallback((newSettings: StatusSynchronizationSettings) => {
    updateMutation.mutate(newSettings);
  }, [updateMutation]);

  // Function to handle status synchronization
  const handleStatusChange = useCallback(async (
    releaseId: string, 
    status: ReleaseStatus
  ) => {
    if (!settings.enableCascadingUpdates) return { updatedItems: 0 };
    
    const response = await synchronizeReleaseStatus(releaseId, status);
    return response.data;
  }, [settings.enableCascadingUpdates]);

  // Get the mapped status for backlog items
  const getBacklogStatusForRelease = useCallback((releaseStatus: ReleaseStatus): BacklogItemStatus => {
    return settings.releaseToBacklogMapping[releaseStatus] || 'open';
  }, [settings.releaseToBacklogMapping]);

  // Get the mapped status for bugs
  const getBugStatusForRelease = useCallback((releaseStatus: ReleaseStatus): string => {
    return settings.releaseToBugMapping[releaseStatus] || 'open';
  }, [settings.releaseToBugMapping]);

  return {
    settings,
    updateSettings,
    isLoading: isLoading || updateMutation.isPending,
    handleStatusChange,
    getBacklogStatusForRelease,
    getBugStatusForRelease,
    refresh: refetch
  };
}

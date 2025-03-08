
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReleaseStatus } from '@/utils/api/releaseApi';
import { useToast } from '@/hooks/use-toast';
import { StatusMappingConfiguration, defaultStatusMappingConfiguration } from '@/utils/statusSynchronization/statusMappings';

interface UseReleaseStatusChangeProps {
  releaseId: string;
  userId: string;
  onSuccess?: () => void;
}

export const useReleaseStatusChange = ({ 
  releaseId, 
  userId,
  onSuccess 
}: UseReleaseStatusChangeProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [syncOptions, setSyncOptions] = useState<StatusMappingConfiguration>(
    defaultStatusMappingConfiguration
  );
  
  // Mutation for updating release status
  const statusMutation = useMutation({
    mutationFn: (status: string) => updateReleaseStatus(releaseId, status as any, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['release', releaseId] });
      queryClient.invalidateQueries({ queryKey: ['backlogItems', releaseId] });
      queryClient.invalidateQueries({ queryKey: ['bugs', { releaseId }] });
      
      toast({
        title: 'Status Updated',
        description: `Release status has been updated to ${data.data?.status}`,
      });
      
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update release status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive'
      });
    }
  });
  
  // Function to update status
  const changeStatus = (newStatus: string) => {
    statusMutation.mutate(newStatus);
  };
  
  return {
    changeStatus,
    isLoading: statusMutation.isPending,
    error: statusMutation.error,
    syncOptions,
    setSyncOptions
  };
};

export default useReleaseStatusChange;

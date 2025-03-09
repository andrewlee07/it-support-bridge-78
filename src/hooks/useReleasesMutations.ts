
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { updateReleaseApproval } from '@/utils/api/releaseApi';

export const useReleasesMutations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);
  
  const approveMutation = useMutation({
    mutationFn: async (releaseId: string) => {
      if (!user) throw new Error('User not authenticated');
      const response = await updateReleaseApproval(releaseId, true, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to approve release');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      queryClient.invalidateQueries({ queryKey: ['releaseMetrics'] });
      toast({
        title: "Release Approved",
        description: "The release has been approved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Approval Failed",
        description: error instanceof Error ? error.message : "Failed to approve release",
        variant: "destructive",
      });
    }
  });
  
  const rejectMutation = useMutation({
    mutationFn: async ({ releaseId, reason }: { releaseId: string, reason: string }) => {
      if (!user) throw new Error('User not authenticated');
      const response = await updateReleaseApproval(releaseId, false, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to reject release');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      queryClient.invalidateQueries({ queryKey: ['releaseMetrics'] });
      toast({
        title: "Release Rejected",
        description: "The release has been rejected.",
      });
    },
    onError: (error) => {
      toast({
        title: "Rejection Failed",
        description: error instanceof Error ? error.message : "Failed to reject release",
        variant: "destructive",
      });
    }
  });
  
  const handleApprove = (releaseId: string) => {
    approveMutation.mutate(releaseId);
  };
  
  const handleReject = (releaseId: string) => {
    setSelectedReleaseId(releaseId);
    setRejectionDialogOpen(true);
  };
  
  const handleConfirmReject = (reason: string) => {
    if (selectedReleaseId) {
      rejectMutation.mutate({ releaseId: selectedReleaseId, reason });
    }
  };
  
  const canApproveReleases = user?.role === 'admin' || user?.role === 'release-manager';

  return {
    // State
    rejectionDialogOpen,
    selectedReleaseId,
    // Permissions
    canApproveReleases,
    // Handlers
    setRejectionDialogOpen,
    handleApprove,
    handleReject,
    handleConfirmReject
  };
};

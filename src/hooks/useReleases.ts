
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Release, ReleaseStatus } from '@/utils/types';
import { 
  getReleases, 
  updateReleaseApproval,
  getReleaseMetrics
} from '@/utils/api/releaseApi';

export const useReleases = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReleaseStatus | undefined>(undefined);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);
  
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
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setStatusFilter(undefined);
  };
  
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
  
  const handleCreateNew = () => {
    navigate('/releases/new');
  };
  
  const handleViewRelease = (releaseId: string) => {
    navigate(`/releases/${releaseId}`);
  };
  
  const canApproveReleases = user?.role === 'admin' || user?.role === 'release-manager';

  return {
    // State
    activeTab,
    searchQuery,
    statusFilter,
    rejectionDialogOpen,
    selectedReleaseId,
    // Data
    releasesData,
    isLoading,
    isError,
    metricsData,
    isLoadingMetrics,
    canApproveReleases,
    // Handlers
    setSearchQuery,
    setStatusFilter,
    setRejectionDialogOpen,
    handleTabChange,
    handleApprove,
    handleReject,
    handleConfirmReject,
    handleCreateNew,
    handleViewRelease,
    refetch
  };
};

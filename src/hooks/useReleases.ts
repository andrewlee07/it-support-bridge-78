
import { useNavigate } from 'react-router-dom';
import { useReleasesData } from './useReleasesData';
import { useReleasesMutations } from './useReleasesMutations';

export const useReleases = () => {
  const navigate = useNavigate();
  const releasesData = useReleasesData();
  const releasesMutations = useReleasesMutations();
  
  const handleCreateNew = () => {
    navigate('/releases/new');
  };
  
  const handleViewRelease = (releaseId: string) => {
    navigate(`/releases/${releaseId}`);
  };

  return {
    // State from useReleasesData
    activeTab: releasesData.activeTab,
    searchQuery: releasesData.searchQuery,
    statusFilter: releasesData.statusFilter,
    // State from useReleasesMutations
    rejectionDialogOpen: releasesMutations.rejectionDialogOpen,
    selectedReleaseId: releasesMutations.selectedReleaseId,
    // Data from useReleasesData
    releasesData: releasesData.releasesData,
    isLoading: releasesData.isLoading,
    isError: releasesData.isError,
    metricsData: releasesData.metricsData,
    isLoadingMetrics: releasesData.isLoadingMetrics,
    // Permissions from useReleasesMutations
    canApproveReleases: releasesMutations.canApproveReleases,
    // Handlers from useReleasesData
    setSearchQuery: releasesData.setSearchQuery,
    setStatusFilter: releasesData.setStatusFilter,
    handleTabChange: releasesData.handleTabChange,
    refetch: releasesData.refetch,
    // Handlers from useReleasesMutations
    setRejectionDialogOpen: releasesMutations.setRejectionDialogOpen,
    handleApprove: releasesMutations.handleApprove,
    handleReject: releasesMutations.handleReject,
    handleConfirmReject: releasesMutations.handleConfirmReject,
    // Navigation handlers
    handleCreateNew,
    handleViewRelease
  };
};

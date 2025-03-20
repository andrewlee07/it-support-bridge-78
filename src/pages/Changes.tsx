
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import ChangesHeader from '@/components/changes/ChangesHeader';
import ChangesSearch from '@/components/changes/ChangesSearch';
import ChangeTabs from '@/components/changes/ChangeTabs';
import RejectChangeDialog from '@/components/changes/RejectChangeDialog';
import { useChangeRequests } from '@/hooks/useChangeRequests';
import { useChangeRequestMutations } from '@/hooks/useChangeRequestMutations';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import { logRouteValidationResults, testAllDefinedRoutes } from '@/utils/testing/linkTesting';

const Changes = () => {
  // In development mode, validate all routes on component mount
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const results = testAllDefinedRoutes();
      logRouteValidationResults(results);
    }
  }, []);
  
  const { user } = useAuth();
  const navigation = useAppNavigation();
  
  // Change request states
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>(() => {
    // Get saved preference from localStorage or default to grid
    const savedPreference = localStorage.getItem('changeViewMode');
    return (savedPreference as 'grid' | 'table') || 'grid';
  });
  
  // Custom hooks
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    handleSearchChange,
    changes,
    isLoading,
    isError,
    refetch
  } = useChangeRequests({
    userId: user?.id
  });
  
  const { approveMutation, rejectMutation } = useChangeRequestMutations(user?.id || '');

  // Save view mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('changeViewMode', viewMode);
  }, [viewMode]);

  // Event handlers
  const handleApprove = (changeId: string) => {
    if (!user) return;
    approveMutation.mutate(changeId);
  };

  const handleRejectClick = (changeId: string) => {
    setSelectedChangeId(changeId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedChangeId || !rejectionReason.trim()) return;
    
    rejectMutation.mutate({
      changeId: selectedChangeId,
      reason: rejectionReason
    });
    
    // Reset state
    setRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedChangeId(null);
  };

  const handleCreateNewRequest = () => {
    navigation.goToNewChange();
  };

  const handleViewChange = (changeId: string) => {
    navigation.goToChangeDetail(changeId);
    console.log(`Navigating to change: ${changeId} using consistent navigation utility`);
  };

  const handleViewModeChange = (mode: 'grid' | 'table') => {
    setViewMode(mode);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <ChangesHeader onCreateNew={handleCreateNewRequest} />
        
        <ChangesSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <ChangeTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          changes={changes}
          isLoading={isLoading}
          isError={isError}
          onApprove={handleApprove}
          onReject={handleRejectClick}
          onCreateNew={handleCreateNewRequest}
          onViewChange={handleViewChange}
          refetch={refetch}
          userRole={user?.role}
          searchQuery={searchQuery}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
      </div>

      <RejectChangeDialog
        isOpen={rejectDialogOpen}
        setIsOpen={setRejectDialogOpen}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={handleRejectConfirm}
      />
    </PageTransition>
  );
};

export default Changes;

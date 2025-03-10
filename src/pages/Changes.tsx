
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import ChangesHeader from '@/components/changes/ChangesHeader';
import ChangesSearch from '@/components/changes/ChangesSearch';
import ChangeTabs from '@/components/changes/ChangeTabs';
import RejectChangeDialog from '@/components/changes/RejectChangeDialog';
import { useChangeRequests } from '@/hooks/useChangeRequests';
import { useChangeRequestMutations } from '@/hooks/useChangeRequestMutations';

const Changes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
  } = useChangeRequests();
  
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
    navigate('/changes/new');
  };

  const handleViewChange = (changeId: string) => {
    navigate(`/changes/${changeId}`);
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

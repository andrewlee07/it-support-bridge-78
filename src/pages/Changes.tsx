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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ChangesTable from '@/components/changes/ChangesTable';

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

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="py-4">
                {/* Additional filters could go here */}
              </CardHeader>
              
              <CardContent className="p-0">
                <ChangesTable
                  changes={changes}
                  activeTab={activeTab}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onViewChange={handleViewChange}
                  userRole={user?.role}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs content would follow the same pattern */}
          <TabsContent value="submitted" className="space-y-4">
            {/* Similar content as 'all' tab but filtered */}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            {/* Similar content as 'all' tab but filtered */}
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            {/* Similar content as 'all' tab but filtered */}
          </TabsContent>
        </Tabs>
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

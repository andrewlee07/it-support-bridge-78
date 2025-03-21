import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import ChangesHeader from '@/components/changes/ChangesHeader';
import ChangesSearch from '@/components/changes/ChangesSearch';
import ChangesTable from '@/components/changes/ChangesTable';
import RejectChangeDialog from '@/components/changes/RejectChangeDialog';
import { useChangeRequests } from '@/hooks/useChangeRequests';
import { useChangeRequestMutations } from '@/hooks/useChangeRequestMutations';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import { useAuth } from '@/contexts/AuthContext';

const Changes = () => {
  const { user } = useAuth();
  const navigation = useAppNavigation();
  
  // Change request states
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);
  
  // Custom hooks
  const {
    changes,
    activeTab,
    setActiveTab,
    searchQuery,
    handleSearchChange,
    isLoading,
    isError,
    refetch
  } = useChangeRequests({
    userId: user?.id
  });
  
  const { approveMutation, rejectMutation } = useChangeRequestMutations(user?.id || '');

  // Event handlers
  const handleApprove = (changeId: string) => {
    if (!user) return;
    approveMutation.mutate(changeId);
    toast.success('Change request approved');
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
    
    toast.success('Change request rejected');
    
    // Reset state
    setRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedChangeId(null);
  };

  const handleCreateNewRequest = () => {
    navigation.goToNewChange();
  };

  const handleViewChange = useCallback((changeId: string) => {
    navigation.goToChangeDetail(changeId);
  }, [navigation]);

  // Get cards data
  const totalChanges = changes?.length || 0;
  const submittedChanges = changes?.filter(change => change.status === 'submitted').length || 0;
  const approvedChanges = changes?.filter(change => change.status === 'approved').length || 0;
  const inProgressChanges = changes?.filter(change => change.status === 'in-progress').length || 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <ChangesHeader onCreateNew={handleCreateNewRequest} />

        {/* Metrics Cards - Interactive Filters */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Total Changes</p>
                <div className="text-4xl font-bold">{totalChanges}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                <div className="text-4xl font-bold">{submittedChanges}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <div className="text-4xl font-bold">{approvedChanges}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <div className="text-4xl font-bold">{inProgressChanges}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <ChangesSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        {/* Tabs for different change types */}
        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value)}>
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
          
          {/* Other tabs would use filtered data */}
          <TabsContent value="submitted" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ChangesTable
                  changes={changes?.filter(change => change.status === 'submitted')}
                  activeTab={activeTab}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onViewChange={handleViewChange}
                  userRole={user?.role}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ChangesTable
                  changes={changes?.filter(change => change.status === 'approved')}
                  activeTab={activeTab}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onViewChange={handleViewChange}
                  userRole={user?.role}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ChangesTable
                  changes={changes?.filter(change => change.status === 'in-progress')}
                  activeTab={activeTab}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onViewChange={handleViewChange}
                  userRole={user?.role}
                />
              </CardContent>
            </Card>
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

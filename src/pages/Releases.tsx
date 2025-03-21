import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { useReleases } from '@/hooks/useReleases';
import ReleasesHeader from '@/components/releases/ReleasesHeader';
import ReleasesList from '@/components/releases/ReleasesList';
import RejectReleaseDialog from '@/components/releases/RejectReleaseDialog';
import ReleaseMetrics from '@/components/releases/ReleaseMetrics';

const Releases = () => {
  const { user } = useAuth();
  const releases = useReleases();
  
  // Handle view release
  const handleViewRelease = useCallback((releaseId: string) => {
    releases.handleViewRelease(releaseId);
  }, [releases]);

  // Handle approve
  const handleApprove = (releaseId: string) => {
    if (releases.handleApprove) {
      releases.handleApprove(releaseId);
      toast.success('Release approved');
    }
  };

  // Handle reject click
  const handleRejectClick = (releaseId: string) => {
    if (releases.handleReject) {
      releases.handleReject(releaseId);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <ReleasesHeader
          onCreateNew={releases.handleCreateNew}
          onTabChange={releases.handleTabChange}
          activeTab={releases.activeTab}
          onStatusFilterChange={releases.setStatusFilter}
          statusFilter={releases.statusFilter}
          totalCount={releases.releasesData?.length || 0}
        />
        
        {/* Metrics Cards */}
        {releases.metricsData && (
          <ReleaseMetrics 
            metrics={releases.metricsData} 
            isLoading={releases.isLoadingMetrics} 
          />
        )}

        {/* Tabs for different release types */}
        <Tabs defaultValue="all" onValueChange={(value) => releases.handleTabChange?.(value)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Releases</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="deployed">Deployed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="py-4">
                {/* Additional filters could go here */}
              </CardHeader>
              
              <CardContent className="p-0">
                <ReleasesList
                  releases={releases.releasesData || []}
                  isLoading={releases.isLoading}
                  isError={releases.isError}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onCreateNew={releases.handleCreateNew}
                  onViewRelease={handleViewRelease}
                  refetch={releases.refetch}
                  userRole={user?.role}
                  canApprove={releases.canApproveReleases}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs with filtered data */}
          <TabsContent value="planned" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ReleasesList
                  releases={(releases.releasesData || []).filter(release => release.status === 'Planned')}
                  isLoading={releases.isLoading}
                  isError={releases.isError}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onCreateNew={releases.handleCreateNew}
                  onViewRelease={handleViewRelease}
                  refetch={releases.refetch}
                  userRole={user?.role}
                  canApprove={releases.canApproveReleases}
                  viewType="planned"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ReleasesList
                  releases={(releases.releasesData || []).filter(release => release.status === 'In Progress')}
                  isLoading={releases.isLoading}
                  isError={releases.isError}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onCreateNew={releases.handleCreateNew}
                  onViewRelease={handleViewRelease}
                  refetch={releases.refetch}
                  userRole={user?.role}
                  canApprove={releases.canApproveReleases}
                  viewType="inProgress"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deployed" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ReleasesList
                  releases={(releases.releasesData || []).filter(release => release.status === 'Deployed')}
                  isLoading={releases.isLoading}
                  isError={releases.isError}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onCreateNew={releases.handleCreateNew}
                  onViewRelease={handleViewRelease}
                  refetch={releases.refetch}
                  userRole={user?.role}
                  canApprove={releases.canApproveReleases}
                  viewType="deployed"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Reject Dialog */}
        <RejectReleaseDialog
          isOpen={releases.rejectionDialogOpen}
          onClose={() => releases.setRejectionDialogOpen(false)}
          onConfirm={releases.handleConfirmReject}
        />
      </div>
    </PageTransition>
  );
};

export default Releases;

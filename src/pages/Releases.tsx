
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

  // Type-safe version of status filter change handler
  const handleStatusFilterChange = (value: string[]) => {
    if (releases.setStatusFilter) {
      // Convert string[] to ReleaseStatus or undefined
      const statusFilter = value.length > 0 ? value[0] as any : undefined;
      releases.setStatusFilter(statusFilter);
    }
  };

  // Create metrics data in the expected format for the ReleaseMetrics component
  const metricsData = {
    planned: releases.metricsData?.statusCounts?.Planned || 0,
    inProgress: releases.metricsData?.statusCounts?.['In Progress'] || 0,
    deployed: releases.metricsData?.statusCounts?.Deployed || 0,
    cancelled: releases.metricsData?.statusCounts?.Cancelled || 0
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <ReleasesHeader
          onCreateNew={releases.handleCreateNew}
          onTabChange={releases.handleTabChange}
          activeTab={releases.activeTab}
          onStatusFilterChange={handleStatusFilterChange}
          statusFilter={releases.statusFilter ? [releases.statusFilter] : []}
          totalCount={releases.releasesData?.length || 0}
        />
        
        {/* Metrics Cards */}
        <ReleaseMetrics 
          metrics={metricsData} 
          isLoading={releases.isLoadingMetrics || false} 
        />

        {/* Tabs for different release types */}
        <Tabs 
          defaultValue="all" 
          onValueChange={(value) => releases.handleTabChange?.(value)}
          className="bg-secondary/50 border border-border/20 p-1 rounded-lg"
        >
          <TabsList className="mb-4 bg-background/10 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Releases</TabsTrigger>
            <TabsTrigger value="planned" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Planned</TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">In Progress</TabsTrigger>
            <TabsTrigger value="deployed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Deployed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardHeader className="py-4 bg-secondary/50">
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
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
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
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
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
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
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

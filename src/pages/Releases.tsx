
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesHeader from '@/components/releases/ReleasesHeader';
import ReleaseMetrics from '@/components/releases/ReleaseMetrics';
import RejectReleaseDialog from '@/components/releases/RejectReleaseDialog';
import { useReleases } from '@/hooks/useReleases';
import ReleasesContent from '@/components/releases/ReleasesContent';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';

const Releases = () => {
  const releases = useReleases();
  
  return (
    <PageTransition>
      <div className="container mx-auto py-6 space-y-6">
        <ReleasesErrorBoundary>
          <ReleasesHeader
            onTabChange={releases.handleTabChange}
            onAddNew={releases.handleCreateNew}
            activeTab={releases.activeTab}
            onStatusFilterChange={releases.setStatusFilter}
            statusFilter={releases.statusFilter}
            totalCount={releases.releasesData?.length || 0}
          />
        </ReleasesErrorBoundary>
        
        {releases.metricsData && (
          <ReleasesErrorBoundary>
            <ReleaseMetrics 
              metrics={releases.metricsData} 
              isLoading={releases.isLoadingMetrics} 
            />
          </ReleasesErrorBoundary>
        )}
        
        <ReleasesErrorBoundary>
          <ReleasesContent 
            releases={releases} 
          />
        </ReleasesErrorBoundary>
        
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

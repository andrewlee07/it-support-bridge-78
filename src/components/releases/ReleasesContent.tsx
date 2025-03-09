
import React from 'react';
import ReleasesSearch from './ReleasesSearch';
import ReleasesList from './ReleasesList';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';

interface ReleasesContentProps {
  releases: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    releasesData: any[] | undefined;
    isLoading: boolean;
    isError: boolean;
    activeTab: string;
    handleApprove: (releaseId: string) => void;
    handleReject: (releaseId: string) => void;
    handleCreateNew: () => void;
    handleViewRelease: (releaseId: string) => void;
    refetch: () => void;
    canApproveReleases: boolean;
  }
}

const ReleasesContent: React.FC<ReleasesContentProps> = ({ releases }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <ReleasesErrorBoundary>
          <ReleasesSearch 
            searchQuery={releases.searchQuery}
            setSearchQuery={releases.setSearchQuery}
          />
        </ReleasesErrorBoundary>
      </div>
      
      <ReleasesErrorBoundary>
        <ReleasesList
          releases={releases.releasesData || []}
          isLoading={releases.isLoading}
          isError={releases.isError}
          onApprove={releases.handleApprove}
          onReject={releases.handleReject}
          onCreateNew={releases.handleCreateNew}
          onViewRelease={releases.handleViewRelease}
          refetch={releases.refetch}
          viewType={releases.activeTab as any}
          searchQuery={releases.searchQuery}
          canApprove={releases.canApproveReleases}
        />
      </ReleasesErrorBoundary>
    </div>
  );
};

export default ReleasesContent;

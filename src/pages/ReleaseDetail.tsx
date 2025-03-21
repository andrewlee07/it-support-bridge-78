
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ReleaseDetailContent from '@/components/releases/detail/ReleaseDetailContent';
import ReleaseDetailDialogs from '@/components/releases/detail/ReleaseDetailDialogs';
import useReleaseDetail from '@/hooks/useReleaseDetail';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';

const ReleaseDetailPage = () => {
  const {
    id,
    release,
    isLoading,
    showAddItems,
    setShowAddItems,
    selectedBacklogItem,
    setSelectedBacklogItem,
    editingBacklogItem,
    setEditingBacklogItem,
    statusMutation,
    approvalMutation,
    canApprove,
    handleEdit,
    handleAddItem,
    handleRemoveItem,
    handleApprove,
    handleReject,
    handleChangeStatus,
    handleSelectBacklogItems,
    handleViewBacklogItem,
    handleEditBacklogItem,
    handleBacklogItemUpdated
  } = useReleaseDetail();

  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        {!isLoading && release && (
          <DetailBreadcrumb 
            entityName="Release"
            entityId={release.id}
            parentRoute="/releases"
            parentName="Releases"
          />
        )}
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-24 bg-muted rounded w-full" />
          </div>
        ) : release ? (
          <ReleaseDetailContent
            releaseId={id || ''}
            release={release}
            isLoading={isLoading}
            isPending={statusMutation.isPending || approvalMutation.isPending}
            canApprove={canApprove}
            onEdit={handleEdit}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onApprove={handleApprove}
            onReject={handleReject}
            onChangeStatus={handleChangeStatus}
            onViewBacklogItem={handleViewBacklogItem}
          />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Release not found</h2>
            <p className="text-muted-foreground">
              The release you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
        
        <ReleaseDetailDialogs
          releaseId={id || ''}
          showAddItems={showAddItems}
          setShowAddItems={setShowAddItems}
          selectedBacklogItem={selectedBacklogItem}
          setSelectedBacklogItem={setSelectedBacklogItem}
          editingBacklogItem={editingBacklogItem}
          setEditingBacklogItem={setEditingBacklogItem}
          onSelectItems={handleSelectBacklogItems}
          onEditBacklogItem={handleEditBacklogItem}
          onBacklogItemUpdated={handleBacklogItemUpdated}
        />
      </div>
    </PageTransition>
  );
};

export default ReleaseDetailPage;

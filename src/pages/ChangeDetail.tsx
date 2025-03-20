
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ChangeRequestDetailView from '@/components/changes/detail/ChangeRequestDetailView';
import ChangeRequestLoading from '@/components/changes/detail/ChangeRequestLoading';
import ChangeRequestError from '@/components/changes/detail/ChangeRequestError';
import { useChangeRequestDetail } from '@/hooks/useChangeRequestDetail';

const ChangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    changeRequest,
    loading,
    error,
    handleApprove,
    handleUpdateStatus,
    handleAddImplementor,
    handleAddApprover
  } = useChangeRequestDetail(id);

  // If loading, show loading state
  if (loading) {
    return <ChangeRequestLoading />;
  }

  // If error or no change request, show error state
  if (error || !changeRequest) {
    return (
      <ChangeRequestError
        returnPath="/changes"
        entityName="Change Request"
      />
    );
  }

  return (
    <PageTransition>
      <ChangeRequestDetailView
        changeRequest={changeRequest}
        onApprove={handleApprove}
        onReject={() => window.location.href = `/changes/${changeRequest.id}/reject`}
        onEdit={() => window.location.href = `/changes/${changeRequest.id}/edit`}
        onUpdateStatus={handleUpdateStatus}
        onAddImplementor={handleAddImplementor}
        onAddApprover={handleAddApprover}
        onClose={() => window.location.href = `/changes/${changeRequest.id}/close`}
      />
    </PageTransition>
  );
};

export default ChangeDetail;


import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ChangeRequestDetailView from '@/components/changes/detail/ChangeRequestDetailView';
import ChangeRequestLoading from '@/components/changes/detail/ChangeRequestLoading';
import ChangeRequestError from '@/components/changes/detail/ChangeRequestError';
import { useChangeRequestDetail } from '@/hooks/useChangeRequestDetail';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import * as ROUTES from '@/utils/routes/routeConstants';

const ChangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigation = useAppNavigation();
  
  // Added console log to help with debugging
  console.log('ChangeDetail: Rendering with ID:', id);
  
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
        returnPath={ROUTES.CHANGES}
        entityName="Change Request"
      />
    );
  }

  // Added console log to confirm we have data
  console.log('ChangeDetail: Loaded change request:', changeRequest.id);

  return (
    <PageTransition>
      <ChangeRequestDetailView
        changeRequest={changeRequest}
        onApprove={handleApprove}
        onReject={() => navigation.goToRejectChange(changeRequest.id)}
        onEdit={() => navigation.goToEditChange(changeRequest.id)}
        onUpdateStatus={handleUpdateStatus}
        onAddImplementor={handleAddImplementor}
        onAddApprover={handleAddApprover}
        onClose={() => navigation.goToCloseChange(changeRequest.id)}
      />
    </PageTransition>
  );
};

export default ChangeDetail;

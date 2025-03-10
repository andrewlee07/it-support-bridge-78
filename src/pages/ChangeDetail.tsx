
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ChangeRequestDetail from '@/components/changes/ChangeRequestDetail';
import ChangeRequestLoading from '@/components/changes/detail/ChangeRequestLoading';
import ChangeRequestError from '@/components/changes/detail/ChangeRequestError';
import ChangeRequestHeader from '@/components/changes/detail/ChangeRequestHeader';
import { useChangeRequestDetail } from '@/hooks/useChangeRequestDetail';

const ChangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    changeRequest,
    loading,
    error,
    handleApprove,
    handleUpdateStatus,
    handleAddImplementor,
    handleAddApprover
  } = useChangeRequestDetail(id);

  const handleReject = () => {
    if (!changeRequest) return;
    navigate(`/changes/${changeRequest.id}/reject`);
  };

  const handleEdit = () => {
    if (!changeRequest) return;
    navigate(`/changes/${changeRequest.id}/edit`);
  };

  const handleClose = () => {
    if (!changeRequest) return;
    navigate(`/changes/${changeRequest.id}/close`);
  };

  const handleStatusUpdate = (status: string, closureReason?: string) => {
    handleUpdateStatus(status, closureReason);
  };

  if (loading) {
    return <ChangeRequestLoading />;
  }

  if (error || !changeRequest) {
    return <ChangeRequestError />;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <ChangeRequestHeader changeRequest={changeRequest} />
        
        <ChangeRequestDetail 
          changeRequest={changeRequest} 
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
          onUpdateStatus={handleStatusUpdate}
          onAddImplementor={handleAddImplementor}
          onAddApprover={handleAddApprover}
          onClose={handleClose}
        />
      </div>
    </PageTransition>
  );
};

export default ChangeDetail;

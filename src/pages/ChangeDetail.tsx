
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { getChangeRequestById } from '@/utils/api/change/operations/getChangeRequestById';
import { updateChangeRequest } from '@/utils/api/change/operations/updateChangeRequest';
import { ChangeRequest } from '@/utils/types/change';
import ChangeRequestDetail from '@/components/changes/ChangeRequestDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ChangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChangeRequest = async () => {
      try {
        setLoading(true);
        const response = await getChangeRequestById(id || '');
        if (response.success && response.data) {
          setChangeRequest(response.data);
          setError(null);
        } else {
          setError(response.message || 'Failed to load change request');
          setChangeRequest(null);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setChangeRequest(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChangeRequest();
    }
  }, [id]);

  const handleApprove = async () => {
    if (!changeRequest || !user) return;
    
    try {
      const response = await updateChangeRequest(
        changeRequest.id,
        { 
          status: 'approved',
          approvedBy: user.id,
          approvedAt: new Date()
        },
        user.id
      );
      
      if (response.success && response.data) {
        setChangeRequest(response.data);
        toast.success('Change request approved successfully');
      } else {
        toast.error(response.message || 'Failed to approve change request');
      }
    } catch (err) {
      toast.error('An error occurred while approving the change request');
    }
  };

  const handleReject = async () => {
    if (!changeRequest || !user) return;
    navigate(`/changes/${changeRequest.id}/reject`);
  };

  const handleEdit = () => {
    if (!changeRequest) return;
    navigate(`/changes/${changeRequest.id}/edit`);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!changeRequest || !user) return;
    
    try {
      const response = await updateChangeRequest(
        changeRequest.id,
        { status: status as any },
        user.id
      );
      
      if (response.success && response.data) {
        setChangeRequest(response.data);
        toast.success(`Change request status updated to ${status}`);
      } else {
        toast.error(response.message || 'Failed to update change request status');
      }
    } catch (err) {
      toast.error('An error occurred while updating the change request');
    }
  };

  const handleAddImplementor = async (userId: string) => {
    if (!changeRequest || !user) return;
    
    try {
      const response = await updateChangeRequest(
        changeRequest.id,
        { implementor: userId },
        user.id
      );
      
      if (response.success && response.data) {
        setChangeRequest(response.data);
        toast.success('Implementor assigned successfully');
      } else {
        toast.error(response.message || 'Failed to assign implementor');
      }
    } catch (err) {
      toast.error('An error occurred while updating the change request');
    }
  };

  const handleAddApprover = async (userId: string, role: string) => {
    if (!changeRequest || !user) return;
    
    try {
      // In a real app, you would update a list of approvers
      // For now, we'll just add a message to the audit trail
      const response = await updateChangeRequest(
        changeRequest.id,
        { 
          // This is a mock implementation - in a real app, you'd have an approvers array
          audit: [...changeRequest.audit, {
            id: crypto.randomUUID(),
            entityId: changeRequest.id,
            entityType: 'change',
            message: `${role} approver added: ${userId}`,
            performedBy: user.id,
            timestamp: new Date()
          }]
        },
        user.id
      );
      
      if (response.success && response.data) {
        setChangeRequest(response.data);
        toast.success(`${role} approver added successfully`);
      } else {
        toast.error(response.message || 'Failed to add approver');
      }
    } catch (err) {
      toast.error('An error occurred while updating the change request');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !changeRequest) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Change Request Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The change request you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button 
          variant="default"
          onClick={() => navigate('/changes')}
        >
          Return to Changes
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <DetailBreadcrumb 
          entityName="Change Request"
          entityId={changeRequest.id}
          parentRoute="/changes"
          parentName="Changes"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/changes')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Changes
            </Button>
            <h1 className="text-2xl font-bold">Change Request: {changeRequest.id}</h1>
          </div>
          
          {changeRequest.status === 'draft' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        
        <ChangeRequestDetail 
          changeRequest={changeRequest} 
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
          onUpdateStatus={handleUpdateStatus}
          onAddImplementor={handleAddImplementor}
          onAddApprover={handleAddApprover}
        />
      </div>
    </PageTransition>
  );
};

export default ChangeDetail;

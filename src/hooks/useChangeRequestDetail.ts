
import { useState, useEffect } from 'react';
import { getChangeRequestById } from '@/utils/api/change/operations/getChangeRequestById';
import { updateChangeRequest } from '@/utils/api/change/operations/updateChangeRequest';
import { ChangeRequest } from '@/utils/types/change';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useChangeRequestDetail = (id: string | undefined) => {
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

  return {
    changeRequest,
    loading,
    error,
    handleApprove,
    handleUpdateStatus,
    handleAddImplementor,
    handleAddApprover,
  };
};


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import { getChangeRequestById } from '@/utils/api/change/operations/getChangeRequestById';
import { updateChangeRequest } from '@/utils/api/change/operations/updateChangeRequest';
import { ChangeRequest } from '@/utils/types/change';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';
import ChangeRequestForm from '@/components/changes/ChangeRequestForm';

const EditChangeRequest = () => {
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

  const handleSubmit = async (formData: any) => {
    if (!user || !changeRequest) return;
    
    try {
      const response = await updateChangeRequest(
        changeRequest.id,
        formData,
        user.id
      );
      
      if (response.success && response.data) {
        toast.success('Change request updated successfully');
        navigate(`/changes/${response.data.id}`);
      } else {
        toast.error(response.message || 'Failed to update change request');
      }
    } catch (err) {
      toast.error('An error occurred while updating the change request');
    }
  };

  const handleCancel = () => {
    navigate(`/changes/${id}`);
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
          The change request you're trying to edit doesn't exist or you don't have permission to view it.
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
          entityName="Edit Change Request"
          entityId={changeRequest.id}
          parentRoute="/changes"
          parentName="Changes"
        />
        
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/changes/${id}`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Change
          </Button>
          <h1 className="text-2xl font-bold">Edit Change Request: {changeRequest.id}</h1>
        </div>
        
        <ChangeRequestForm 
          initialData={changeRequest}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </PageTransition>
  );
};

export default EditChangeRequest;

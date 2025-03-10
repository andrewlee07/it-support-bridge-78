
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ChangeRequestForm from '@/components/changes/ChangeRequestForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';

const CloseChange = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: changeRequest, isLoading } = useQuery({
    queryKey: ['change', id],
    queryFn: async () => {
      const response = await changeApi.getChangeRequestById(id || '');
      return response.data;
    }
  });

  const closeChangeMutation = useMutation({
    mutationFn: async (data: { closureReason: string; closureNotes?: string }) => {
      if (!id || !user) return null;
      return await changeApi.closeChangeRequest(id, user.id, data.closureReason as any, data.closureNotes);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Change request closed successfully.",
      });
      navigate(`/changes/${id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to close change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (data: any) => {
    if (!data.closureReason) {
      toast({
        title: "Error",
        description: "Please select a closure reason",
        variant: "destructive"
      });
      return;
    }
    
    closeChangeMutation.mutate({
      closureReason: data.closureReason,
      closureNotes: data.closureNotes
    });
  };

  const handleCancel = () => {
    navigate(`/changes/${id}`);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading change request...</div>;
  }

  if (!changeRequest) {
    return <div className="p-8 text-center">Change request not found</div>;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Close Change Request</h1>
          <p className="text-muted-foreground mt-1">
            {changeRequest.id} - {changeRequest.title}
          </p>
        </div>

        <ChangeRequestForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isSubmitting={closeChangeMutation.isPending}
          initialData={changeRequest}
          isClosing={true}
        />
      </div>
    </PageTransition>
  );
};

export default CloseChange;

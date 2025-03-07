
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ChangeRequestForm from '@/components/changes/ChangeRequestForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';

const NewChangeRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const createChangeMutation = useMutation({
    mutationFn: async (data: any) => {
      // Map the changeCategory to proper category if needed
      return await changeApi.createChangeRequest({
        ...data,
        createdBy: user!.id,
      });
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        toast({
          title: "Success",
          description: "Change request created successfully.",
        });
        navigate('/changes');
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (data: any) => {
    createChangeMutation.mutate(data);
  };

  const handleCancel = () => {
    navigate('/changes');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Change Request</h1>
          <p className="text-muted-foreground mt-1">
            Create a new system or infrastructure change request
          </p>
        </div>

        <ChangeRequestForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isSubmitting={createChangeMutation.isPending}
        />
      </div>
    </PageTransition>
  );
};

export default NewChangeRequest;

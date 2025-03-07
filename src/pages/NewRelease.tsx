
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import PageTransition from '@/components/shared/PageTransition';
import ReleaseForm from '@/components/releases/ReleaseForm';
import { createRelease } from '@/utils/api/releaseApi';
import { Release } from '@/utils/types';

const NewRelease = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const createMutation = useMutation({
    mutationFn: async (data: Omit<Release, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus' | 'items' | 'audit'>) => {
      if (!user) throw new Error('User not authenticated');
      const response = await createRelease({
        ...data,
        owner: user.id,
      }, user.id);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create release');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Release Created",
        description: "Your new release has been created successfully.",
      });
      navigate(`/releases/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create release",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (data: any) => {
    createMutation.mutate(data);
  };
  
  const handleCancel = () => {
    navigate('/releases');
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Release</h1>
          <p className="text-muted-foreground">
            Define a new release package with required details
          </p>
        </div>
        
        <ReleaseForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </PageTransition>
  );
};

export default NewRelease;

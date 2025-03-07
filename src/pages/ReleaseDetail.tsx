
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageTransition from '@/components/shared/PageTransition';
import ReleaseDetail from '@/components/releases/ReleaseDetail';
import ReleaseForm from '@/components/releases/ReleaseForm';
import RejectReleaseDialog from '@/components/releases/RejectReleaseDialog';
import AddItemDialog from '@/components/releases/AddItemDialog';
import {
  getReleaseById,
  updateRelease,
  updateReleaseStatus,
  updateReleaseApproval,
  addItemToRelease,
  removeItemFromRelease
} from '@/utils/api/releaseApi';
import { Release, ReleaseStatus } from '@/utils/types';

const ReleaseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  
  // Get release data
  const { 
    data: release, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['release', id],
    queryFn: async () => {
      if (!id) throw new Error('Release ID is required');
      const response = await getReleaseById(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch release');
      }
      return response.data;
    },
    enabled: !!id
  });
  
  // Update release mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Release>) => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await updateRelease(id, data, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update release');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      setIsEditing(false);
      toast({
        title: "Release Updated",
        description: "The release has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update release",
        variant: "destructive",
      });
    }
  });
  
  // Update status mutation
  const statusMutation = useMutation({
    mutationFn: async (status: ReleaseStatus) => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await updateReleaseStatus(id, status, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update status');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      toast({
        title: "Status Updated",
        description: "The release status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Status Update Failed",
        description: error instanceof Error ? error.message : "Failed to update status",
        variant: "destructive",
      });
    }
  });
  
  // Approve release mutation
  const approveMutation = useMutation({
    mutationFn: async () => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await updateReleaseApproval(id, true, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to approve release');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      toast({
        title: "Release Approved",
        description: "The release has been approved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Approval Failed",
        description: error instanceof Error ? error.message : "Failed to approve release",
        variant: "destructive",
      });
    }
  });
  
  // Reject release mutation
  const rejectMutation = useMutation({
    mutationFn: async (reason: string) => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await updateReleaseApproval(id, false, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to reject release');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      queryClient.invalidateQueries({ queryKey: ['releases'] });
      toast({
        title: "Release Rejected",
        description: "The release has been rejected.",
      });
    },
    onError: (error) => {
      toast({
        title: "Rejection Failed",
        description: error instanceof Error ? error.message : "Failed to reject release",
        variant: "destructive",
      });
    }
  });
  
  // Add item mutation
  const addItemMutation = useMutation({
    mutationFn: async ({ itemType, itemId }: { itemType: string, itemId: string }) => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await addItemToRelease(
        id, 
        itemId, 
        itemType as 'change' | 'incident' | 'asset', 
        user.id
      );
      if (!response.success) {
        throw new Error(response.error || 'Failed to add item');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      toast({
        title: "Item Added",
        description: "The item has been added to the release.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Add Item",
        description: error instanceof Error ? error.message : "Failed to add item to release",
        variant: "destructive",
      });
    }
  });
  
  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      if (!id || !user) throw new Error('Missing required data');
      const response = await removeItemFromRelease(id, itemId, user.id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to remove item');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      toast({
        title: "Item Removed",
        description: "The item has been removed from the release.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Remove Item",
        description: error instanceof Error ? error.message : "Failed to remove item from release",
        variant: "destructive",
      });
    }
  });
  
  // Handle actions
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleUpdateSubmit = (data: any) => {
    updateMutation.mutate(data);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleApprove = () => {
    approveMutation.mutate();
  };
  
  const handleReject = () => {
    setRejectionDialogOpen(true);
  };
  
  const handleConfirmReject = (reason: string) => {
    rejectMutation.mutate(reason);
  };
  
  const handleChangeStatus = (status: string) => {
    statusMutation.mutate(status as ReleaseStatus);
  };
  
  const handleAddItem = async (itemType: string, itemId: string) => {
    await addItemMutation.mutateAsync({ itemType, itemId });
    setAddItemDialogOpen(false);
  };
  
  const handleRemoveItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };
  
  if (isError) {
    return (
      <PageTransition>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold text-destructive">Error Loading Release</h1>
          <p className="mt-2 text-muted-foreground">
            The release could not be found or there was an error loading it.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => navigate('/releases')}
          >
            Back to Releases
          </button>
        </div>
      </PageTransition>
    );
  }
  
  if (isLoading || !release) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-muted rounded mb-4" />
            <div className="h-4 w-1/4 bg-muted rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const canApprove = user?.role === 'admin' && release.approvalStatus === 'pending';
  
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        {isEditing ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Edit Release</h1>
              <p className="text-muted-foreground">
                Update the details for this release
              </p>
            </div>
            <ReleaseForm
              onSubmit={handleUpdateSubmit}
              onCancel={handleCancelEdit}
              isSubmitting={updateMutation.isPending}
              initialData={release}
              isEditing={true}
            />
          </>
        ) : (
          <ReleaseDetail
            release={release}
            onEdit={handleEdit}
            onAddItem={() => setAddItemDialogOpen(true)}
            onRemoveItem={handleRemoveItem}
            onApprove={handleApprove}
            onReject={handleReject}
            onChangeStatus={handleChangeStatus}
            isLoading={isLoading}
            canApprove={canApprove}
          />
        )}
        
        <RejectReleaseDialog
          isOpen={rejectionDialogOpen}
          onClose={() => setRejectionDialogOpen(false)}
          onConfirm={handleConfirmReject}
        />
        
        <AddItemDialog
          isOpen={addItemDialogOpen}
          onClose={() => setAddItemDialogOpen(false)}
          onAddItem={handleAddItem}
        />
      </div>
    </PageTransition>
  );
};

export default ReleaseDetailPage;

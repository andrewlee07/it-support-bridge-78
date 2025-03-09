
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReleaseById, updateReleaseStatus, updateReleaseApproval } from '@/utils/api/release';
import { assignToRelease } from '@/utils/api/backlogApi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Release } from '@/utils/types/release';

export const useReleaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddItems, setShowAddItems] = useState(false);
  const [selectedBacklogItem, setSelectedBacklogItem] = useState<BacklogItem | null>(null);
  const [editingBacklogItem, setEditingBacklogItem] = useState<BacklogItem | null>(null);

  // Get release details
  const { data: releaseResponse, isLoading } = useQuery({
    queryKey: ['release', id],
    queryFn: () => getReleaseById(id || ''),
    enabled: !!id,
  });

  const release = releaseResponse?.data;

  // Mutation to update release status
  const statusMutation = useMutation({
    mutationFn: (status: string) => updateReleaseStatus(id || '', status as any, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      toast({
        title: 'Status Updated',
        description: 'Release status has been updated successfully.',
      });
    },
  });

  // Mutation to approve or reject release
  const approvalMutation = useMutation({
    mutationFn: (approve: boolean) => updateReleaseApproval(id || '', approve, user?.id || ''),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['release', id] });
      toast({
        title: data.data?.approvalStatus === 'approved' ? 'Release Approved' : 'Release Rejected',
        description: `The release has been ${data.data?.approvalStatus}.`,
      });
    },
  });

  // Mutation to assign backlog items to this release
  const assignBacklogItemsMutation = useMutation({
    mutationFn: async (items: BacklogItem[]) => {
      return Promise.all(
        items.map(item => assignToRelease(item.id, id || ''))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlogItems', id] });
      toast({
        title: 'Items Added',
        description: 'Backlog items have been added to the release.',
      });
    },
  });

  const handleEdit = () => {
    navigate(`/releases/edit/${id}`);
  };

  const handleAddItem = () => {
    setShowAddItems(true);
  };

  const handleRemoveItem = (itemId: string) => {
    // TODO: Implement remove item functionality
  };

  const handleApprove = () => {
    approvalMutation.mutate(true);
  };

  const handleReject = () => {
    approvalMutation.mutate(false);
  };

  const handleChangeStatus = (status: string) => {
    statusMutation.mutate(status);
  };

  const handleSelectBacklogItems = async (items: BacklogItem[]) => {
    await assignBacklogItemsMutation.mutateAsync(items);
  };

  const handleViewBacklogItem = (item: BacklogItem) => {
    setSelectedBacklogItem(item);
  };

  const handleEditBacklogItem = (item: BacklogItem) => {
    setSelectedBacklogItem(null);
    setEditingBacklogItem(item);
  };

  const handleBacklogItemUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ['backlogItems', id] });
    setEditingBacklogItem(null);
    toast({
      title: 'Backlog Item Updated',
      description: 'The backlog item has been updated successfully.',
    });
  };

  // Check if user can approve
  const canApprove = user?.role === 'admin' || user?.role === 'release-manager';

  return {
    id,
    release,
    isLoading,
    showAddItems,
    setShowAddItems,
    selectedBacklogItem,
    setSelectedBacklogItem,
    editingBacklogItem,
    setEditingBacklogItem,
    statusMutation,
    approvalMutation,
    canApprove,
    handleEdit,
    handleAddItem,
    handleRemoveItem,
    handleApprove,
    handleReject,
    handleChangeStatus,
    handleSelectBacklogItems,
    handleViewBacklogItem,
    handleEditBacklogItem,
    handleBacklogItemUpdated
  };
};

export default useReleaseDetail;

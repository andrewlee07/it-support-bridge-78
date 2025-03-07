
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageTransition from '@/components/shared/PageTransition';
import ReleaseDetail from '@/components/releases/ReleaseDetail';
import { getReleaseById, updateReleaseStatus, updateReleaseApproval } from '@/utils/api/release';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BacklogItemSelectionDialog from '@/components/backlog/BacklogItemSelectionDialog';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { assignToRelease } from '@/utils/api/backlogApi';
import ReleaseDetailBacklogItems from '@/components/releases/ReleaseDetailBacklogItems';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BacklogItemDetail from '@/components/backlog/BacklogItemDetail';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';

const ReleaseDetailPage = () => {
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
  const canApprove = user?.role === 'admin';

  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-24 bg-muted rounded w-full" />
          </div>
        ) : release ? (
          <>
            <ReleaseDetail
              release={release}
              onEdit={handleEdit}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onApprove={handleApprove}
              onReject={handleReject}
              onChangeStatus={handleChangeStatus}
              isLoading={statusMutation.isPending || approvalMutation.isPending}
              canApprove={canApprove}
            />
            
            <ReleaseDetailBacklogItems 
              releaseId={id || ''} 
              onAddItems={handleAddItem}
              onViewItem={handleViewBacklogItem}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Release not found</h2>
            <p className="text-muted-foreground">
              The release you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
        
        <BacklogItemSelectionDialog
          open={showAddItems}
          onOpenChange={setShowAddItems}
          onSelectItems={handleSelectBacklogItems}
          releaseId={id || ''}
        />
        
        <Dialog 
          open={!!selectedBacklogItem} 
          onOpenChange={(open) => !open && setSelectedBacklogItem(null)}
        >
          <DialogContent className="sm:max-w-3xl">
            {selectedBacklogItem && (
              <BacklogItemDetail 
                backlogItem={selectedBacklogItem} 
                onEdit={() => handleEditBacklogItem(selectedBacklogItem)} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        <Dialog 
          open={!!editingBacklogItem} 
          onOpenChange={(open) => !open && setEditingBacklogItem(null)}
        >
          <DialogContent className="sm:max-w-3xl">
            {editingBacklogItem && (
              <BacklogItemForm
                initialData={editingBacklogItem}
                onSuccess={handleBacklogItemUpdated}
                onCancel={() => setEditingBacklogItem(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default ReleaseDetailPage;

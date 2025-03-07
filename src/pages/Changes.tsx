
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { ChangeStatus } from '@/utils/types';
import ChangesHeader from '@/components/changes/ChangesHeader';
import ChangesSearch from '@/components/changes/ChangesSearch';
import ChangesList from '@/components/changes/ChangesList';
import RejectDialog from '@/components/changes/RejectDialog';

const Changes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);

  // Query for change requests
  const { data: changesData, isLoading, isError, refetch } = useQuery({
    queryKey: ['changes', activeTab, searchQuery],
    queryFn: async () => {
      let statusFilter: ChangeStatus[] = [];
      
      switch (activeTab) {
        case 'pending':
          statusFilter = ['submitted'];
          break;
        case 'upcoming':
          statusFilter = ['approved'];
          break;
        case 'completed':
          statusFilter = ['completed'];
          break;
        default:
          // 'all' tab - no status filter
          break;
      }
      
      const response = await changeApi.getChangeRequests(1, 50, {
        status: statusFilter.length > 0 ? statusFilter : undefined,
        search: searchQuery || undefined
      });
      
      return response;
    }
  });

  // Mutation for approving change requests
  const approveMutation = useMutation({
    mutationFn: async (changeId: string) => {
      return await changeApi.approveChangeRequest(changeId, user!.id);
    },
    onSuccess: async (data) => {
      if (data.success && data.data) {
        toast({
          title: "Change request approved",
          description: "The change request has been successfully approved.",
        });
        
        // Send notification email
        if (data.data.createdBy) {
          await emailNotificationApi.sendChangeRequestEmail(
            data.data.id,
            'change-approved',
            data.data.title,
            [data.data.createdBy]
          );
        }
        
        // Refetch change requests
        queryClient.invalidateQueries({ queryKey: ['changes'] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to approve change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Mutation for rejecting change requests
  const rejectMutation = useMutation({
    mutationFn: async ({ changeId, reason }: { changeId: string; reason: string }) => {
      return await changeApi.rejectChangeRequest(changeId, user!.id, reason);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Change request rejected",
          description: "The change request has been rejected.",
        });
        
        setRejectDialogOpen(false);
        setRejectionReason('');
        
        // Refetch change requests
        queryClient.invalidateQueries({ queryKey: ['changes'] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to reject change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleApprove = (changeId: string) => {
    if (!user) return;
    approveMutation.mutate(changeId);
  };

  const handleRejectClick = (changeId: string) => {
    setSelectedChangeId(changeId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedChangeId || !rejectionReason.trim()) return;
    
    rejectMutation.mutate({
      changeId: selectedChangeId,
      reason: rejectionReason
    });
  };

  const handleCreateNewRequest = () => {
    navigate('/changes/new');
  };

  const handleViewChange = (changeId: string) => {
    navigate(`/changes/${changeId}`);
  };

  const changes = changesData?.items || [];

  return (
    <PageTransition>
      <div className="space-y-6">
        <ChangesHeader onCreateNew={handleCreateNewRequest} />
        
        <ChangesSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ChangesList
              changes={changes}
              isLoading={isLoading}
              isError={isError}
              onApprove={handleApprove}
              onReject={handleRejectClick}
              onCreateNew={handleCreateNewRequest}
              onViewChange={handleViewChange}
              refetch={refetch}
              userRole={user?.role}
              searchQuery={searchQuery}
              viewType="all"
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <ChangesList
              changes={changes}
              isLoading={isLoading}
              isError={isError}
              onApprove={handleApprove}
              onReject={handleRejectClick}
              onCreateNew={handleCreateNewRequest}
              onViewChange={handleViewChange}
              refetch={refetch}
              userRole={user?.role}
              searchQuery={searchQuery}
              viewType="pending"
            />
          </TabsContent>
          
          <TabsContent value="upcoming">
            <ChangesList
              changes={changes}
              isLoading={isLoading}
              isError={isError}
              onApprove={handleApprove}
              onReject={handleRejectClick}
              onCreateNew={handleCreateNewRequest}
              onViewChange={handleViewChange}
              refetch={refetch}
              userRole={user?.role}
              searchQuery={searchQuery}
              viewType="upcoming"
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <ChangesList
              changes={changes}
              isLoading={isLoading}
              isError={isError}
              onApprove={handleApprove}
              onReject={handleRejectClick}
              onCreateNew={handleCreateNewRequest}
              onViewChange={handleViewChange}
              refetch={refetch}
              userRole={user?.role}
              searchQuery={searchQuery}
              viewType="completed"
            />
          </TabsContent>
        </Tabs>
      </div>

      <RejectDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={handleRejectConfirm}
      />
    </PageTransition>
  );
};

export default Changes;

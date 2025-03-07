
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';
import { useToast } from '@/hooks/use-toast';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';

export const useChangeRequestMutations = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation for approving change requests
  const approveMutation = useMutation({
    mutationFn: async (changeId: string) => {
      return await changeApi.approveChangeRequest(changeId, userId);
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
      return await changeApi.rejectChangeRequest(changeId, userId, reason);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Change request rejected",
          description: "The change request has been rejected.",
        });
        
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

  return {
    approveMutation,
    rejectMutation,
  };
};

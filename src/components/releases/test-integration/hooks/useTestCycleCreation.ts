
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createTestCycleForRelease } from '@/utils/api/testReleaseApi';
import { TestCycleFormValues } from '../schemas/testCycleSchema';

interface UseTestCycleCreationProps {
  releaseId: string;
  onSuccess?: () => void;
  onClose: () => void;
}

export const useTestCycleCreation = ({ releaseId, onSuccess, onClose }: UseTestCycleCreationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: TestCycleFormValues) => {
      if (!user) throw new Error('User not authenticated');
      
      // Ensure all required properties are included
      const response = await createTestCycleForRelease(releaseId, {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'planned',
        testCases: [],
        createdBy: user.id
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create test cycle');
      }
      
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Test Cycle Created',
        description: 'The test cycle has been created successfully.'
      });
      
      // Close the dialog
      onClose();
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['testCycles', releaseId] });
      queryClient.invalidateQueries({ queryKey: ['testCoverage', releaseId] });
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create test cycle',
        variant: 'destructive'
      });
    }
  });

  return {
    createMutation,
    isPending: createMutation.isPending,
    submitTestCycle: createMutation.mutate
  };
};

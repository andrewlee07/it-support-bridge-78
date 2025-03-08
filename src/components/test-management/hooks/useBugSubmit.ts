
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth';
import { Bug } from '@/utils/types/testTypes';
import { createBug, updateBug } from '@/utils/mockData/testData';
import { BugFormValues } from '../forms/bugSchema';

interface UseBugSubmitProps {
  initialData?: Partial<Bug>;
  onSuccess?: (bug: Bug) => void;
}

export const useBugSubmit = ({ initialData, onSuccess }: UseBugSubmitProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BugFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to report bugs.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Filter out empty steps
      const filteredSteps = data.stepsToReproduce.filter(step => step.trim() !== '');
      if (filteredSteps.length === 0) {
        return {
          success: false,
          error: 'At least one step is required.',
          field: 'stepsToReproduce'
        };
      }

      data.stepsToReproduce = filteredSteps;

      // Use the appropriate type mappings for the API
      const bugData = {
        title: data.title,
        description: data.description,
        stepsToReproduce: data.stepsToReproduce,
        severity: data.severity,
        priority: data.priority as any, // Handle type incompatibility between forms and API
        status: data.status as any, // Handle type incompatibility between forms and API
        assignedTo: data.assignedDeveloper || '',
        relatedTestCase: data.relatedTestCase || '',
        attachment: data.attachment || '',
        reportedBy: user.id,
        createdBy: user.id,
      };

      let result;
      if (initialData?.id) {
        // Update existing bug
        result = await updateBug(initialData.id, bugData);
      } else {
        // Create new bug
        result = await createBug(bugData);
      }

      if (result.success) {
        toast({
          title: `Bug ${initialData?.id ? 'updated' : 'reported'} successfully`,
          description: `Bug "${data.title}" has been ${initialData?.id ? 'updated' : 'reported'}.`,
        });
        if (onSuccess) onSuccess(result.data as Bug);
        return { success: true };
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${initialData?.id ? 'update' : 'report'} bug.`,
          variant: 'destructive',
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error',
        description: `An unexpected error occurred: ${errorMessage}`,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    isEditing: !!initialData?.id
  };
};


import { useState } from 'react';
import { TestCase, TestStatus } from '@/utils/types/testTypes';
import { useToast } from '@/hooks/use-toast';
import type { Bug } from '@/utils/types/test';
import type { BacklogItem } from '@/utils/types/backlogTypes';
import { 
  createBugFromTestExecution, 
  createBacklogItemFromBug 
} from '@/utils/api/testBacklogIntegrationApi';

interface UseTestExecutionFormProps {
  testCase: TestCase;
  onExecute: (testCaseId: string, status: TestStatus, comments: string) => Promise<{ success: boolean }>;
  onLinkBug?: (testCaseId: string) => void;
  onBugCreated?: (bug: Bug, backlogItem?: BacklogItem) => void;
}

export const useTestExecutionForm = ({
  testCase,
  onExecute,
  onLinkBug,
  onBugCreated
}: UseTestExecutionFormProps) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBugDialogOpen, setIsBugDialogOpen] = useState(false);
  const [isCreatingBacklogItem, setIsCreatingBacklogItem] = useState(false);
  const { toast } = useToast();

  const handleExecute = async (status: TestStatus) => {
    setIsSubmitting(true);
    try {
      const result = await onExecute(testCase.id, status, comments);
      
      // If the test fails, offer to create a bug
      if (result.success && status === 'fail' && !isBugDialogOpen) {
        setIsBugDialogOpen(true);
      }
      
      if (result.success) {
        toast({
          title: "Test executed",
          description: `The test has been marked as ${status}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateBug = async (bugData: any) => {
    setIsSubmitting(true);
    try {
      const result = await createBugFromTestExecution(testCase.id, bugData);
      if (result.success) {
        toast({
          title: "Bug created",
          description: `Bug "${result.data.title}" has been created.`,
        });
        
        // Create backlog item if requested
        let backlogItem = undefined;
        if (isCreatingBacklogItem) {
          const backlogResult = await createBacklogItemFromBug(result.data.id);
          if (backlogResult.success) {
            backlogItem = backlogResult.data;
            toast({
              title: "Backlog item created",
              description: `Backlog item "${backlogResult.data.title}" has been created.`,
            });
          }
        }
        
        if (onBugCreated) {
          onBugCreated(result.data, backlogItem);
        }
        
        setIsBugDialogOpen(false);
        return { success: true, bug: result.data, backlogItem };
      }
      return { success: false };
    } catch (error) {
      toast({
        title: "Error creating bug",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
      setIsCreatingBacklogItem(false);
    }
  };

  const handleBugCreated = (bug: Bug, backlogItem?: BacklogItem) => {
    if (onBugCreated) {
      onBugCreated(bug, backlogItem);
    }
  };

  return {
    comments,
    setComments,
    isSubmitting,
    isBugDialogOpen,
    setIsBugDialogOpen,
    isCreatingBacklogItem,
    setIsCreatingBacklogItem,
    handleExecute,
    handleCreateBug,
    handleBugCreated,
    handleLinkBug: onLinkBug
  };
};

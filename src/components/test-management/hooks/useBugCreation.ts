
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  createBugFromTestExecution, 
  createBacklogItemFromBug 
} from '@/utils/api/testBacklogIntegrationApi';
import { TestCase, Bug } from '@/utils/types/test';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface UseBugCreationProps {
  testCase: TestCase;
  onSuccess?: (bug: Bug, backlogItem?: BacklogItem) => void;
  onClose: () => void;
}

export const useBugCreation = ({ testCase, onSuccess, onClose }: UseBugCreationProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBug = async (
    description: string,
    severity: string,
    priority: string,
    createBacklogItem: boolean
  ) => {
    if (!description) {
      toast({
        title: "Description required",
        description: "Please provide a description of the bug",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the bug
      const bugResponse = await createBugFromTestExecution(testCase.id, {
        description,
        severity,
        priority
      });
      
      if (!bugResponse.success) {
        throw new Error(bugResponse.error || "Failed to create bug");
      }
      
      const bug = bugResponse.data;
      let backlogItem;
      
      // Create backlog item if requested
      if (createBacklogItem) {
        const backlogResponse = await createBacklogItemFromBug(bug.id);
        
        if (backlogResponse.success) {
          backlogItem = backlogResponse.data;
          toast({
            title: "Bug and backlog item created",
            description: `Bug ${bug.id} and backlog item ${backlogItem.id} created successfully.`,
          });
        } else {
          toast({
            title: "Bug created, backlog item failed",
            description: backlogResponse.error || "Failed to create backlog item",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Bug created",
          description: `Bug ${bug.id} created successfully.`,
        });
      }
      
      if (onSuccess) {
        onSuccess(bug, backlogItem);
      }
      
      onClose();
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

  return {
    isSubmitting,
    submitBug
  };
};

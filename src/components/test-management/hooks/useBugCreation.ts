
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  createBugFromTestExecution, 
  createBacklogItemFromBug 
} from '@/utils/api/testBacklogIntegrationApi';
import { TestCase, Bug } from '@/utils/types/test';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { BugCreationFormValues } from '../schemas/bugCreationSchema';

interface UseBugCreationProps {
  testCase: TestCase;
  onSuccess?: (bug: Bug, backlogItem?: BacklogItem) => void;
  onClose: () => void;
}

export const useBugCreation = ({ testCase, onSuccess, onClose }: UseBugCreationProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBug = async (values: BugCreationFormValues) => {
    const { description, severity, priority, createBacklogItem } = values;
    
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
      // Fix the API calls with proper implementation
      // Mocked success response until API is fully implemented
      const bugResponse = {
        success: true,
        data: {
          id: `bug-${Date.now()}`,
          title: `Bug for ${testCase.title}`,
          description,
          severity,
          priority,
          status: 'new',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'current-user'
        } as Bug
      };
      
      if (!bugResponse.success) {
        throw new Error(bugResponse.error || "Failed to create bug");
      }
      
      const bug = bugResponse.data;
      let backlogItem;
      
      // Create backlog item if requested
      if (createBacklogItem) {
        // Mocked success response until API is fully implemented
        const backlogResponse = {
          success: true,
          data: {
            id: `backlog-${Date.now()}`,
            title: `Fix: ${description.substring(0, 50)}`,
            description,
            priority,
            type: 'bug',
            status: 'open',
            labels: ['bug'],
            creator: 'current-user',
            createdAt: new Date(),
            updatedAt: new Date()
          } as BacklogItem
        };
        
        if (backlogResponse.success) {
          backlogItem = backlogResponse.data;
          toast({
            title: "Bug and backlog item created",
            description: `Bug ${bug.id} and backlog item ${backlogItem.id} created successfully.`,
          });
        } else {
          toast({
            title: "Bug created, backlog item failed",
            description: "Failed to create backlog item",
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


import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TestCase } from '@/utils/types/test/testCase';
import { TestStatus } from '@/utils/types/testTypes';
import { Bug } from '@/utils/types/test/bug';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface UseTestExecutionFormProps {
  testCase: TestCase;
  onExecute: (testCaseId: string, status: TestStatus, comments: string) => void;
}

export const useTestExecutionForm = ({ testCase, onExecute }: UseTestExecutionFormProps) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBugDialog, setShowBugDialog] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const { toast } = useToast();

  const handleExecute = async (status: TestStatus) => {
    setIsSubmitting(true);
    try {
      await onExecute(testCase.id, status, comments);
      
      toast({
        title: 'Test executed',
        description: `Test case ${testCase.title} has been marked as ${status}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to execute test case.',
        variant: 'destructive',
      });
      console.error('Test execution error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateBug = () => {
    setSelectedTestCase(testCase);
    setShowBugDialog(true);
  };

  const handleBugSuccess = (bug: Bug, backlogItem?: BacklogItem) => {
    toast({
      title: 'Bug created',
      description: backlogItem 
        ? `Bug and backlog item created successfully.` 
        : `Bug created successfully.`,
    });
    
    setShowBugDialog(false);
  };

  return {
    comments,
    setComments,
    isSubmitting,
    selectedTestCase,
    showBugDialog,
    setShowBugDialog,
    handleExecute,
    handleCreateBug,
    handleBugSuccess,
  };
};

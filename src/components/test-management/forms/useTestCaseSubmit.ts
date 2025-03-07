
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { TestCase } from '@/utils/types/testTypes';
import { createTestCase, updateTestCase } from '@/utils/mockData/testData';
import { TestCaseFormValues } from './testCaseSchema';

interface UseTestCaseSubmitProps {
  initialData?: Partial<TestCase>;
  onSuccess?: (testCase: TestCase) => void;
}

export const useTestCaseSubmit = ({ initialData, onSuccess }: UseTestCaseSubmitProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: TestCaseFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to create or update test cases.',
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
          error: 'At least one non-empty step is required.',
          field: 'stepsToReproduce'
        };
      }

      // Map status values to be compatible with TestCaseStatus
      let apiStatus = data.status;
      if (data.status === 'not-run') apiStatus = 'draft';
      if (data.status === 'pass') apiStatus = 'passed';
      if (data.status === 'fail') apiStatus = 'failed';

      // Convert to the format expected by the testData API
      const testCaseData = {
        title: data.title,
        description: data.description,
        status: apiStatus,
        preConditions: "",
        steps: filteredSteps,
        expectedResult: data.expectedResults,
        priority: "medium",
        type: "e2e",
        createdBy: user.id,
        assignedTo: data.assignedTester,
      };

      let result;
      if (initialData?.id) {
        // Update existing test case
        result = await updateTestCase(initialData.id, testCaseData);
      } else {
        // Create new test case
        result = await createTestCase(testCaseData);
      }

      if (result.success) {
        toast({
          title: `Test case ${initialData?.id ? 'updated' : 'created'} successfully`,
          description: `Test case "${data.title}" has been ${initialData?.id ? 'updated' : 'created'}.`,
        });
        if (onSuccess) {
          // Convert the API response format to TestCase format before passing to onSuccess
          const testCase: TestCase = {
            id: result.data.id,
            title: result.data.title,
            description: result.data.description,
            stepsToReproduce: result.data.steps || [],
            expectedResults: result.data.expectedResult || '',
            status: result.data.status === 'passed' ? 'pass' : 
                    result.data.status === 'failed' ? 'fail' : 
                    result.data.status === 'draft' ? 'not-run' : result.data.status,
            assignedTester: result.data.assignedTo || result.data.createdBy,
            relatedRequirement: '',
            createdAt: result.data.createdAt,
            updatedAt: result.data.updatedAt,
          };
          onSuccess(testCase);
        }
        return { success: true };
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${initialData?.id ? 'update' : 'create'} test case.`,
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

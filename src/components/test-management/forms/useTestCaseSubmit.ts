
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { TestCase, mapTestStatus } from '@/utils/types/testTypes';
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

      // Make sure the status is compatible with the backend
      // Convert from TestCaseFormValues status to a compatible status string
      const mappedStatus = mapTestStatus(data.status);

      // Create the test case data with both new and legacy fields for compatibility
      const testCaseData: Partial<TestCase> = {
        title: data.title,
        description: data.description,
        status: mappedStatus,
        stepsToReproduce: filteredSteps,
        expectedResults: data.expectedResults,
        // Legacy fields for backwards compatibility
        steps: filteredSteps,
        expectedResult: data.expectedResults,
        preConditions: "",
        priority: "medium",
        type: "e2e",
        createdBy: user.id,
        assignedTester: data.assignedTester,
      };

      let result;
      if (initialData?.id) {
        // Update existing test case
        result = await updateTestCase(initialData.id, testCaseData);
      } else {
        // Create new test case
        result = await createTestCase(testCaseData as Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>);
      }

      if (result.success) {
        toast({
          title: `Test case ${initialData?.id ? 'updated' : 'created'} successfully`,
          description: `Test case "${data.title}" has been ${initialData?.id ? 'updated' : 'created'}.`,
        });
        if (onSuccess) onSuccess(result.data as TestCase);
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

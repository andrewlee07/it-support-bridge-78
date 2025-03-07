
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { fetchTestCases, executeTest } from '@/utils/mockData/testData';
import { TestCase, TestStatus } from '@/utils/types/testTypes';
import { useAuth } from '@/contexts/AuthContext';

export const useTestExecution = (testCycleId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
  const [isExecutingTest, setIsExecutingTest] = useState(false);

  // Fetch test cases that can be executed
  const { data: testCasesData, isLoading: isLoadingTestCases, refetch: refetchTestCases } = useQuery({
    queryKey: ['testCases', testCycleId],
    queryFn: fetchTestCases,
  });

  // Handle test case selection
  const toggleTestCaseSelection = (testCaseId: string) => {
    setSelectedTestCases(prev => 
      prev.includes(testCaseId) 
        ? prev.filter(id => id !== testCaseId) 
        : [...prev, testCaseId]
    );
  };

  // Select all test cases
  const selectAllTestCases = () => {
    if (testCasesData?.data) {
      setSelectedTestCases(testCasesData.data.map(tc => tc.id));
    }
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedTestCases([]);
  };

  // Execute a test case
  const executeTestCase = async (testCaseId: string, status: TestStatus, comments: string = '') => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be logged in to execute test cases.',
        variant: 'destructive',
      });
      return { success: false };
    }

    setIsExecutingTest(true);
    try {
      // Convert status to match what executeTest expects
      let execStatus: 'passed' | 'failed' | 'blocked' = 'blocked';
      if (status === 'pass' || status === 'passed') {
        execStatus = 'passed';
      } else if (status === 'fail' || status === 'failed') {
        execStatus = 'failed';
      }

      // Call the executeTest function with the required parameters
      const result = await executeTest(
        testCaseId, 
        testCycleId || 'default-cycle', 
        execStatus, 
        comments
      );
      
      if (result.success) {
        toast({
          title: 'Test executed successfully',
          description: `Test case has been marked as ${status}.`,
        });
        // Refresh test cases to get updated status
        refetchTestCases();
        return { success: true, data: result.data };
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to execute test case.',
          variant: 'destructive',
        });
        return { success: false };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error',
        description: `An unexpected error occurred: ${errorMessage}`,
        variant: 'destructive',
      });
      return { success: false };
    } finally {
      setIsExecutingTest(false);
    }
  };

  // We need to convert the TestCase from testData to match our TestCase type
  const convertTestCases = (testCases: any[]): TestCase[] => {
    return testCases.map(tc => ({
      id: tc.id,
      title: tc.title,
      description: tc.description,
      stepsToReproduce: tc.steps || [],
      expectedResults: tc.expectedResult || '',
      status: tc.status === 'passed' ? 'pass' : 
              tc.status === 'failed' ? 'fail' : tc.status,
      assignedTester: tc.createdBy || tc.assignedTester,
      relatedRequirement: tc.relatedRequirement || '',
      createdAt: tc.createdAt,
      updatedAt: tc.updatedAt
    }));
  };

  return {
    testCasesData: testCasesData?.data ? convertTestCases(testCasesData.data) : [],
    isLoadingTestCases,
    selectedTestCases,
    isExecutingTest,
    toggleTestCaseSelection,
    selectAllTestCases,
    clearSelections,
    executeTestCase,
    refetchTestCases
  };
};

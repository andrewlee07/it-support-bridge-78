
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { TestCase } from '@/utils/types/testTypes';
import { fetchTestCases, deleteTestCase } from '@/utils/mockData/testData';

export const useTestCaseManagement = () => {
  const { toast } = useToast();
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch test cases
  const { 
    data: testCasesResponse, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  // View test case details
  const viewTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsViewDialogOpen(true);
  };

  // Edit test case
  const editTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsEditDialogOpen(true);
  };

  // Handle delete test case
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteTestCase(id);
      if (result.success) {
        toast({
          title: 'Test case deleted',
          description: 'The test case has been deleted successfully.',
        });
        refetch();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete test case.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  // Handle successful edit
  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    refetch();
  };

  return {
    testCasesResponse,
    isLoading,
    isError,
    refetch,
    selectedTestCase,
    isViewDialogOpen,
    setIsViewDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    viewTestCase,
    editTestCase,
    handleDelete,
    handleEditSuccess,
  };
};

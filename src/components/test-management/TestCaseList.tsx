
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import TestCaseForm from './TestCaseForm';
import TestCaseDetails from './TestCaseDetails';
import TestCaseTable from './TestCaseTable';
import { useTestCaseManagement } from './hooks/useTestCaseManagement';
import { useTestCases } from './hooks/useTestCases';
import { TestCase } from '@/utils/types/test/testCase';

const TestCaseList: React.FC = () => {
  const { testCasesData, isLoadingTestCases, isError, refetch } = useTestCases();
  
  const {
    selectedTestCase,
    isViewDialogOpen,
    setIsViewDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    viewTestCase,
    editTestCase,
    handleDelete,
    handleEditSuccess,
  } = useTestCaseManagement();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-red-500 mb-4">Failed to load test cases</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  // Convert the testCasesData to compatible TestCase type
  const compatibleTestCases = testCasesData ? testCasesData.map(tc => ({
    ...tc,
    stepsToReproduce: tc.steps || [],
    expectedResults: tc.expectedResult || '',
    assignedTester: tc.createdBy,
  } as unknown as TestCase)) : [];

  return (
    <div className="w-full">
      <TestCaseTable 
        testCases={compatibleTestCases}
        onView={viewTestCase}
        onEdit={editTestCase}
        onDelete={handleDelete}
      />

      {/* View Test Case Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTestCase && (
            <TestCaseDetails testCase={selectedTestCase as TestCase} />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Test Case Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTestCase && (
            <TestCaseForm 
              initialData={selectedTestCase as TestCase} 
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestCaseList;

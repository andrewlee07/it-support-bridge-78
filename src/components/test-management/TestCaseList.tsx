
import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import TestCaseForm from './TestCaseForm';
import TestCaseDetails from './TestCaseDetails';
import TestCaseTable from './TestCaseTable';
import { useTestCaseManagement } from './hooks/useTestCaseManagement';
import { useTestCases } from './hooks/useTestCases';

const TestCaseList: React.FC = () => {
  const { testCasesData, isError, refetch } = useTestCases();
  
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

  return (
    <div className="w-full">
      <TestCaseTable 
        testCases={testCasesData?.data}
        onView={viewTestCase}
        onEdit={editTestCase}
        onDelete={handleDelete}
      />

      {/* View Test Case Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTestCase && (
            <TestCaseDetails testCase={selectedTestCase} />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Test Case Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTestCase && (
            <TestCaseForm 
              initialData={selectedTestCase} 
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

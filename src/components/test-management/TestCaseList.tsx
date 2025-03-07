
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const TestCaseList: React.FC = () => {
  const {
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
  } = useTestCaseManagement();

  if (isError) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-red-500 mb-4">Failed to load test cases</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Cases</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-full rounded" />
              </div>
            ))}
          </div>
        ) : (
          <TestCaseTable 
            testCases={testCasesResponse?.data}
            onView={viewTestCase}
            onEdit={editTestCase}
            onDelete={handleDelete}
          />
        )}

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
      </CardContent>
    </Card>
  );
};

export default TestCaseList;

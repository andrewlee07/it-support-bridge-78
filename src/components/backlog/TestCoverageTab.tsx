
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, RefreshCw } from 'lucide-react';
import { TestCase } from '@/utils/types/test';
import TestCoverageIndicator from './TestCoverageIndicator';
import LinkTestCaseDialog from './LinkTestCaseDialog';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';
import { useBacklogTestCoverage } from '@/hooks/useBacklogTestCoverage';
import { Skeleton } from '@/components/ui/skeleton';

export interface TestCoverageTabProps {
  backlogItemId: string;
  onViewTestCase: (testCase: TestCase) => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItemId,
  onViewTestCase 
}) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  
  // Use our custom hook to fetch all test coverage related data
  const {
    linkedTestCases,
    coverage,
    isLoading,
    refetchAll
  } = useBacklogTestCoverage(backlogItemId);

  // Function to open the link test case dialog
  const openLinkDialog = () => {
    setIsLinkDialogOpen(true);
  };
  
  // Function to close the link test case dialog
  const closeLinkDialog = () => {
    setIsLinkDialogOpen(false);
    // Refresh data after dialog is closed
    refetchAll();
  };

  // Display loading state when data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32 col-span-2" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Test Coverage</h3>
        <div className="space-x-2">
          <Button onClick={refetchAll} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={openLinkDialog} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Link Test Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center justify-center mt-2">
              {coverage ? (
                <TestCoverageIndicator
                  coverage={{
                    total: coverage.totalTestCases,
                    covered: coverage.passedTests + coverage.failedTests,
                    passed: coverage.passedTests,
                    failed: coverage.failedTests
                  }}
                  size="lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>No coverage data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Test Execution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {coverage ? (
              <>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Tests Executed: {coverage.passedTests + coverage.failedTests}</span>
                    <span>{coverage.coveragePercentage}% Coverage</span>
                  </div>
                  <Progress value={coverage.coveragePercentage} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{coverage.totalTestCases}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Passed</p>
                    <p className="text-2xl font-bold text-green-600">{coverage.passedTests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{coverage.failedTests}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center py-6">
                <p className="text-muted-foreground">No test execution data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Linked test cases section */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Linked Test Cases ({linkedTestCases.length})</h4>

        {linkedTestCases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No test cases linked to this backlog item</p>
              <Button onClick={openLinkDialog} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Link Test Case
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {linkedTestCases.map((testCase) => (
                  <tr key={testCase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testCase.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${testCase.status === 'passed' ? 'bg-green-100 text-green-800' : 
                          testCase.status === 'failed' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {testCase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button onClick={() => onViewTestCase(testCase)} variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Link Test Case dialog */}
      <LinkTestCaseDialog
        backlogItemId={backlogItemId}
        isOpen={isLinkDialogOpen}
        onClose={closeLinkDialog}
      />
    </div>
  );
};

export default TestCoverageTab;

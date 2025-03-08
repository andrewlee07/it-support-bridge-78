
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { History, Bug } from 'lucide-react';
import { TestExecution } from '@/utils/types/test/testExecution';
import { TestStatus } from '@/utils/types/test/testStatus';
import StatusBadge from '../ui/StatusBadge';
import { Bug as BugType } from '@/utils/types/test/bug';

// Mock function to get test executions for a test case
const getTestExecutions = async (testCaseId: string): Promise<TestExecution[]> => {
  // This would be replaced with an actual API call
  console.log(`Fetching executions for test case ${testCaseId}`);
  
  // Mock data
  return [
    {
      id: '1',
      testCaseId,
      status: 'pass',
      executedBy: 'John Doe',
      executedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      comments: 'All steps passed successfully',
      environment: 'Production',
      duration: 120, // seconds
    },
    {
      id: '2',
      testCaseId,
      status: 'fail',
      executedBy: 'Jane Smith',
      executedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      comments: 'Step 3 failed, could not complete the operation',
      environment: 'Staging',
      duration: 95, // seconds
      bugId: 'bug-123'
    }
  ];
};

// Mock function to get a bug by ID
const getBugById = async (bugId: string): Promise<BugType | null> => {
  // This would be replaced with an actual API call
  console.log(`Fetching bug ${bugId}`);
  
  // Mock data
  return {
    id: bugId,
    title: 'Cannot complete operation in step 3',
    description: 'When attempting to submit the form, an error is displayed',
    status: 'open',
    severity: 'medium',
    priority: 'high',
    stepsToReproduce: [
      'Go to the form page',
      'Fill in all required fields',
      'Click submit'
    ],
    expectedResults: 'Form should be submitted successfully',
    actualResults: 'Error is displayed: "Operation failed"',
    assignedTo: 'dev-user',
    createdBy: 'Jane Smith',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  };
};

export interface TestExecutionHistoryProps {
  testCaseId: string;
}

const TestExecutionHistory: React.FC<TestExecutionHistoryProps> = ({ testCaseId }) => {
  // Fetch test execution history
  const { data: executions, isLoading } = useQuery({
    queryKey: ['testExecutions', testCaseId],
    queryFn: () => getTestExecutions(testCaseId),
    enabled: !!testCaseId
  });
  
  // Get bug details for any executions with bugs
  const bugsToFetch = executions?.filter(exec => exec.bugId) || [];
  
  const getBugDetails = async (bugId: string) => {
    if (!bugId) return null;
    return getBugById(bugId);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          Execution History
        </CardTitle>
        <CardDescription>
          Past test executions and results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse p-4 rounded-lg border">Loading execution history...</div>
        ) : !executions || executions.length === 0 ? (
          <div className="text-center p-4 border rounded-lg text-muted-foreground">
            No execution history available for this test case
          </div>
        ) : (
          <div className="space-y-4">
            {executions.map((execution) => (
              <div key={execution.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={execution.status as TestStatus} size="sm" />
                      <span className="text-muted-foreground text-sm">
                        {format(new Date(execution.executedAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      Executed by: {execution.executedBy}
                    </div>
                  </div>
                  {execution.bugId && (
                    <div className="flex items-center text-sm text-red-500">
                      <Bug className="h-4 w-4 mr-1" />
                      Bug reported
                    </div>
                  )}
                </div>
                
                {execution.comments && (
                  <div className="mt-2 text-sm border-t pt-2">
                    <div className="font-medium mb-1">Comments:</div>
                    <div className="text-muted-foreground">{execution.comments}</div>
                  </div>
                )}
                
                <div className="mt-2 flex text-xs text-muted-foreground">
                  <div className="mr-4">Environment: {execution.environment}</div>
                  <div>Duration: {execution.duration} seconds</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestExecutionHistory;

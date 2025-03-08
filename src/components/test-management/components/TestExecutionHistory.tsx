import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { TestExecution } from '@/utils/types/test/testExecution';
import { Bug } from '@/utils/types/test/bug';
import { TestStatus } from '@/utils/types/test/testStatus';

interface TestExecutionHistoryProps {
  testCaseId: string;
}

// Mock data for demonstration purposes
const mockTestExecutions: TestExecution[] = [
  {
    id: 'exec-1',
    testCaseId: 'test-1',
    testCycleId: 'cycle-1',
    status: 'pass',
    comments: 'Test passed successfully',
    executedBy: 'user-1',
    executionDate: new Date(2023, 5, 15),
    linkedBugs: []
  },
  {
    id: 'exec-2',
    testCaseId: 'test-1',
    testCycleId: 'cycle-2',
    status: 'fail',
    comments: 'Test failed due to login issue',
    executedBy: 'user-2',
    executionDate: new Date(2023, 6, 20),
    linkedBugs: ['bug-1']
  }
];

// Mock bug data
const mockBugs: Bug[] = [
  {
    id: 'bug-1',
    title: 'Login failure',
    description: 'Users unable to login with correct credentials',
    stepsToReproduce: ['Navigate to login page', 'Enter credentials', 'Click login button'],
    severity: 'critical',
    priority: 'high',
    status: 'open',
    createdAt: new Date(2023, 6, 20),
    updatedAt: new Date(2023, 6, 21),
    createdBy: 'user-2'
  }
];

const getStatusBadgeVariant = (status: TestStatus) => {
  switch (status) {
    case 'pass':
    case 'passed':
      return 'default';
    case 'fail':
    case 'failed':
      return 'destructive';
    case 'blocked':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const TestExecutionHistory: React.FC<TestExecutionHistoryProps> = ({ testCaseId }) => {
  const executions = mockTestExecutions.filter(exec => exec.testCaseId === testCaseId);
  
  if (executions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Execution History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No execution history available for this test case.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {executions.map((execution) => {
          const linkedBugs = execution.linkedBugs?.map(bugId => 
            mockBugs.find(bug => bug.id === bugId)
          ).filter(Boolean) as Bug[];
          
          return (
            <div key={execution.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getStatusBadgeVariant(execution.status)}>
                      {execution.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {execution.executionDate ? formatDistanceToNow(new Date(execution.executionDate), { addSuffix: true }) : 'Unknown date'}
                    </span>
                  </div>
                  <p className="text-sm">{execution.comments}</p>
                </div>
                <div className="text-sm text-right">
                  <p>Executed by: User {execution.executedBy}</p>
                  <p>Cycle: {execution.testCycleId}</p>
                </div>
              </div>
              
              {linkedBugs.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Linked Bugs:</h4>
                    {linkedBugs.map(bug => (
                      <div key={bug.id} className="bg-muted p-2 rounded-sm mb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{bug.title}</span>
                          <Badge>{bug.status}</Badge>
                        </div>
                        <p className="text-sm mt-1">{bug.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TestExecutionHistory;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TestExecution } from '@/utils/types/test/testExecution';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { CircleAlert, CircleCheck, CircleSlash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestExecutionHistoryProps {
  testCaseId: string;
}

const TestExecutionHistory: React.FC<TestExecutionHistoryProps> = ({ testCaseId }) => {
  // Fetch test execution history
  const { data: executions, isLoading } = useQuery({
    queryKey: ['testExecutions', testCaseId],
    queryFn: async () => {
      // In a real app, fetch from API
      // For now, returning mock data
      const { testExecutions } = await import('@/utils/mockData/testData');
      return testExecutions.filter(execution => execution.testCaseId === testCaseId);
    },
  });

  // Render status badge with icon
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
      case 'passed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CircleCheck className="h-3 w-3 mr-1" /> Passed
          </Badge>
        );
      case 'fail':
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <CircleAlert className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <CircleSlash className="h-3 w-3 mr-1" /> Blocked
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading execution history...</div>;
  }

  if (!executions || executions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground mb-4">No execution history found for this test case.</p>
        <Button variant="outline">Run Test Now</Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Execution History</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Executed By</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Linked Bugs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {executions.map((execution: TestExecution) => (
              <TableRow key={execution.id}>
                <TableCell>
                  {formatDistanceToNow(
                    new Date(execution.executionDate || execution.executedAt || Date.now()),
                    { addSuffix: true }
                  )}
                </TableCell>
                <TableCell>{renderStatusBadge(execution.status)}</TableCell>
                <TableCell>{execution.executedBy}</TableCell>
                <TableCell>{execution.comments || execution.notes || '-'}</TableCell>
                <TableCell>
                  {execution.linkedBugs && execution.linkedBugs.length > 0 ? (
                    <div className="flex gap-1">
                      {execution.linkedBugs.map(bugId => (
                        <Badge key={bugId} variant="outline" className="bg-red-50">
                          <Bug className="h-3 w-3 mr-1" />
                          {bugId.substring(0, 8)}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TestExecutionHistory;

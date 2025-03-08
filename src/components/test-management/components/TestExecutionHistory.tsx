
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/test-management/ui/StatusBadge';
import { Link } from 'react-router-dom';
import { AlertTriangle, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestExecution } from '@/utils/types/test/testExecution';
import { Bug } from '@/utils/types/test/bug';

interface TestExecutionHistoryProps {
  executions: TestExecution[];
  linkedBugs?: Bug[];
}

const TestExecutionHistory: React.FC<TestExecutionHistoryProps> = ({ executions, linkedBugs = [] }) => {
  // Sort executions by date descending
  const sortedExecutions = [...executions].sort((a, b) => {
    const dateA = a.executionDate || a.executedAt || new Date();
    const dateB = b.executionDate || b.executedAt || new Date();
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  if (sortedExecutions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Execution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No execution history</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This test case has not been executed yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get linked bugs for an execution
  const getBugsForExecution = (execution: TestExecution) => {
    if (!execution.linkedBugs || execution.linkedBugs.length === 0) {
      return [];
    }
    
    return linkedBugs.filter(bug => execution.linkedBugs?.includes(bug.id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Execution History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cycle</TableHead>
              <TableHead>Executed By</TableHead>
              <TableHead>Linked Bugs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExecutions.map((execution) => {
              const executionDate = execution.executionDate || execution.executedAt;
              const bugs = getBugsForExecution(execution);
              
              return (
                <TableRow key={execution.id}>
                  <TableCell>
                    {executionDate ? format(new Date(executionDate), 'MMM d, yyyy, h:mm a') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={execution.status} size="xs" />
                  </TableCell>
                  <TableCell>
                    {execution.testCycleId ? (
                      <Link to={`/test-cycles/${execution.testCycleId}`} className="text-sm text-blue-600 hover:underline">
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {execution.testCycleId.substring(0, 8)}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Ad-hoc</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{execution.executedBy}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {bugs.length > 0 ? (
                        bugs.map(bug => (
                          <Button
                            key={bug.id}
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 py-0 text-xs bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            asChild
                          >
                            <Link to={`/bugs/${bug.id}`}>{bug.title.substring(0, 20)}{bug.title.length > 20 ? '...' : ''}</Link>
                          </Button>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">No bugs linked</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TestExecutionHistory;

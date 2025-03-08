
import React from 'react';
import { TestCase } from '@/utils/types/test/testCase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, List, Bug } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import { useTestExecution } from '../hooks/useTestExecution';
import StatusBadge from '../ui/StatusBadge';

interface TestExecutionDetailsProps {
  testCase: TestCase;
}

const TestExecutionDetails: React.FC<TestExecutionDetailsProps> = ({ testCase }) => {
  const { executeTestCase } = useTestExecution();
  
  // Mock execution history - in a real app, this would be fetched from the API
  const executionHistory = [
    {
      id: `exec-${testCase.id}-1`,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      status: 'pass',
      executedBy: 'John Smith',
      comments: 'Test passed successfully.'
    },
    {
      id: `exec-${testCase.id}-2`,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      status: 'fail',
      executedBy: 'Jane Doe',
      comments: 'Failed during step 3. Screenshot attached.'
    }
  ];
  
  // Fetch bugs related to this test case
  const { data: bugsResponse } = useQuery({
    queryKey: ['bugs', testCase.id],
    queryFn: fetchBugs,
  });
  
  const linkedBugs = bugsResponse?.data?.filter(
    (bug) => bug.relatedTestCase === testCase.id
  ) || [];
  
  // Handle re-run test
  const handleReRunTest = async (status: 'pass' | 'fail' | 'blocked') => {
    await executeTestCase(testCase.id, status, 'Re-run from test coverage view');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Execution Details</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleReRunTest('pass')}>
            <Play className="h-4 w-4 mr-2 text-green-600" />
            Pass
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleReRunTest('fail')}>
            <Play className="h-4 w-4 mr-2 text-red-600" />
            Fail
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleReRunTest('blocked')}>
            <Play className="h-4 w-4 mr-2 text-yellow-600" />
            Block
          </Button>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Current Status</h4>
        <div className="flex items-center gap-2">
          <StatusBadge status={testCase.status} />
          {testCase.lastExecutionDate && (
            <span className="text-sm text-muted-foreground">
              Last executed: {new Date(testCase.lastExecutionDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-2">Execution History</h4>
        {executionHistory.length > 0 ? (
          <div className="space-y-2">
            {executionHistory.map((execution) => (
              <Card key={execution.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={execution.status as any} />
                        <span className="text-sm font-medium">
                          {execution.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {execution.comments}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      by {execution.executedBy}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <List className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No execution history available</p>
          </div>
        )}
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-2">Linked Bugs</h4>
        {linkedBugs.length > 0 ? (
          <div className="space-y-2">
            {linkedBugs.map((bug) => (
              <Card key={bug.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{bug.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                          {bug.severity} severity
                        </Badge>
                        <Badge variant="outline">{bug.status}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <Bug className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No bugs linked to this test case</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestExecutionDetails;

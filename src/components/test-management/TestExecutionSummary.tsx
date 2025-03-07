
import React from 'react';
import { TestCase } from '@/utils/types/testTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw } from 'lucide-react';

interface TestExecutionSummaryProps {
  testCases: TestCase[];
  onRefresh: () => void;
  onExport: () => void;
}

const TestExecutionSummary: React.FC<TestExecutionSummaryProps> = ({
  testCases,
  onRefresh,
  onExport
}) => {
  // Calculate statistics
  const totalTests = testCases.length;
  const passedTests = testCases.filter(tc => tc.status === 'pass').length;
  const failedTests = testCases.filter(tc => tc.status === 'fail').length;
  const blockedTests = testCases.filter(tc => tc.status === 'blocked').length;
  const notRunTests = testCases.filter(tc => tc.status === 'not-run').length;

  // Calculate progress
  const completionPercentage = totalTests > 0 
    ? Math.round(((totalTests - notRunTests) / totalTests) * 100) 
    : 0;

  // Prepare status counts for display
  const statusCounts = [
    { name: 'Passed', count: passedTests, color: 'bg-green-100 text-green-800' },
    { name: 'Failed', count: failedTests, color: 'bg-red-100 text-red-800' },
    { name: 'Blocked', count: blockedTests, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Not Run', count: notRunTests, color: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Execution Summary</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion: {completionPercentage}%</span>
            <span>
              {totalTests - notRunTests} of {totalTests} executed
            </span>
          </div>
          <Progress value={completionPercentage} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statusCounts.map((status) => (
            <div key={status.name} className={`rounded-md p-3 ${status.color}`}>
              <div className="text-xl font-bold">{status.count}</div>
              <div className="text-sm">{status.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestExecutionSummary;

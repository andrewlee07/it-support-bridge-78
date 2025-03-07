
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TestExecutionForRelease } from '@/utils/types/testTypes';
import { Calendar } from 'lucide-react';

interface ReleaseTestProgressProps {
  progressData: TestExecutionForRelease[];
}

const ReleaseTestProgress: React.FC<ReleaseTestProgressProps> = ({ progressData }) => {
  if (progressData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Execution Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mb-2 opacity-50" />
            <p>No test cycles found for this release.</p>
            <p className="text-sm">Create a test cycle to track execution progress.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Execution Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {progressData.map((progress, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Test Cycle {index + 1}</span>
                <span className="text-sm text-muted-foreground">
                  {progress.totalExecuted} of {progress.passed + progress.failed + progress.blocked + (progress.totalExecuted > 0 ? 0 : 1)} tests executed
                </span>
              </div>
              <Progress value={progress.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span className="text-green-600">Passed: {progress.passed}</span>
                <span className="text-red-600">Failed: {progress.failed}</span>
                <span>Blocked: {progress.blocked}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseTestProgress;

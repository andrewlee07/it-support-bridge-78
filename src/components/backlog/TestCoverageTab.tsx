
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Link, Plus } from 'lucide-react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { getBacklogItemCoverage, getLinkedTestCases } from '@/utils/api/testBacklogIntegrationApi';
import { TestCase } from '@/utils/types/test/testCase';
import StatusBadge from '../test-management/ui/StatusBadge';

interface TestCoverageTabProps {
  backlogItem: BacklogItem;
  onLinkTestCase: () => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ backlogItem, onLinkTestCase }) => {
  // Get coverage metrics
  const { data: coverage, isLoading: isCoverageLoading } = useQuery({
    queryKey: ['backlogCoverage', backlogItem.id],
    queryFn: () => getBacklogItemCoverage(backlogItem.id),
  });

  // Get linked test cases
  const { data: testCasesResponse, isLoading: isTestCasesLoading } = useQuery({
    queryKey: ['linkedTestCases', backlogItem.id],
    queryFn: () => getLinkedTestCases(backlogItem.id),
  });

  const testCases = testCasesResponse?.data || [];
  const coverageData = coverage?.data;

  const isLoading = isCoverageLoading || isTestCasesLoading;

  const renderTestCaseStatus = (status: string) => {
    switch(status) {
      case 'pass':
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <span className="h-4 w-4 rounded-full bg-gray-200" />;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading test coverage...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Test Coverage</h2>
        <Button variant="outline" onClick={onLinkTestCase}>
          <Plus className="h-4 w-4 mr-2" />
          Link Test Case
        </Button>
      </div>

      {coverageData && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Coverage Metrics</CardTitle>
            <CardDescription>
              Quality metrics for this backlog item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Coverage: {coverageData.coveragePercentage}%</span>
                  <span>{coverageData.passedTests} passed of {coverageData.totalTestCases} total</span>
                </div>
                <Progress value={coverageData.coveragePercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 bg-green-50 p-2 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">Passed</div>
                    <div className="text-xl font-bold">{coverageData.passedTests}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="text-sm font-medium">Failed</div>
                    <div className="text-xl font-bold">{coverageData.failedTests}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">Not Run</div>
                    <div className="text-xl font-bold">{coverageData.notExecutedTests}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Linked Test Cases</h3>
        
        {testCases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Link className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No test cases linked</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                Link test cases to this backlog item to track coverage and test execution status.
              </p>
              <Button variant="outline" onClick={onLinkTestCase}>
                <Plus className="h-4 w-4 mr-2" />
                Link Test Case
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {testCases.map((testCase: TestCase) => (
              <Card key={testCase.id} className="overflow-hidden">
                <div className="flex border-l-4 border-blue-500">
                  <div className="p-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{testCase.title}</h4>
                      <StatusBadge status={testCase.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {testCase.description}
                    </p>
                    {testCase.lastExecutionDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last executed: {new Date(testCase.lastExecutionDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCoverageTab;

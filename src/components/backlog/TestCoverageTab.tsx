
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TestCase } from '@/utils/types/test';
import { useBacklogTestCoverage } from '@/hooks/useBacklogTestCoverage';
import LinkTestCaseDialog from './LinkTestCaseDialog';
import TestCoverageIndicator from './TestCoverageIndicator';

interface TestCoverageTabProps {
  backlogItemId: string;
  onViewTestCase?: (testCase: TestCase) => void;
  onRefresh?: () => void;
}

interface LinkedTestCasesProps {
  testCases: TestCase[];
  isLoading: boolean;
  onUnlink: (testCaseId: string) => Promise<void>;
  onViewTestCase?: (testCase: TestCase) => void;
}

// LinkedTestCases subcomponent
const LinkedTestCases: React.FC<LinkedTestCasesProps> = ({ 
  testCases, 
  isLoading, 
  onUnlink,
  onViewTestCase
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading test cases...</div>;
  }

  if (testCases.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No test cases linked to this backlog item.</div>;
  }

  return (
    <div className="space-y-3">
      {testCases.map((testCase) => (
        <div 
          key={testCase.id} 
          className="p-3 border rounded-md hover:bg-gray-50 flex justify-between items-center"
        >
          <div>
            <div className="font-medium">{testCase.title}</div>
            <div className="text-sm text-muted-foreground">ID: {testCase.id}</div>
            <div className="mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                testCase.status === 'pass' || testCase.status === 'passed' 
                  ? 'bg-green-100 text-green-800' 
                  : testCase.status === 'fail' || testCase.status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {testCase.status}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            {onViewTestCase && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onViewTestCase(testCase)}
              >
                View
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onUnlink(testCase.id)}
            >
              Unlink
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItemId,
  onViewTestCase,
  onRefresh 
}) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const { toast } = useToast();
  const { 
    linkedTestCases, 
    isLoading, 
    isFetching, 
    unlinkTestCase,
    refreshTestCases
  } = useBacklogTestCoverage(backlogItemId);

  const testCaseCount = linkedTestCases?.length || 0;
  const passedTestsCount = linkedTestCases?.filter(tc => tc.status === 'pass' || tc.status === 'passed').length || 0;
  const failedTestsCount = linkedTestCases?.filter(tc => tc.status === 'fail' || tc.status === 'failed').length || 0;
  const notExecutedCount = linkedTestCases?.filter(tc => 
    tc.status === 'not-run' || tc.status === 'blocked' || tc.status === 'draft' || tc.status === 'ready'
  ).length || 0;
  
  // Calculate coverage percentage
  const coveragePercentage = testCaseCount > 0 
    ? Math.round((passedTestsCount / testCaseCount) * 100) 
    : 0;
  
  const handleOpenLinkDialog = () => {
    setIsLinkDialogOpen(true);
  };
  
  const handleCloseLinkDialog = () => {
    setIsLinkDialogOpen(false);
    refreshTestCases();
    if (onRefresh) {
      onRefresh();
    }
  };
  
  const handleUnlinkTestCase = async (testCaseId: string) => {
    try {
      const result = await unlinkTestCase(testCaseId);
      if (result.success) {
        toast({
          title: "Test case unlinked",
          description: "The test case has been successfully unlinked from this backlog item.",
        });
        refreshTestCases();
        if (onRefresh) {
          onRefresh();
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to unlink test case",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while unlinking the test case",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Test Coverage</CardTitle>
            <CardDescription>
              Overall test coverage for this item
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center pt-4">
            <TestCoverageIndicator 
              coverage={{
                totalTestCases: testCaseCount,
                passedTests: passedTestsCount,
                failedTests: failedTestsCount,
                notExecutedTests: notExecutedCount,
                coveragePercentage: coveragePercentage,
                lastUpdated: new Date(),
                // Add backward compatibility properties
                total: testCaseCount,
                covered: testCaseCount > 0 ? passedTestsCount + failedTestsCount : 0,
                passed: passedTestsCount,
                failed: failedTestsCount
              }}
              size="lg"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Test Status</CardTitle>
            <CardDescription>
              Status of linked test cases
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">{passedTestsCount}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{failedTestsCount}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{notExecutedCount}</div>
                <div className="text-sm text-muted-foreground">Not Run</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Test Cases</CardTitle>
            <CardDescription>
              Linked test cases for verification
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{testCaseCount}</div>
              <div className="text-sm text-muted-foreground mb-4">Total Test Cases</div>
              
              <Button onClick={handleOpenLinkDialog} className="w-full">
                <PlusIcon className="h-4 w-4 mr-2" />
                Link Test Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Test Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Test Cases</CardTitle>
          <CardDescription>
            Test cases linked to this backlog item for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkedTestCases
            testCases={linkedTestCases || []}
            isLoading={isLoading || isFetching}
            onUnlink={handleUnlinkTestCase}
            onViewTestCase={onViewTestCase}
          />
        </CardContent>
      </Card>
      
      {/* Link Test Case Dialog */}
      <LinkTestCaseDialog
        backlogItemId={backlogItemId}
        open={isLinkDialogOpen}
        onClose={handleCloseLinkDialog}
      />
    </div>
  );
};

export default TestCoverageTab;

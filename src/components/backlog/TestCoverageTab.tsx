
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
import { BacklogItem, BacklogTestCoverage } from '@/utils/types/backlogTypes';
import { useBacklogTestCoverage } from '@/hooks/useBacklogTestCoverage';
import LinkTestCaseDialog from './LinkTestCaseDialog';
import TestCoverageIndicator from './TestCoverageIndicator';
import LinkedTestCases from './LinkedTestCases';

interface TestCoverageTabProps {
  backlogItem: BacklogItem;
  onRefresh?: () => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItem,
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
  } = useBacklogTestCoverage(backlogItem.id);

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
  
  // Create a coverage object for the TestCoverageIndicator
  const coverage: BacklogTestCoverage = {
    totalTestCases: testCaseCount,
    passedTests: passedTestsCount,
    failedTests: failedTestsCount,
    notExecutedTests: notExecutedCount,
    coveragePercentage: coveragePercentage,
    lastUpdated: new Date(),
    // Add these properties for compatibility with TestCoverageIndicator
    total: testCaseCount,
    covered: passedTestsCount
  };
  
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
                total: testCaseCount,
                covered: testCaseCount > 0 ? passedTestsCount : 0,
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
          />
        </CardContent>
      </Card>
      
      {/* Link Test Case Dialog */}
      <LinkTestCaseDialog
        backlogItemId={backlogItem.id}
        open={isLinkDialogOpen}
        onClose={handleCloseLinkDialog}
      />
    </div>
  );
};

export default TestCoverageTab;

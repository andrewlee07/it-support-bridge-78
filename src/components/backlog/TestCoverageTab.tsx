
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase } from '@/utils/types/testTypes';
import { useQuery } from '@tanstack/react-query';
import { 
  getTestCoverageForBacklogItem, 
  getTraceabilityMatrix 
} from '@/utils/api/testBacklogIntegrationApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube, 
  Bug, 
  RefreshCw, 
  Info, 
  Network 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import TestCoverageIndicator from './TestCoverageIndicator';
import LinkedTestCases from './LinkedTestCases';
import LinkTestCaseDialog from './LinkTestCaseDialog';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TestCoverageTabProps {
  backlogItem: BacklogItem;
  onViewTestCase?: (testCase: TestCase) => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItem,
  onViewTestCase
}) => {
  const { toast } = useToast();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isViewingTraceability, setIsViewingTraceability] = useState(false);
  
  // Fetch test coverage for this backlog item
  const { 
    data: coverageResponse, 
    isLoading: isLoadingCoverage,
    refetch: refetchCoverage
  } = useQuery({
    queryKey: ['backlogTestCoverage', backlogItem.id],
    queryFn: () => getTestCoverageForBacklogItem(backlogItem.id),
    enabled: !!backlogItem.id
  });
  
  // Fetch traceability data
  const { 
    data: traceabilityResponse,
    isLoading: isLoadingTraceability
  } = useQuery({
    queryKey: ['traceabilityMatrix'],
    queryFn: () => getTraceabilityMatrix(),
    enabled: isViewingTraceability
  });
  
  const coverage = coverageResponse?.data;
  const traceabilityMatrix = traceabilityResponse?.data;
  
  // Find this backlog item in the traceability matrix
  const backlogTraceability = traceabilityMatrix?.backlogItems.find(
    item => item.id === backlogItem.id
  );
  
  const handleRefresh = () => {
    refetchCoverage();
    toast({
      title: "Coverage refreshed",
      description: "Test coverage data has been updated.",
    });
  };

  const handleLinkTestCaseSuccess = () => {
    refetchCoverage();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <TestTube className="h-5 w-5 mr-2" />
            Test Coverage Overview
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsViewingTraceability(true)}
            >
              <Network className="h-4 w-4 mr-2" />
              Traceability
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingCoverage ? (
            <Skeleton className="h-12 w-full" />
          ) : (
            <div className="space-y-4">
              <TestCoverageIndicator coverage={coverage} size="lg" showDetails={true} />
              
              {coverage && coverage.totalTestCases > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <div className="text-blue-600 dark:text-blue-400 font-medium">Total Test Cases</div>
                    <div className="text-2xl font-bold mt-1">{coverage.totalTestCases}</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                    <div className="text-green-600 dark:text-green-400 font-medium">Passed Tests</div>
                    <div className="text-2xl font-bold mt-1">{coverage.passedTests}</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                    <div className="text-red-600 dark:text-red-400 font-medium">Failed Tests</div>
                    <div className="text-2xl font-bold mt-1">{coverage.failedTests}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 p-4 rounded-md mt-4">
                  <div className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No test cases linked to this backlog item yet.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => setIsLinkDialogOpen(true)}
                  >
                    Link Test Cases
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <LinkedTestCases 
        backlogItem={backlogItem}
        onLinkTestCase={() => setIsLinkDialogOpen(true)}
        onViewTestCase={onViewTestCase}
        refetch={refetchCoverage}
      />

      {/* Link Test Case Dialog */}
      <LinkTestCaseDialog
        backlogItem={backlogItem}
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        onSuccess={handleLinkTestCaseSuccess}
      />

      {/* Traceability Matrix Dialog */}
      <Dialog open={isViewingTraceability} onOpenChange={setIsViewingTraceability}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Traceability Matrix</DialogTitle>
          </DialogHeader>
          {isLoadingTraceability ? (
            <div className="space-y-3 py-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : !backlogTraceability ? (
            <div className="py-8 text-center text-muted-foreground">
              <Network className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No traceability data available for this backlog item</p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Backlog Item</h3>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium">{backlogTraceability.title}</div>
                    <div className="text-sm text-muted-foreground">ID: {backlogTraceability.id}</div>
                  </div>
                  <div className="mt-2">
                    <TestCoverageIndicator 
                      coverage={{ 
                        totalTestCases: backlogTraceability.testCases.length,
                        passedTests: backlogTraceability.testCases.filter(tc => 
                          tc.status === 'pass' || tc.status === 'passed'
                        ).length,
                        failedTests: backlogTraceability.testCases.filter(tc => 
                          tc.status === 'fail' || tc.status === 'failed'
                        ).length,
                        notExecutedTests: backlogTraceability.testCases.filter(tc => 
                          tc.status !== 'pass' && tc.status !== 'passed' && 
                          tc.status !== 'fail' && tc.status !== 'failed'
                        ).length,
                        coveragePercentage: backlogTraceability.coverage,
                        lastUpdated: new Date()
                      }} 
                      size="sm" 
                    />
                  </div>
                </div>
              </div>

              {backlogTraceability.testCases.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <TestTube className="h-4 w-4 mr-1" /> 
                    Test Cases ({backlogTraceability.testCases.length})
                  </h3>
                  <div className="space-y-2">
                    {backlogTraceability.testCases.map(testCase => (
                      <div key={testCase.id} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <div className="font-medium">{testCase.title}</div>
                          <StatusBadge status={testCase.status} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last executed: {testCase.lastExecuted ? new Date(testCase.lastExecuted).toLocaleDateString() : 'Never'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {backlogTraceability.bugs.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <Bug className="h-4 w-4 mr-1" /> 
                    Related Bugs ({backlogTraceability.bugs.length})
                  </h3>
                  <div className="space-y-2">
                    {backlogTraceability.bugs.map(bug => (
                      <div key={bug.id} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <div className="font-medium">{bug.title}</div>
                          <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            {bug.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestCoverageTab;

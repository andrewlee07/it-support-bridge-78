
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, TestTube, Bug } from 'lucide-react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase, TestCoverage } from '@/utils/types/testTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import TestCoverageIndicator from './TestCoverageIndicator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LinkTestCaseDialog from './LinkTestCaseDialog';
import StatusBadge from '@/components/test-management/ui/StatusBadge';

interface TestCoverageTabProps {
  backlogItem: BacklogItem;
  onViewTestCase?: (testCase: TestCase) => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItem,
  onViewTestCase
}) => {
  const [isLinkTestCaseDialogOpen, setIsLinkTestCaseDialogOpen] = useState(false);
  
  // Mock test coverage data - in a real implementation, this would come from the API
  const mockTestCoverage = {
    totalTestCases: 8,
    passedTests: 5,
    failedTests: 2,
    notExecutedTests: 1,
    coveragePercentage: 75,
    lastUpdated: new Date(Date.now() - 3600000) // 1 hour ago
  };
  
  // Mock test cases - in a real implementation, this would come from the API
  const mockTestCases = [
    {
      id: 'tc-1',
      title: 'Verify user can create a new item',
      status: 'pass' as const,
      lastExecutionDate: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: 'tc-2',
      title: 'Verify validation errors display correctly',
      status: 'pass' as const,
      lastExecutionDate: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: 'tc-3',
      title: 'Verify item deletion requires confirmation',
      status: 'fail' as const,
      lastExecutionDate: new Date(Date.now() - 43200000), // 12 hours ago
    },
    {
      id: 'tc-4', 
      title: 'Verify item list pagination',
      status: 'not-run' as const,
      lastExecutionDate: undefined,
    },
    {
      id: 'tc-5',
      title: 'Verify item search functionality',
      status: 'pass' as const,
      lastExecutionDate: new Date(Date.now() - 259200000), // 3 days ago
    }
  ];
  
  const mockBugs = [
    {
      id: 'bug-1',
      title: 'Pagination fails on last page',
      status: 'open' as const,
      severity: 'medium' as const,
      createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    },
    {
      id: 'bug-2',
      title: 'Search doesn\'t handle special characters',
      status: 'in-progress' as const,
      severity: 'low' as const,
      createdAt: new Date(Date.now() - 604800000), // 7 days ago
    }
  ];
  
  // In a real implementation, these would be real functions that query the API
  const coverage = backlogItem.testCoverage || mockTestCoverage;
  const testCases = mockTestCases;
  const bugs = mockBugs;
  
  const handleLinkTestCase = () => {
    setIsLinkTestCaseDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      {/* Test Coverage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <TestCoverageIndicator 
                coveragePercentage={coverage.coveragePercentage}
                size="lg"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Total Test Cases</p>
                  <p className="font-semibold">{coverage.totalTestCases}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Passed</p>
                  <p className="font-semibold text-green-600">{coverage.passedTests}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Failed</p>
                  <p className="font-semibold text-red-600">{coverage.failedTests}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Not Executed</p>
                  <p className="font-semibold text-gray-600">{coverage.notExecutedTests}</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Last updated: {formatDistanceToNow(coverage.lastUpdated)} ago
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Test Cases</CardTitle>
            <Button size="sm" variant="outline" onClick={handleLinkTestCase}>
              <PlusIcon className="h-4 w-4 mr-1" />
              Link Test Case
            </Button>
          </CardHeader>
          <CardContent>
            {testCases.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <TestTube className="h-10 w-10 text-gray-400 mb-2" />
                <h3 className="font-medium">No Test Cases Linked</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Link test cases to track coverage for this backlog item.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleLinkTestCase}>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Link Test Case
                </Button>
              </div>
            ) : (
              <div className="text-sm">
                <p className="mb-2">{testCases.length} test cases linked to this item</p>
                <div className="flex items-center gap-4 mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span>Passed: {coverage.passedTests}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span>Failed: {coverage.failedTests}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                    <span>Not Run: {coverage.notExecutedTests}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Test Information */}
      <Tabs defaultValue="testcases">
        <TabsList>
          <TabsTrigger value="testcases">Test Cases ({testCases.length})</TabsTrigger>
          <TabsTrigger value="bugs">Bugs ({bugs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testcases" className="mt-4">
          {testCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-md">
              <TestTube className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="font-medium">No Test Cases Found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md">
                There are no test cases linked to this backlog item yet.
              </p>
              <Button variant="outline" className="mt-4" onClick={handleLinkTestCase}>
                <PlusIcon className="h-4 w-4 mr-1" />
                Link Test Case
              </Button>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Executed</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell className="font-medium">{testCase.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={testCase.status} />
                      </TableCell>
                      <TableCell>
                        {testCase.lastExecutionDate 
                          ? formatDistanceToNow(testCase.lastExecutionDate, { addSuffix: true })
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onViewTestCase && onViewTestCase(testCase as TestCase)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bugs" className="mt-4">
          {bugs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-md">
              <Bug className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="font-medium">No Bugs Found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md">
                There are no bugs associated with this backlog item.
              </p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bugs.map((bug) => (
                    <TableRow key={bug.id}>
                      <TableCell className="font-medium">{bug.title}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          bug.status === 'open' ? 'bg-red-100 text-red-800' :
                          bug.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {bug.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          bug.severity === 'high' ? 'bg-red-100 text-red-800' :
                          bug.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {bug.severity}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(bug.createdAt, { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Link Test Case Dialog */}
      <LinkTestCaseDialog
        isOpen={isLinkTestCaseDialogOpen}
        onClose={() => setIsLinkTestCaseDialogOpen(false)}
        backlogItemId={backlogItem.id}
        onSuccess={() => {
          // Would refresh test cases in a real implementation
          setIsLinkTestCaseDialogOpen(false);
        }}
      />
    </div>
  );
};

export default TestCoverageTab;

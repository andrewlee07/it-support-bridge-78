import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCheck, Filter, Play, Plus } from 'lucide-react';
import { TestCase } from '@/utils/types/testTypes';
import { useTestCases } from './hooks/useTestCases';
import { useTestExecution } from './hooks/useTestExecution';
import TestCaseSelectionTable from './TestCaseSelectionTable';
import TestExecutionForm from './TestExecutionForm';
import TestExecutionSummary from './TestExecutionSummary';

const TestExecutionTab = () => {
  const [activeTab, setActiveTab] = useState("select");
  const [executingTestCase, setExecutingTestCase] = useState<TestCase | null>(null);
  const [isExecutionDialogOpen, setIsExecutionDialogOpen] = useState(false);
  
  // Use our custom hooks
  const { testCasesData, isLoadingTestCases, refetch } = useTestCases();
  const {
    selectedTestCases,
    toggleTestCaseSelection,
    selectAllTestCases,
    clearSelections,
    executeTestCase
  } = useTestExecution();

  // Handle individual test case execution
  const handleExecuteTestCase = (testCase: TestCase) => {
    setExecutingTestCase(testCase);
    setIsExecutionDialogOpen(true);
  };

  // Handle test execution submission
  const handleExecuteSubmit = async (testCaseId: string, status: string, comments: string) => {
    const result = await executeTestCase(testCaseId, status as any, comments);
    if (result.success) {
      setIsExecutionDialogOpen(false);
      refetch();
    }
    return result;
  };

  // Export results to CSV
  const handleExportResults = () => {
    // In a real application, this would generate and download a CSV file
    if (!testCasesData) return;
    
    // Create CSV content
    const headers = ['Test Case', 'Status', 'Execution Date', 'Comments'];
    const rows = testCasesData.map(tc => [
      tc.title,
      tc.status,
      new Date().toISOString(), // In a real app, this would be the actual execution date
      ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `test-execution-results-${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Test Execution</CardTitle>
            <CardDescription>Execute test cases and record results</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Test Run
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="select">
              <CheckCheck className="h-4 w-4 mr-2" />
              Select Tests
            </TabsTrigger>
            <TabsTrigger value="execute">
              <Play className="h-4 w-4 mr-2" />
              Execute
            </TabsTrigger>
            <TabsTrigger value="results">
              <Calendar className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Test Cases</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            {isLoadingTestCases ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading test cases...</p>
                </div>
              </div>
            ) : (
              <TestCaseSelectionTable
                testCases={testCasesData as unknown as TestCase[]}
                selectedTestCases={selectedTestCases}
                onToggleSelection={toggleTestCaseSelection}
                onSelectAll={selectAllTestCases}
                onClearAll={clearSelections}
                onExecute={handleExecuteTestCase}
              />
            )}
          </TabsContent>
          
          <TabsContent value="execute">
            <div className="text-center py-8">
              <p className="mb-4">Select test cases from the "Select Tests" tab to execute them</p>
              <Button onClick={() => setActiveTab("select")}>
                Go to Test Selection
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {testCasesData && testCasesData.length > 0 ? (
              <TestExecutionSummary
                testCases={testCasesData as unknown as TestCase[]}
                onRefresh={refetch}
                onExport={handleExportResults}
              />
            ) : (
              <div className="text-center py-8">
                <p>No test execution results available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Test Execution Dialog */}
        <Dialog open={isExecutionDialogOpen} onOpenChange={setIsExecutionDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Execute Test Case</DialogTitle>
              <DialogDescription>
                Update the status and add execution details for this test case
              </DialogDescription>
            </DialogHeader>
            {executingTestCase && (
              <TestExecutionForm
                testCase={executingTestCase}
                onExecute={handleExecuteSubmit}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TestExecutionTab;

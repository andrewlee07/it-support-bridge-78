
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTestExecution } from './hooks/useTestExecution';
import TestCaseSelectionTable from './TestCaseSelectionTable';
import TestExecutionForm from './TestExecutionForm';
import { AlertCircle, Play } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TestExecutionTab = () => {
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string | null>(null);
  const { 
    testCasesData, 
    isLoadingTestCases,
    selectedTestCases, 
    toggleTestCaseSelection,
    executeTestCase
  } = useTestExecution();

  const handleExecuteTest = (testCaseId: string) => {
    setSelectedTestCaseId(testCaseId);
  };

  const handleCloseForm = () => {
    setSelectedTestCaseId(null);
  };

  // Find the selected test case
  const selectedTestCase = selectedTestCaseId 
    ? testCasesData.find(tc => tc.id === selectedTestCaseId) 
    : null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Test Execution</CardTitle>
          <CardDescription>Execute and track test cases</CardDescription>
        </div>
        {selectedTestCaseId && (
          <Button variant="outline" onClick={handleCloseForm}>
            Back to List
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoadingTestCases ? (
          <div className="animate-pulse p-4 rounded-lg border">Loading test cases...</div>
        ) : testCasesData.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No test cases available</AlertTitle>
            <AlertDescription>
              There are no test cases available for execution.
            </AlertDescription>
          </Alert>
        ) : selectedTestCase ? (
          <TestExecutionForm 
            testCase={selectedTestCase} 
            onExecute={executeTestCase}
            onCancel={handleCloseForm}
          />
        ) : (
          <TestCaseSelectionTable 
            testCases={testCasesData}
            selectedTestCases={selectedTestCases}
            onToggleSelect={toggleTestCaseSelection}
            onExecute={handleExecuteTest}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TestExecutionTab;

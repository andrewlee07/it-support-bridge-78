
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TestCase } from '@/utils/types/test/testCase';
import { TestStatus } from '@/utils/types/testTypes';
import { useTestExecutionForm } from './hooks/useTestExecutionForm';
import TestCaseInformation from './components/TestCaseInformation';
import ExecutionActionButtons from './components/ExecutionActionButtons';
import ExecutionCommentsField from './components/ExecutionCommentsField';
import BugCreationDialog from './BugCreationDialog';

interface TestExecutionFormProps {
  testCase: TestCase;
  onExecute: (testCaseId: string, status: TestStatus, comments: string) => void;
  onCancel?: () => void;
}

const TestExecutionForm: React.FC<TestExecutionFormProps> = ({
  testCase,
  onExecute,
  onCancel
}) => {
  const {
    comments,
    setComments,
    isSubmitting,
    selectedTestCase,
    showBugDialog,
    setShowBugDialog,
    handleExecute,
    handleCreateBug,
    handleBugSuccess
  } = useTestExecutionForm({
    testCase,
    onExecute
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Execute Test Case: {testCase.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TestCaseInformation testCase={testCase} />
          
          <Separator />
          
          <ExecutionCommentsField
            comments={comments}
            onChange={setComments}
            isDisabled={isSubmitting}
          />
          
          <ExecutionActionButtons
            testCaseId={testCase.id}
            onCreateBug={handleCreateBug}
            onExecute={(status) => handleExecute(status)}
            isSubmitting={isSubmitting}
            testCase={testCase}
          />
        </CardContent>
      </Card>
      
      {showBugDialog && selectedTestCase && (
        <BugCreationDialog
          testCase={selectedTestCase}
          isOpen={showBugDialog}
          onClose={() => setShowBugDialog(false)}
          onSuccess={handleBugSuccess}
        />
      )}
    </div>
  );
};

export default TestExecutionForm;


import React from 'react';
import {
  Card,
  CardFooter,
} from '@/components/ui/card';
import { TestCase } from '@/utils/types/testTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import BugCreationDialog from './BugCreationDialog';
import type { Bug as BugType } from '@/utils/types/test';
import TestCaseInformation from './components/TestCaseInformation';
import ExecutionCommentsField from './components/ExecutionCommentsField';
import ExecutionActionButtons from './components/ExecutionActionButtons';
import { useTestExecutionForm } from './hooks/useTestExecutionForm';
import { TestStatus } from '@/utils/types/test';

interface TestExecutionFormProps {
  testCase: TestCase;
  onExecute: (testCaseId: string, status: TestStatus, comments: string) => Promise<{ success: boolean }>;
  onLinkBug?: (testCaseId: string) => void;
  onBugCreated?: (bug: BugType, backlogItem?: BacklogItem) => void;
  onCancel?: () => void; // Added onCancel prop
}

const TestExecutionForm: React.FC<TestExecutionFormProps> = ({ 
  testCase, 
  onExecute,
  onLinkBug,
  onBugCreated,
  onCancel
}) => {
  const {
    comments,
    setComments,
    isSubmitting,
    isBugDialogOpen,
    setIsBugDialogOpen,
    handleExecute,
    handleBugCreated,
    handleLinkBug
  } = useTestExecutionForm({
    testCase,
    onExecute,
    onLinkBug,
    onBugCreated
  });

  return (
    <Card className="w-full">
      {/* Test Case Information - Title, Steps, Expected Results */}
      <TestCaseInformation testCase={testCase} />
      
      {/* Execution Comments Section */}
      <div className="px-6 pb-6">
        <ExecutionCommentsField 
          value={comments}
          onChange={setComments}
        />
      </div>
      
      {/* Execution Buttons */}
      <CardFooter className="flex justify-between">
        <ExecutionActionButtons
          onLinkBug={handleLinkBug}
          onCreateBug={() => setIsBugDialogOpen(true)}
          onExecute={handleExecute}
          testCaseId={testCase.id}
          isSubmitting={isSubmitting}
        />
      </CardFooter>

      {/* Bug Creation Dialog */}
      <BugCreationDialog
        testCase={testCase}
        isOpen={isBugDialogOpen}
        onClose={() => setIsBugDialogOpen(false)}
        onSuccess={handleBugCreated}
      />
    </Card>
  );
};

export default TestExecutionForm;

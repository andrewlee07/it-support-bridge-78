
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BugIcon, Link2Icon } from 'lucide-react';
import { TestStatus } from '@/utils/types/testTypes';
import { StatusButtonGroup } from './StatusButtonGroup';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BugCreationForm from '../forms/BugCreationForm';
import { useBugCreation } from '../hooks/useBugCreation';
import { TestCase } from '@/utils/types/test';

interface ExecutionActionButtonsProps {
  onLinkBug?: (testCaseId: string) => void;
  onCreateBug: () => void;
  onExecute: (status: TestStatus) => void;
  testCaseId: string;
  isSubmitting: boolean;
  testCase: TestCase;
}

const ExecutionActionButtons: React.FC<ExecutionActionButtonsProps> = ({
  onLinkBug,
  onCreateBug,
  onExecute,
  testCaseId,
  isSubmitting,
  testCase
}) => {
  const [showBugForm, setShowBugForm] = useState(false);
  
  const { isSubmitting: isBugSubmitting, submitBug } = useBugCreation({
    testCase,
    onSuccess: () => {
      setShowBugForm(false);
      onCreateBug();
    },
    onClose: () => setShowBugForm(false)
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {onLinkBug && (
            <Button 
              variant="outline" 
              onClick={() => onLinkBug(testCaseId)}
              disabled={isSubmitting}
            >
              <Link2Icon className="h-4 w-4 mr-2" />
              Link Bug
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => setShowBugForm(true)}
            disabled={isSubmitting}
          >
            <BugIcon className="h-4 w-4 mr-2" />
            New Bug
          </Button>
        </div>
        
        <StatusButtonGroup 
          onExecute={onExecute} 
          isSubmitting={isSubmitting} 
        />
      </div>

      <Dialog open={showBugForm} onOpenChange={setShowBugForm}>
        <DialogContent className="sm:max-w-lg">
          <BugCreationForm
            testCase={testCase}
            onSubmit={submitBug}
            onCancel={() => setShowBugForm(false)}
            isSubmitting={isBugSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExecutionActionButtons;

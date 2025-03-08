
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TestCase } from '@/utils/types/test';
import { BacklogItem } from '@/utils/types/backlogTypes';
import BugCreationForm from './forms/BugCreationForm';
import { useBugCreation } from './hooks/useBugCreation';
import type { Bug } from '@/utils/types/test';

interface BugCreationDialogProps {
  testCase: TestCase;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (bug: Bug, backlogItem?: BacklogItem) => void;
}

const BugCreationDialog: React.FC<BugCreationDialogProps> = ({
  testCase,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { isSubmitting, submitBug } = useBugCreation({
    testCase,
    onSuccess,
    onClose
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Bug from Test Failure</DialogTitle>
          <DialogDescription>
            Report a bug based on this failed test case and optionally create a backlog item.
          </DialogDescription>
        </DialogHeader>
        
        <BugCreationForm
          testCase={testCase}
          onSubmit={submitBug}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BugCreationDialog;

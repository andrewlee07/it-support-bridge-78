
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import TestCycleForm from './forms/TestCycleForm';
import { useTestCycleCreation } from './hooks/useTestCycleCreation';
import { TestCycleFormValues } from './schemas/testCycleSchema';

interface CreateTestCycleDialogProps {
  releaseId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateTestCycleDialog: React.FC<CreateTestCycleDialogProps> = ({ 
  releaseId, 
  isOpen, 
  onClose,
  onSuccess
}) => {
  const { submitTestCycle, isPending } = useTestCycleCreation({
    releaseId,
    onSuccess,
    onClose
  });

  const handleSubmit = (data: TestCycleFormValues) => {
    submitTestCycle(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create Test Cycle</DialogTitle>
          <DialogDescription>
            Create a new test cycle for this release.
          </DialogDescription>
        </DialogHeader>
        
        <TestCycleForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestCycleDialog;

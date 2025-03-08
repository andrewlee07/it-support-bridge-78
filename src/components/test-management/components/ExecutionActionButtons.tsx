
import React from 'react';
import { Button } from '@/components/ui/button';
import { BugIcon, Link2Icon } from 'lucide-react';
import { TestStatus } from '@/utils/types/testTypes';
import { StatusButtonGroup } from './StatusButtonGroup';

interface ExecutionActionButtonsProps {
  onLinkBug?: (testCaseId: string) => void;
  onCreateBug: () => void;
  onExecute: (status: TestStatus) => void;
  testCaseId: string;
  isSubmitting: boolean;
}

const ExecutionActionButtons: React.FC<ExecutionActionButtonsProps> = ({
  onLinkBug,
  onCreateBug,
  onExecute,
  testCaseId,
  isSubmitting
}) => {
  return (
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
          onClick={onCreateBug}
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
  );
};

export default ExecutionActionButtons;

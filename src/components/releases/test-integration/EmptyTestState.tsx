
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ShieldCheck } from 'lucide-react';

interface EmptyTestStateProps {
  onCreateTestCycle: () => void;
}

const EmptyTestState: React.FC<EmptyTestStateProps> = ({ onCreateTestCycle }) => {
  return (
    <div className="flex items-center justify-center p-8 border rounded-md text-center">
      <div className="max-w-md space-y-3">
        <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium">No test data available</h3>
        <p className="text-muted-foreground">
          Start by creating a test cycle for this release to track test coverage and execution progress.
        </p>
        <Button onClick={onCreateTestCycle}>
          <Plus className="h-4 w-4 mr-2" />
          Create Test Cycle
        </Button>
      </div>
    </div>
  );
};

export default EmptyTestState;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw } from 'lucide-react';

interface TestsTabHeaderProps {
  onCreateTestCycle: () => void;
  onRefresh: () => void;
}

const TestsTabHeader: React.FC<TestsTabHeaderProps> = ({ 
  onCreateTestCycle, 
  onRefresh 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Test Management</h2>
      <div className="flex space-x-2">
        <Button onClick={onCreateTestCycle}>
          <Plus className="h-4 w-4 mr-2" />
          Create Test Cycle
        </Button>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default TestsTabHeader;

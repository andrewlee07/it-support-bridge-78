
import React from 'react';
import { Button } from '@/components/ui/button';

const TestTrackingHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Test Management</h1>
        <p className="text-muted-foreground">
          Manage test cases, bugs, and test execution
        </p>
      </div>
      <div className="mt-4 md:mt-0 space-x-2">
        <Button variant="outline">
          Import
        </Button>
        <Button variant="outline">
          Export
        </Button>
        <Button>
          Create Test Case
        </Button>
      </div>
    </div>
  );
};

export default TestTrackingHeader;

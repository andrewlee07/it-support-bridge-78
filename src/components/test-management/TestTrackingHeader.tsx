
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Download } from 'lucide-react';

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
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Test Case
        </Button>
      </div>
    </div>
  );
};

export default TestTrackingHeader;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Download } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TestCaseForm from './TestCaseForm';
import { useToast } from '@/hooks/use-toast';

const TestTrackingHeader = () => {
  const [showTestCaseForm, setShowTestCaseForm] = useState(false);
  const { toast } = useToast();

  const handleTestCaseSuccess = () => {
    setShowTestCaseForm(false);
    toast({
      title: "Test case created",
      description: "The test case has been created successfully.",
    });
  };

  return (
    <>
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
          <Button onClick={() => setShowTestCaseForm(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Test Case
          </Button>
        </div>
      </div>

      <Dialog open={showTestCaseForm} onOpenChange={setShowTestCaseForm}>
        <DialogContent className="sm:max-w-3xl">
          <TestCaseForm 
            onSuccess={handleTestCaseSuccess} 
            onCancel={() => setShowTestCaseForm(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestTrackingHeader;

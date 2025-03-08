
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useToast } from '@/hooks/use-toast';
import TestExecutionTab from '@/components/test-management/TestExecutionTab';

const TestExecution = () => {
  const { toast } = useToast();

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Test Execution</h1>
            <p className="text-muted-foreground mt-1">
              Execute test cases and track results
            </p>
          </div>

          <TestExecutionTab />
        </div>
      </div>
    </PageTransition>
  );
};

export default TestExecution;

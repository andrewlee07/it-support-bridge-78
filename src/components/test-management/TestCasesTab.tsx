
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestCaseList from './TestCaseList';
import { useTestCases } from './hooks/useTestCases';
import { PlusCircle, X } from 'lucide-react';
import TestCaseForm from './TestCaseForm';
import { useToast } from '@/hooks/use-toast';

const TestCasesTab = () => {
  const [showForm, setShowForm] = useState(false);
  const { isLoadingTestCases, refetch } = useTestCases();
  const { toast } = useToast();

  const handleTestCaseSuccess = () => {
    setShowForm(false);
    refetch();
    toast({
      title: "Test case created",
      description: "The test case has been created successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Test Cases</CardTitle>
          <CardDescription>Manage your test cases</CardDescription>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Test Case
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <TestCaseForm onSuccess={handleTestCaseSuccess} onCancel={() => setShowForm(false)} />
        ) : isLoadingTestCases ? (
          <div className="animate-pulse py-10 text-center">Loading test cases...</div>
        ) : (
          <TestCaseList />
        )}
      </CardContent>
    </Card>
  );
};

export default TestCasesTab;

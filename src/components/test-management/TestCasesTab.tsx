
import React from 'react';
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
import { PlusCircle } from 'lucide-react';

const TestCasesTab = () => {
  const { isLoadingTestCases } = useTestCases();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Test Cases</CardTitle>
          <CardDescription>Manage your test cases</CardDescription>
        </div>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Test Case
        </Button>
      </CardHeader>
      <CardContent>
        {isLoadingTestCases ? (
          <div className="animate-pulse py-10 text-center">Loading test cases...</div>
        ) : (
          <TestCaseList />
        )}
      </CardContent>
    </Card>
  );
};

export default TestCasesTab;

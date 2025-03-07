
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TestCaseList from './TestCaseList';

const TestCasesTab = () => {
  // Fetch test cases
  const { data: testCasesData, isLoading: isLoadingTestCases } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Cases</CardTitle>
        <CardDescription>Manage your test cases</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingTestCases ? (
          <div className="animate-pulse">Loading test cases...</div>
        ) : (
          <TestCaseList />
        )}
      </CardContent>
    </Card>
  );
};

export default TestCasesTab;

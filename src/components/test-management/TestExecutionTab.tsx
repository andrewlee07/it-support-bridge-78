
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestCycles } from '@/utils/mockData/testData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TestExecutionTab = () => {
  // Fetch test cycles
  const { data: testCyclesData, isLoading: isLoadingTestCycles } = useQuery({
    queryKey: ['testCycles'],
    queryFn: fetchTestCycles,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Execution</CardTitle>
        <CardDescription>Execute test cases and record results</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingTestCycles ? (
          <div className="animate-pulse">Loading test cycles...</div>
        ) : (
          <div className="text-center py-8">
            <p>Test execution functionality will be implemented here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestExecutionTab;

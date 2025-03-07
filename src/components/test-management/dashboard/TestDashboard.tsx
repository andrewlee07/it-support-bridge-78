
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestStats, fetchBugs, fetchTestCases } from '@/utils/mockData/testData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ClipboardList,
  Bug,
  BarChart4,
} from 'lucide-react';
import { TestStatus } from '@/utils/types/testTypes';
import TestStatusChart from './TestStatusChart';
import { SeverityBadge, StatusBadge } from '../ui/BugBadges';

const TestDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<TestStatus | null>(null);

  // Fetch test stats
  const { data: testStatsData, isLoading: isLoadingTestStats } = useQuery({
    queryKey: ['testStats'],
    queryFn: fetchTestStats,
  });

  // Fetch bugs for recent bugs section
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  // Fetch test cases (we'll use this for filtered test cases by status)
  const { data: testCasesData, isLoading: isLoadingTestCases } = useQuery({
    queryKey: ['testCases', statusFilter],
    queryFn: () => fetchTestCases(statusFilter),
  });

  // Filter handler for the status chart
  const handleStatusFilter = (status: TestStatus | null) => {
    setStatusFilter(status);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Test Cases Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Test Cases
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.totalTestCases || 0
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Pass Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pass Rate
            </CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.totalTestCases > 0 
                  ? `${Math.round((testStatsData?.data?.passedTests / testStatsData?.data?.totalTestCases) * 100)}%`
                  : "N/A"
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Open Bugs Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Bugs
            </CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.openBugs || 0
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Test Cycle Progress Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Test Cycle Progress
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.testCycleProgress?.[0]?.progress + "%" || "N/A"
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Test Status Chart Card */}
        <div className="col-span-1">
          {isLoadingTestStats ? (
            <Card>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="animate-pulse">Loading chart data...</div>
              </CardContent>
            </Card>
          ) : (
            <TestStatusChart
              passedTests={testStatsData?.data?.passedTests || 0}
              failedTests={testStatsData?.data?.failedTests || 0}
              blockedTests={testStatsData?.data?.blockedTests || 0}
              notRunTests={testStatsData?.data?.notRunTests || 0}
              onFilterByStatus={handleStatusFilter}
            />
          )}
        </div>

        {/* Recent Bugs Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Bugs</CardTitle>
            <CardDescription>Latest reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingBugs ? (
              <div className="animate-pulse">Loading bugs...</div>
            ) : bugsData?.data?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bugs reported yet
              </div>
            ) : (
              <div className="space-y-4">
                {bugsData?.data?.slice(0, 3).map((bug) => (
                  <div key={bug.id} className="flex items-start pb-3 border-b">
                    <div className="mr-2">
                      <Bug className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{bug.title}</h4>
                      <div className="flex mt-1 space-x-2">
                        <SeverityBadge severity={bug.severity} />
                        <StatusBadge status={bug.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filtered Test Cases (only shown when filter is active) */}
      {statusFilter && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Filtered Test Cases</CardTitle>
                <CardDescription>
                  Showing test cases with status: {statusFilter}
                </CardDescription>
              </div>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => setStatusFilter(null)}
              >
                Clear filter
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingTestCases ? (
              <div className="animate-pulse">Loading filtered test cases...</div>
            ) : testCasesData?.data.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No test cases found with this status
              </div>
            ) : (
              <div className="space-y-2">
                {testCasesData?.data.map((testCase) => (
                  <div key={testCase.id} className="p-2 border rounded-md">
                    <div className="font-medium">{testCase.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {testCase.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestDashboard;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestStats, fetchBugs } from '@/utils/mockData/testData';
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

const TestDashboard = () => {
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
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Test Status</CardTitle>
            <CardDescription>Distribution of test case statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              {isLoadingTestStats ? (
                <div className="animate-pulse">Loading chart data...</div>
              ) : (
                <div className="text-center">
                  <p>Chart will be implemented here</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Passed: {testStatsData?.data?.passedTests || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span>Failed: {testStatsData?.data?.failedTests || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span>Blocked: {testStatsData?.data?.blockedTests || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                      <span>Not Run: {testStatsData?.data?.notRunTests || 0}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          {bug.severity}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {bug.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestDashboard;

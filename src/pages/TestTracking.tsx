
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
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
  PlayCircle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases, fetchBugs, fetchTestStats, fetchTestCycles } from '@/utils/mockData/testData';
import PageTransition from '@/components/shared/PageTransition';

const TestTracking = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch test cases
  const { data: testCasesData, isLoading: isLoadingTestCases } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  // Fetch bugs
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  // Fetch test cycles
  const { data: testCyclesData, isLoading: isLoadingTestCycles } = useQuery({
    queryKey: ['testCycles'],
    queryFn: fetchTestCycles,
  });

  // Fetch test stats
  const { data: testStatsData, isLoading: isLoadingTestStats } = useQuery({
    queryKey: ['testStats'],
    queryFn: fetchTestStats,
  });

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        {/* Header section */}
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

        {/* Main content */}
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="testcases" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden md:inline">Test Cases</span>
            </TabsTrigger>
            <TabsTrigger value="bugs" className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              <span className="hidden md:inline">Bugs</span>
            </TabsTrigger>
            <TabsTrigger value="execution" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              <span className="hidden md:inline">Test Execution</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          </TabsContent>

          <TabsContent value="testcases">
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
                <CardDescription>Manage your test cases</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingTestCases ? (
                  <div className="animate-pulse">Loading test cases...</div>
                ) : (
                  <div className="text-center py-8">
                    <p>Test case management will be implemented here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bugs">
            <Card>
              <CardHeader>
                <CardTitle>Bug Tracking</CardTitle>
                <CardDescription>Track and manage bugs</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingBugs ? (
                  <div className="animate-pulse">Loading bugs...</div>
                ) : (
                  <div className="text-center py-8">
                    <p>Bug tracking will be implemented here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution">
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
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default TestTracking;


import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ClipboardList,
  Bug,
  BarChart4,
} from 'lucide-react';

interface StatCardsProps {
  testStatsData: any;
  isLoadingTestStats: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ testStatsData, isLoadingTestStats }) => {
  return (
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
  );
};

export default StatCards;

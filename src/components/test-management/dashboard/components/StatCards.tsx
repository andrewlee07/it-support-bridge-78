
import React from 'react';
import {
  Card,
  CardContent,
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Test Cases Card */}
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Total Test Cases
            </p>
            <p className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.totalTestCases || 0
              )}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <ClipboardList className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>
      
      {/* Pass Rate Card */}
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Pass Rate
            </p>
            <p className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.totalTestCases > 0 
                  ? `${Math.round((testStatsData?.data?.passedTests / testStatsData?.data?.totalTestCases) * 100)}%`
                  : "N/A"
              )}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/20">
            <BarChart4 className="h-6 w-6 text-green-700 dark:text-green-300" />
          </div>
        </CardContent>
      </Card>
      
      {/* Open Bugs Card */}
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Open Bugs
            </p>
            <p className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.openBugs || 0
              )}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <Bug className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>
      
      {/* Test Cycle Progress Card */}
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Test Cycle Progress
            </p>
            <p className="text-2xl font-bold">
              {isLoadingTestStats ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                testStatsData?.data?.testCycleProgress?.[0]?.progress + "%" || "N/A"
              )}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/20">
            <Activity className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;


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
import { cn } from '@/lib/utils';

interface StatCardsProps {
  testStatsData: any;
  isLoadingTestStats: boolean;
  cardFilters?: string[];
  toggleCardFilter?: (filter: string) => void;
}

const StatCards: React.FC<StatCardsProps> = ({ 
  testStatsData, 
  isLoadingTestStats, 
  cardFilters = [], 
  toggleCardFilter = () => {} 
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Test Cases Card */}
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('total') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('total')}
      >
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
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('pass-rate') ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : ''
        )}
        onClick={() => toggleCardFilter('pass-rate')}
      >
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
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('bugs') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('bugs')}
      >
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
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('cycle-progress') ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' : ''
        )}
        onClick={() => toggleCardFilter('cycle-progress')}
      >
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


import React from 'react';
import { Activity, ClipboardList, Bug, BarChart4 } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

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
  if (isLoadingTestStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[104px] animate-pulse bg-secondary/50 border border-border/20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  const passRate = testStatsData?.data?.totalTestCases > 0 
    ? `${Math.round((testStatsData?.data?.passedTests / testStatsData?.data?.totalTestCases) * 100)}%`
    : "N/A";

  const cards = [
    {
      id: 'total',
      title: 'Total Test Cases',
      value: testStatsData?.data?.totalTestCases || 0,
      icon: ClipboardList,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'pass-rate',
      title: 'Pass Rate',
      value: passRate,
      icon: BarChart4,
      iconColor: 'text-green-700 dark:text-green-300',
      iconBgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      id: 'bugs',
      title: 'Open Bugs',
      value: testStatsData?.data?.openBugs || 0,
      icon: Bug,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      id: 'cycle-progress',
      title: 'Test Cycle Progress',
      value: testStatsData?.data?.testCycleProgress?.[0]?.progress + "%" || "N/A",
      icon: Activity,
      iconColor: 'text-purple-700 dark:text-purple-300',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <StatCardGrid 
      cards={cards} 
      activeCardIds={cardFilters} 
      onCardClick={toggleCardFilter} 
    />
  );
};

export default StatCards;


import React from 'react';
import { useTestDashboard } from './hooks/useTestDashboard';
import StatCards from './components/StatCards';
import RecentBugsCard from './components/RecentBugsCard';
import FilteredTestCasesCard from './components/FilteredTestCasesCard';
import DashboardChartSection from './components/DashboardChartSection';

const TestDashboard = () => {
  const {
    statusFilter,
    testStatsData,
    isLoadingTestStats,
    bugsData,
    isLoadingBugs,
    testCasesData,
    isLoadingTestCases,
    handleStatusFilter,
  } = useTestDashboard();

  return (
    <div className="space-y-4">
      {/* Stats Cards Section */}
      <StatCards 
        testStatsData={testStatsData} 
        isLoadingTestStats={isLoadingTestStats} 
      />

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Test Status Chart */}
        <DashboardChartSection 
          testStatsData={testStatsData}
          isLoadingTestStats={isLoadingTestStats}
          onFilterByStatus={handleStatusFilter}
        />

        {/* Recent Bugs Card */}
        <RecentBugsCard 
          bugsData={bugsData} 
          isLoadingBugs={isLoadingBugs} 
        />
      </div>

      {/* Filtered Test Cases (only shown when filter is active) */}
      <FilteredTestCasesCard 
        statusFilter={statusFilter}
        testCasesData={testCasesData}
        isLoadingTestCases={isLoadingTestCases}
        onClearFilter={() => handleStatusFilter(null)}
      />
    </div>
  );
};

export default TestDashboard;


import React from 'react';
import TestStatusChart from '../TestStatusChart';
import { TestStatus } from '@/utils/types/testTypes';

interface DashboardChartSectionProps {
  testStatsData: any;
  isLoadingTestStats: boolean;
  onFilterByStatus: (status: TestStatus | null) => void;
}

const DashboardChartSection: React.FC<DashboardChartSectionProps> = ({ 
  testStatsData, 
  isLoadingTestStats,
  onFilterByStatus
}) => {
  return (
    <div className="col-span-1">
      {isLoadingTestStats ? (
        <div className="h-[350px] rounded-md border flex items-center justify-center">
          <div className="animate-pulse">Loading chart data...</div>
        </div>
      ) : (
        <TestStatusChart
          passedTests={testStatsData?.data?.passedTests || 0}
          failedTests={testStatsData?.data?.failedTests || 0}
          blockedTests={testStatsData?.data?.blockedTests || 0}
          notRunTests={testStatsData?.data?.notRunTests || 0}
          onFilterByStatus={onFilterByStatus}
        />
      )}
    </div>
  );
};

export default DashboardChartSection;

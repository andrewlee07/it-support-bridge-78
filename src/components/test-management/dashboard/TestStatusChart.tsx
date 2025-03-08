
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { TestStatus } from '@/utils/types/testTypes';
import { StatusCount, STATUS_COLORS, STATUS_LABELS } from './types/chartTypes';
import CustomLegend from './chart-components/CustomLegend';
import ChartControls from './chart-components/ChartControls';
import TestChart from './chart-components/TestChart';

interface TestStatusChartProps {
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  onFilterByStatus?: (status: TestStatus | null) => void;
}

const TestStatusChart: React.FC<TestStatusChartProps> = ({
  passedTests,
  failedTests,
  blockedTests,
  notRunTests,
  onFilterByStatus,
}) => {
  const [viewMode, setViewMode] = useState<'percentage' | 'count'>('percentage');
  const [chartType, setChartType] = useState<'pie' | 'donut'>('donut');

  // Prepare data for the chart
  const totalTests = passedTests + failedTests + blockedTests + notRunTests;
  
  const chartData: StatusCount[] = [
    { status: 'pass' as TestStatus, count: passedTests, color: STATUS_COLORS['pass'], label: STATUS_LABELS['pass'] },
    { status: 'fail' as TestStatus, count: failedTests, color: STATUS_COLORS['fail'], label: STATUS_LABELS['fail'] },
    { status: 'blocked' as TestStatus, count: blockedTests, color: STATUS_COLORS['blocked'], label: STATUS_LABELS['blocked'] },
    { status: 'not-run' as TestStatus, count: notRunTests, color: STATUS_COLORS['not-run'], label: STATUS_LABELS['not-run'] },
  ].filter(item => item.count > 0); // Only show statuses that have counts > 0

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle>Test Status Distribution</CardTitle>
          <CardDescription>
            Distribution of test case statuses
          </CardDescription>
        </div>
        
        <ChartControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          chartType={chartType}
          setChartType={setChartType}
          onFilterByStatus={onFilterByStatus}
        />
      </CardHeader>
      
      <CardContent>
        <div className="h-[250px] w-full">
          {totalTests > 0 ? (
            <>
              <TestChart
                chartData={chartData}
                totalTests={totalTests}
                chartType={chartType}
                viewMode={viewMode}
                onFilterByStatus={onFilterByStatus}
              />
              <CustomLegend
                chartData={chartData}
                totalTests={totalTests}
                viewMode={viewMode}
                onFilterByStatus={onFilterByStatus}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No test data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestStatusChart;

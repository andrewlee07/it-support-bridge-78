
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { StatusCount } from '../types/chartTypes';
import { TestStatus } from '@/utils/types/testTypes';

interface TestChartProps {
  chartData: StatusCount[];
  totalTests: number;
  chartType: 'pie' | 'donut';
  viewMode: 'percentage' | 'count';
  onFilterByStatus?: (status: TestStatus) => void;
}

const TestChart: React.FC<TestChartProps> = ({
  chartData,
  totalTests,
  chartType,
  viewMode,
  onFilterByStatus
}) => {
  // Transform data to fit Nivo's format
  const nivoData = chartData.map(item => ({
    id: item.label,
    label: item.label,
    value: item.count,
    color: item.color,
    status: item.status
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsivePie
        data={nivoData}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={chartType === 'donut' ? 0.5 : 0}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLabel={d => `${((d.value / totalTests) * 100).toFixed(0)}%`}
        arcLabelsSkipAngle={10}
        arcLabelsRadiusOffset={0.55}
        arcLabelsStraightRadius={0.5}
        enableArcLinkLabels={false}
        tooltip={({ datum }) => {
          const statusItem = chartData.find(item => item.status === datum.data.status);
          const percentage = ((datum.value / totalTests) * 100).toFixed(1);
          
          return (
            <div className="bg-white p-2 border shadow-md rounded-md">
              <p className="font-medium">{datum.label}</p>
              <p>Count: {datum.value}</p>
              <p>Percentage: {percentage}%</p>
            </div>
          );
        }}
        onClick={(datum) => {
          const statusItem = chartData.find(item => item.label === datum.label);
          if (statusItem && onFilterByStatus) {
            onFilterByStatus(statusItem.status);
          }
        }}
      />
    </div>
  );
};

export default TestChart;

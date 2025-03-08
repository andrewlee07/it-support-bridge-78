
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StatusCount } from '../types/chartTypes';
import { TestStatus } from '@/utils/types/testTypes';
import CustomTooltip from './CustomTooltip';

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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={chartType === 'donut' ? 40 : 0}
          dataKey="count"
          nameKey="label"
          label={({ name, percent }) => 
            viewMode === 'percentage' 
              ? `${(percent * 100).toFixed(0)}%`
              : ''
          }
          onClick={(data) => onFilterByStatus && onFilterByStatus(data.status)}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color} 
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip totalTests={totalTests} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TestChart;


import React from 'react';
import { StatusCount } from '../types/chartTypes';
import { TestStatus } from '@/utils/types/testTypes';

interface CustomLegendProps {
  chartData: StatusCount[];
  totalTests: number;
  viewMode: 'percentage' | 'count';
  onFilterByStatus?: (status: TestStatus | null) => void;
}

const CustomLegend: React.FC<CustomLegendProps> = ({
  chartData,
  totalTests,
  viewMode,
  onFilterByStatus
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {chartData.map((entry) => (
        <div 
          key={entry.status}
          className="flex items-center cursor-pointer hover:opacity-80"
          onClick={() => onFilterByStatus && onFilterByStatus(entry.status)}
        >
          <div
            className="w-3 h-3 mr-1"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">
            {entry.label}: {viewMode === 'percentage' 
              ? `${((entry.count / totalTests) * 100).toFixed(1)}%`
              : entry.count
            }
          </span>
        </div>
      ))}
      {onFilterByStatus && (
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 ml-2"
          onClick={() => onFilterByStatus(null)}
        >
          <span className="text-sm text-primary underline">Clear filter</span>
        </div>
      )}
    </div>
  );
};

export default CustomLegend;

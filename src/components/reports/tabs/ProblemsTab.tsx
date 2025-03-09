
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { problemChartConfig } from '@/utils/reports/chartConfigs';
import { mockProblemData } from '@/utils/mockData/reportData';

interface ProblemsTabProps {
  onSegmentClick: (value: string) => void;
}

const ProblemsTab: React.FC<ProblemsTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={problemChartConfig}
        data={mockProblemData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default ProblemsTab;

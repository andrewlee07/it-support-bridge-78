
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { backlogChartConfig } from '@/utils/reports/chartConfigs';
import { mockBugData } from '@/utils/mockData/reportData';

interface BacklogTabProps {
  onSegmentClick: (value: string) => void;
}

const BacklogTab: React.FC<BacklogTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={backlogChartConfig}
        data={mockBugData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default BacklogTab;

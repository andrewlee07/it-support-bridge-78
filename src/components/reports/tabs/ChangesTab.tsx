
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { changeChartConfig } from '@/utils/reports/chartConfigs';
import { mockChangeData } from '@/utils/mockData/reportData';

interface ChangesTabProps {
  onSegmentClick: (value: string) => void;
}

const ChangesTab: React.FC<ChangesTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={changeChartConfig}
        data={mockChangeData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default ChangesTab;

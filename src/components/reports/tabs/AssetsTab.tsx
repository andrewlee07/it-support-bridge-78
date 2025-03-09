
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { assetChartConfig } from '@/utils/reports/chartConfigs';
import { mockAssetData } from '@/utils/mockData/reportData';

interface AssetsTabProps {
  onSegmentClick: (value: string) => void;
}

const AssetsTab: React.FC<AssetsTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={assetChartConfig}
        data={mockAssetData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default AssetsTab;

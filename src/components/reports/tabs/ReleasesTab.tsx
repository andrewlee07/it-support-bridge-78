
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { releaseChartConfig } from '@/utils/reports/chartConfigs';
import { mockReleaseData } from '@/utils/mockData/reportData';

interface ReleasesTabProps {
  onSegmentClick: (value: string) => void;
}

const ReleasesTab: React.FC<ReleasesTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={releaseChartConfig}
        data={mockReleaseData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default ReleasesTab;

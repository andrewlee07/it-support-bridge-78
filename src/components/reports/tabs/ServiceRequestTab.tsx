
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import { serviceRequestChartConfig } from '@/utils/reports/chartConfigs';
import { mockServiceRequestData } from '@/utils/mockData/reportData';

interface ServiceRequestTabProps {
  onSegmentClick: (value: string) => void;
}

const ServiceRequestTab: React.FC<ServiceRequestTabProps> = ({ onSegmentClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={serviceRequestChartConfig}
        data={mockServiceRequestData}
        onSegmentClick={onSegmentClick}
      />
    </div>
  );
};

export default ServiceRequestTab;


import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import InteractiveTable from '@/components/reports/InteractiveTable';
import { incidentChartConfig } from '@/utils/reports/chartConfigs';
import { mockIncidentData, mockIncidentTableData } from '@/utils/mockData/reportData';

interface IncidentsTabProps {
  selectedSegment: string | null;
  onSegmentClick: (value: string) => void;
}

const IncidentsTab: React.FC<IncidentsTabProps> = ({ selectedSegment, onSegmentClick }) => {
  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'status', header: 'Status' },
    { key: 'priority', header: 'Priority' },
    { key: 'assignee', header: 'Assignee' },
    { key: 'createdAt', header: 'Created At' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={incidentChartConfig}
        data={mockIncidentData}
        onSegmentClick={onSegmentClick}
      />
      
      <InteractiveTable
        title="Incident Details"
        data={mockIncidentTableData}
        columns={tableColumns}
        filterKey={selectedSegment ? 'status' : undefined}
        filterValue={selectedSegment || undefined}
      />
    </div>
  );
};

export default IncidentsTab;

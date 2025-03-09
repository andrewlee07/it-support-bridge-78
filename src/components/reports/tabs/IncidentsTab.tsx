
import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import InteractiveTable from '@/components/reports/InteractiveTable';
import { incidentChartConfig } from '@/utils/reports/chartConfigs';
import { mockIncidentData, mockIncidentTableData } from '@/utils/mockData/reportData';
import { calculateSLAStatus } from '@/utils/sla/slaCalculations';

interface IncidentsTabProps {
  selectedSegment: string | null;
  onSegmentClick: (value: string) => void;
}

const IncidentsTab: React.FC<IncidentsTabProps> = ({ selectedSegment, onSegmentClick }) => {
  // Enhanced table columns with formatting options
  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'status', header: 'Status' },
    { key: 'priority', header: 'Priority' },
    { 
      key: 'assignee', 
      header: 'Assignee', 
      formatUserName: true 
    },
    { key: 'createdAt', header: 'Created At' },
    { 
      key: 'sla', 
      header: 'SLA Status',
      formatSLA: true,
      render: (value: any, record: Record<string, any>) => {
        // Calculate SLA info from ticket data for rendering
        return calculateSLAStatus({
          ...record,
          createdAt: new Date(record.createdAt),
          type: 'incident'
        });
      }
    }
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


import React from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import InteractiveTable from '@/components/reports/InteractiveTable';
import { incidentChartConfig } from '@/utils/reports/chartConfigs';
import { mockIncidentData, mockIncidentTableData } from '@/utils/mockData/reportData';
import { calculateSLAStatus, SLAType } from '@/utils/sla/slaCalculations';
import TicketSLAIndicator from '@/components/tickets/components/TicketSLAIndicator';

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
      isSLAColumn: true, // Mark this as an SLA column
      render: (value: any, record: Record<string, any>) => {
        // Get the slaType from the record if passed from the parent
        const currentSlaType = (record.slaType as SLAType) || 'resolution';
        
        // Calculate SLA using the current SLA type
        const slaInfo = calculateSLAStatus({
          id: record.id || '',
          title: record.title || '',
          description: '',
          status: record.status || '',
          priority: record.priority || '',
          category: 'other',
          type: 'incident',
          createdBy: '',
          createdAt: new Date(record.createdAt),
          updatedAt: new Date(),
          audit: []
        }, currentSlaType);
        
        return slaInfo;
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

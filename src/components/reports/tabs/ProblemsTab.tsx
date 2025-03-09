
import React, { useState } from 'react';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import InteractiveTable from '@/components/reports/InteractiveTable';
import { problemChartConfig } from '@/utils/reports/chartConfigs';
import { mockProblemData } from '@/utils/mockData/reportData';
import { getAllProblems } from '@/utils/mockData/problems';

interface ProblemsTabProps {
  selectedSegment: string | null;
  onSegmentClick: (value: string) => void;
}

const ProblemsTab: React.FC<ProblemsTabProps> = ({ selectedSegment, onSegmentClick }) => {
  // Get problem data from mock problems
  const problemTableData = getAllProblems().map(problem => ({
    id: problem.id,
    title: problem.title,
    status: problem.status,
    priority: problem.priority,
    assignee: problem.assignedTo,
    createdAt: problem.createdAt,
    knownError: problem.knownErrorId || 'N/A'
  }));

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
    { key: 'knownError', header: 'Known Error' }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <DynamicChartRenderer
        config={problemChartConfig}
        data={mockProblemData}
        onSegmentClick={onSegmentClick}
      />
      
      <InteractiveTable
        title="Problem Details"
        data={problemTableData}
        columns={tableColumns}
        filterKey={selectedSegment ? 'status' : undefined}
        filterValue={selectedSegment || undefined}
      />
    </div>
  );
};

export default ProblemsTab;

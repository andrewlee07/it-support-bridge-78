
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import ChartBuilder, { ChartConfig } from '@/components/reports/ChartBuilder';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import InteractiveTable from '@/components/reports/InteractiveTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock data for testing
const mockIncidentData = [
  { id: 'open', label: 'Open', value: 35, color: '#FF6384' },
  { id: 'in-progress', label: 'In Progress', value: 25, color: '#36A2EB' },
  { id: 'pending', label: 'Pending', value: 15, color: '#FFCE56' },
  { id: 'resolved', label: 'Resolved', value: 10, color: '#4BC0C0' },
  { id: 'closed', label: 'Closed', value: 15, color: '#9966FF' },
];

const mockIncidentTableData = [
  { id: 'INC001', title: 'Server down', status: 'open', priority: 'P1', assignee: 'John Doe', createdAt: '2023-06-01' },
  { id: 'INC002', title: 'Email not working', status: 'in-progress', priority: 'P2', assignee: 'Jane Smith', createdAt: '2023-06-02' },
  { id: 'INC003', title: 'Network slow', status: 'pending', priority: 'P3', assignee: 'Bob Johnson', createdAt: '2023-06-03' },
  { id: 'INC004', title: 'Application crash', status: 'resolved', priority: 'P1', assignee: 'Alice Brown', createdAt: '2023-06-04' },
  { id: 'INC005', title: 'Printer not working', status: 'closed', priority: 'P4', assignee: 'Charlie Davis', createdAt: '2023-06-05' },
];

const ReportsPage: React.FC = () => {
  const [savedCharts, setSavedCharts] = useState<ChartConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  
  const handleSaveChart = (config: ChartConfig) => {
    const exists = savedCharts.findIndex(c => c.id === config.id);
    if (exists >= 0) {
      setSavedCharts(savedCharts.map(c => c.id === config.id ? config : c));
    } else {
      setSavedCharts([...savedCharts, config]);
    }
    setIsCreating(false);
  };
  
  const handleDeleteChart = (id: string) => {
    setSavedCharts(savedCharts.filter(c => c.id !== id));
  };
  
  const handleSegmentClick = (value: string) => {
    setSelectedSegment(value);
  };

  const tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'status', header: 'Status' },
    { key: 'priority', header: 'Priority' },
    { key: 'assignee', header: 'Assignee' },
    { key: 'createdAt', header: 'Created At' },
  ];
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and create custom reports
            </p>
          </div>
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          )}
        </div>
        
        {isCreating ? (
          <ChartBuilder 
            onSaveChart={handleSaveChart} 
            onDeleteChart={handleDeleteChart}
            savedCharts={savedCharts}
          />
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="service">Service Requests</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              {savedCharts.length === 0 ? (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <h2 className="text-xl font-medium mb-2">No custom charts yet</h2>
                  <p className="text-muted-foreground mb-4">
                    Create your first custom chart to see it here
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Chart
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedCharts.map(chart => (
                    <DynamicChartRenderer
                      key={chart.id}
                      config={chart}
                      data={mockIncidentData}
                      onSegmentClick={handleSegmentClick}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="incidents" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <DynamicChartRenderer
                  config={{
                    id: 'incidents-by-status',
                    name: 'Incidents by Status',
                    chartType: 'pie',
                    dataSource: 'incidents',
                    metrics: ['count'],
                    filters: {},
                  }}
                  data={mockIncidentData}
                  onSegmentClick={handleSegmentClick}
                />
                
                <InteractiveTable
                  title="Incident Details"
                  data={mockIncidentTableData}
                  columns={tableColumns}
                  filterKey={selectedSegment ? 'status' : undefined}
                  filterValue={selectedSegment || undefined}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="service" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No service request reports configured</p>
              </div>
            </TabsContent>
            
            <TabsContent value="changes" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No change reports configured</p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ReportsPage;

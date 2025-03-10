
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Save, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import PageTransition from '@/components/shared/PageTransition';
import DynamicChartRenderer from '@/components/reports/DynamicChartRenderer';
import ReportHeader from '@/components/reports/ReportHeader';
import ReportTabsNavigation from '@/components/reports/ReportTabsNavigation';
import DashboardTab from '@/components/reports/tabs/DashboardTab';
import IncidentsTab from '@/components/reports/tabs/IncidentsTab';
import ServiceRequestTab from '@/components/reports/tabs/ServiceRequestTab';

// Define the chart types
export type ChartType = 'pie' | 'donut' | 'bar' | 'line' | 'area';

// Define the metrics
export type Metric = 'count' | 'sum' | 'average';

// Define the data sources
export type DataSource = 'incidents' | 'serviceRequests' | 'problems' | 'changes' | 'assets' | 'tests';

// Define the configuration for a chart
export interface ChartConfig {
  id: string;
  name: string;
  chartType: ChartType;
  dataSource: DataSource;
  metrics: Metric[];
  filters: Record<string, any>;
  groupBy?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

interface ChartBuilderProps {
  onSaveChart: (config: ChartConfig) => void;
  onDeleteChart: (id: string) => void;
  savedCharts: ChartConfig[];
}

const ChartBuilder: React.FC<ChartBuilderProps> = ({ 
  onSaveChart, 
  onDeleteChart,
  savedCharts 
}) => {
  const [activeTab, setActiveTab] = useState('create');
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    id: uuidv4(),
    name: '',
    chartType: 'pie',
    dataSource: 'incidents',
    metrics: ['count'],
    filters: {},
  });

  const handleSave = () => {
    if (!chartConfig.name) {
      alert('Please enter a chart name');
      return;
    }
    onSaveChart({...chartConfig});
    setChartConfig({
      id: uuidv4(),
      name: '',
      chartType: 'pie',
      dataSource: 'incidents',
      metrics: ['count'],
      filters: {},
    });
    setActiveTab('saved');
  };

  const handleEdit = (chart: ChartConfig) => {
    setChartConfig({...chart});
    setActiveTab('create');
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Chart Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="create">Create Chart</TabsTrigger>
            <TabsTrigger value="saved">Saved Charts ({savedCharts.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Chart Name</label>
                <Input 
                  value={chartConfig.name} 
                  onChange={(e) => setChartConfig({...chartConfig, name: e.target.value})}
                  placeholder="Enter chart name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Chart Type</label>
                <Select 
                  value={chartConfig.chartType}
                  onValueChange={(value: ChartType) => setChartConfig({...chartConfig, chartType: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="donut">Donut Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Data Source</label>
              <Select 
                value={chartConfig.dataSource}
                onValueChange={(value: DataSource) => setChartConfig({...chartConfig, dataSource: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incidents">Incidents</SelectItem>
                  <SelectItem value="serviceRequests">Service Requests</SelectItem>
                  <SelectItem value="changes">Changes</SelectItem>
                  <SelectItem value="problems">Problems</SelectItem>
                  <SelectItem value="assets">Assets</SelectItem>
                  <SelectItem value="tests">Tests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Additional config options would go here */}
            
            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Chart
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            {savedCharts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No saved charts yet</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => setActiveTab('create')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Chart
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {savedCharts.map(chart => (
                  <div 
                    key={chart.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-accent"
                  >
                    <div>
                      <h3 className="font-medium">{chart.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chart.chartType} chart using {chart.dataSource} data
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(chart)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onDeleteChart(chart.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartBuilder;

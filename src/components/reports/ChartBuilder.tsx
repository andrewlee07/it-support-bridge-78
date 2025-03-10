
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChartConfigForm from './chart-builder/ChartConfigForm';
import SavedChartsList from './chart-builder/SavedChartsList';

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

  const handleCreateNew = () => {
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
          
          <TabsContent value="create">
            <ChartConfigForm 
              chartConfig={chartConfig}
              setChartConfig={setChartConfig}
              onSave={handleSave}
            />
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedChartsList 
              savedCharts={savedCharts}
              onEdit={handleEdit}
              onDelete={onDeleteChart}
              onCreateNew={handleCreateNew}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartBuilder;

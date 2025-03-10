
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChartConfig } from '../ChartBuilder';
import ChartTypeSelect from './ChartTypeSelect';
import DataSourceSelect from './DataSourceSelect';

interface ChartConfigFormProps {
  chartConfig: ChartConfig;
  setChartConfig: React.Dispatch<React.SetStateAction<ChartConfig>>;
  onSave: () => void;
}

const ChartConfigForm: React.FC<ChartConfigFormProps> = ({
  chartConfig,
  setChartConfig,
  onSave,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartConfig({...chartConfig, name: e.target.value});
  };

  const handleChartTypeChange = (value: any) => {
    setChartConfig({...chartConfig, chartType: value});
  };

  const handleDataSourceChange = (value: any) => {
    setChartConfig({...chartConfig, dataSource: value});
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Chart Name</label>
          <Input 
            value={chartConfig.name} 
            onChange={handleNameChange}
            placeholder="Enter chart name"
            className="mt-1"
          />
        </div>
        
        <ChartTypeSelect 
          value={chartConfig.chartType}
          onValueChange={handleChartTypeChange}
        />
      </div>
      
      <DataSourceSelect 
        value={chartConfig.dataSource}
        onValueChange={handleDataSourceChange}
      />
      
      {/* Additional config options would go here */}
      
      <div className="flex justify-end">
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Chart
        </Button>
      </div>
    </div>
  );
};

export default ChartConfigForm;

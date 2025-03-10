
import React from 'react';
import { ChartType } from '../ChartBuilder';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ChartTypeSelectProps {
  value: ChartType;
  onValueChange: (value: ChartType) => void;
}

const ChartTypeSelect: React.FC<ChartTypeSelectProps> = ({ value, onValueChange }) => {
  return (
    <div>
      <label className="text-sm font-medium">Chart Type</label>
      <Select 
        value={value}
        onValueChange={(value: ChartType) => onValueChange(value)}
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
  );
};

export default ChartTypeSelect;

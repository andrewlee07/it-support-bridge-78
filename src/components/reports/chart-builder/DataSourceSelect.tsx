
import React from 'react';
import { DataSource } from '../ChartBuilder';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataSourceSelectProps {
  value: DataSource;
  onValueChange: (value: DataSource) => void;
}

const DataSourceSelect: React.FC<DataSourceSelectProps> = ({ value, onValueChange }) => {
  return (
    <div>
      <label className="text-sm font-medium">Data Source</label>
      <Select 
        value={value}
        onValueChange={(value: DataSource) => onValueChange(value)}
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
  );
};

export default DataSourceSelect;

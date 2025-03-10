
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarEventType } from '@/utils/types/calendar';

interface CalendarFiltersCardProps {
  filters: {
    type: CalendarEventType | 'all';
    status: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
  onClose: () => void;
}

const CalendarFiltersCard: React.FC<CalendarFiltersCardProps> = ({
  filters,
  onFilterChange,
  onReset,
  onClose
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Filter events by type and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Event Type</label>
            <Select 
              value={filters.type} 
              onValueChange={(value) => onFilterChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="change">Changes</SelectItem>
                <SelectItem value="release">Releases</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => onFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onReset}>Reset</Button>
        <Button onClick={onClose}>Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default CalendarFiltersCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CalendarIcon } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface FilterState {
  severity: string;
  resolved: string;
  search: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface ErrorLogFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const ErrorLogFilters: React.FC<ErrorLogFiltersProps> = ({
  filters,
  onFilterChange,
  onReset
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filters</CardTitle>
        <CardDescription>Filter error logs by various criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search errors..."
              className="pl-8"
              value={filters.search}
              onChange={handleSearch}
            />
          </div>

          <Select
            value={filters.severity}
            onValueChange={(value) => onFilterChange({ ...filters, severity: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Severities</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.resolved}
            onValueChange={(value) => onFilterChange({ ...filters, resolved: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Resolution status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="false">Unresolved</SelectItem>
              <SelectItem value="true">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, 'PP') : 'Start date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => onFilterChange({ ...filters, startDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, 'PP') : 'End date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => onFilterChange({ ...filters, endDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <Button variant="secondary" size="sm" className="mt-4" onClick={onReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

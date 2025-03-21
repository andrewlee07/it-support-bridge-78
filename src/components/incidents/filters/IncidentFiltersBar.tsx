
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X, Search, Filter, Calendar as CalendarIcon2 } from 'lucide-react';
import { format } from 'date-fns';

interface IncidentFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  cardFilters: string[];
  priorityFilter: string | null;
  typeFilter: string | null;
  statusFilter: string | null;
  toggleCardFilter: (filter: string) => void;
  setPriorityFilter: (filter: string | null) => void;
  setTypeFilter: (filter: string | null) => void;
  setStatusFilter: (filter: string | null) => void;
  getTypeColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

const IncidentFiltersBar: React.FC<IncidentFiltersBarProps> = ({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  hasActiveFilters,
  resetFilters,
  cardFilters,
  priorityFilter,
  typeFilter,
  statusFilter,
  toggleCardFilter,
  setPriorityFilter,
  setTypeFilter,
  setStatusFilter,
  getTypeColor,
  getPriorityColor,
  getStatusColor
}) => {
  // Format the selected date range for display
  const formatDateRange = () => {
    if (dateRange?.from) {
      if (dateRange.to) {
        return `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`;
      }
      return format(dateRange.from, 'LLL dd, y');
    }
    return 'Select date range';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search incidents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-9 w-9 p-0"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-1.5">
              <CalendarIcon className="h-4 w-4 opacity-50" />
              <span>{formatDateRange()}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        {hasActiveFilters && (
          <Button variant="ghost" onClick={resetFilters} className="flex-shrink-0">
            <X className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>
      
      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {cardFilters.map(filter => (
            <Badge 
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 py-1.5"
            >
              {filter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleCardFilter(filter)}
              />
            </Badge>
          ))}
          
          {typeFilter && (
            <Badge 
              variant="outline"
              className={`flex items-center gap-1 py-1.5 ${getTypeColor(typeFilter)}`}
            >
              Type: {typeFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setTypeFilter(null)}
              />
            </Badge>
          )}
          
          {statusFilter && (
            <Badge 
              className={`flex items-center gap-1 py-1.5 ${getStatusColor(statusFilter)}`}
            >
              Status: {statusFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setStatusFilter(null)}
              />
            </Badge>
          )}
          
          {priorityFilter && (
            <Badge 
              variant="outline"
              className={`flex items-center gap-1 py-1.5 ${getPriorityColor(priorityFilter)}`}
            >
              Priority: {priorityFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setPriorityFilter(null)}
              />
            </Badge>
          )}
          
          {dateRange?.from && (
            <Badge 
              variant="secondary"
              className="flex items-center gap-1 py-1.5"
            >
              <CalendarIcon2 className="h-3 w-3" />
              {formatDateRange()}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setDateRange(undefined)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentFiltersBar;

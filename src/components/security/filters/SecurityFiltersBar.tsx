
import React from 'react';
import { Search, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface SecurityFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  cardFilters: {
    activeCases: boolean;
    dataBreaches: boolean;
    complianceIssues: boolean;
  };
  priorityFilter: string | null;
  typeFilter: string | null;
  statusFilter: string | null;
  toggleCardFilter: (filterName: 'activeCases' | 'dataBreaches' | 'complianceIssues') => void;
  setPriorityFilter: (priority: string | null) => void;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  getTypeColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

const SecurityFiltersBar: React.FC<SecurityFiltersBarProps> = ({
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
  // Get date range text for display
  const getDateRangeText = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
    }
    if (dateRange?.from) {
      return `From ${format(dateRange.from, 'MMM dd, yyyy')}`;
    }
    if (dateRange?.to) {
      return `Until ${format(dateRange.to, 'MMM dd, yyyy')}`;
    }
    return '';
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Security Cases</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={resetFilters} className="h-8 flex items-center gap-1">
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-9 border-dashed flex gap-1",
                dateRange?.from && "text-primary"
              )}
            >
              <Calendar className="h-4 w-4" />
              {dateRange?.from ? (
                getDateRangeText()
              ) : (
                "Date Range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Active filter indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {cardFilters.activeCases && (
            <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
              Active Cases
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleCardFilter('activeCases')}
              />
            </Badge>
          )}
          {cardFilters.dataBreaches && (
            <Badge variant="outline" className="bg-red-50 flex items-center gap-1">
              Data Breaches
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleCardFilter('dataBreaches')}
              />
            </Badge>
          )}
          {cardFilters.complianceIssues && (
            <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
              Compliance Issues
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleCardFilter('complianceIssues')}
              />
            </Badge>
          )}
          {priorityFilter && (
            <Badge variant="outline" className={`flex items-center gap-1 ${getPriorityColor(priorityFilter)}`}>
              Priority: {priorityFilter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setPriorityFilter(null)}
              />
            </Badge>
          )}
          {typeFilter && (
            <Badge variant="outline" className={`flex items-center gap-1 ${getTypeColor(typeFilter)}`}>
              Type: {typeFilter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setTypeFilter(null)}
              />
            </Badge>
          )}
          {statusFilter && (
            <Badge className={`flex items-center gap-1 ${getStatusColor(statusFilter)}`}>
              Status: {statusFilter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setStatusFilter(null)}
              />
            </Badge>
          )}
          {dateRange?.from && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 flex items-center gap-1">
              Date: {getDateRangeText()}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setDateRange({ from: undefined, to: undefined })}
              />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
              Search: {searchQuery}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityFiltersBar;

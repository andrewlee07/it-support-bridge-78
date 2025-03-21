
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
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
  setPriorityFilter: (priority: string | null) => void;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
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
  setPriorityFilter,
  setTypeFilter,
  setStatusFilter,
  getTypeColor,
  getPriorityColor,
  getStatusColor
}) => {
  // Filter mapping for display purposes
  const filterDisplayMap: Record<string, string> = {
    'all': 'All Incidents',
    'active': 'Active Incidents',
    'critical': 'Critical Incidents',
    'pending': 'Pending Incidents'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Input 
          placeholder="Search incidents..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3"
        />
        <div className="flex flex-wrap gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* More filter buttons could be added here */}
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="h-9 text-muted-foreground"
            >
              <X className="mr-1 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {cardFilters.map(filter => (
            <Badge
              key={`card-${filter}`}
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {filterDisplayMap[filter] || filter}
              <button 
                className="ml-1 rounded-full hover:bg-blue-200 p-0.5"
                onClick={() => toggleCardFilter(filter)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {typeFilter && (
            <Badge 
              variant="outline" 
              className={getTypeColor(typeFilter)}
            >
              Type: {typeFilter}
              <button 
                className="ml-1 rounded-full hover:bg-opacity-20 hover:bg-black p-0.5"
                onClick={() => setTypeFilter(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {statusFilter && (
            <Badge className={getStatusColor(statusFilter)}>
              Status: {statusFilter}
              <button 
                className="ml-1 rounded-full hover:bg-opacity-20 hover:bg-black p-0.5"
                onClick={() => setStatusFilter(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {priorityFilter && (
            <Badge 
              variant="outline" 
              className={getPriorityColor(priorityFilter)}
            >
              Priority: {priorityFilter}
              <button 
                className="ml-1 rounded-full hover:bg-opacity-20 hover:bg-black p-0.5"
                onClick={() => setPriorityFilter(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {dateRange?.from && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              Date: {format(dateRange.from, "MMM d, yyyy")}
              {dateRange.to && ` - ${format(dateRange.to, "MMM d, yyyy")}`}
              <button 
                className="ml-1 rounded-full hover:bg-purple-200 p-0.5"
                onClick={() => setDateRange(undefined)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentFiltersBar;

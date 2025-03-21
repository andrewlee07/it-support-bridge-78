
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServiceRequestFiltersBarProps {
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

const ServiceRequestFiltersBar: React.FC<ServiceRequestFiltersBarProps> = ({
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
  const getFilterLabel = (filter: string) => {
    switch (filter) {
      case 'all':
        return 'All Requests';
      case 'active':
        return 'Active Requests';
      case 'high-priority':
        return 'High Priority';
      case 'pending-approval':
        return 'Pending Approval';
      default:
        return filter;
    }
  };

  const getFilterColor = (filter: string) => {
    switch (filter) {
      case 'all':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'active':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'high-priority':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'pending-approval':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={typeFilter || 'all'} onValueChange={(value) => setTypeFilter(value === 'all' ? null : value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Request Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="access">Access</SelectItem>
            <SelectItem value="software">Software</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="network">Network</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter || 'all'} onValueChange={(value) => setPriorityFilter(value === 'all' ? null : value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="P1">P1 (Critical)</SelectItem>
            <SelectItem value="P2">P2 (High)</SelectItem>
            <SelectItem value="P3">P3 (Medium)</SelectItem>
            <SelectItem value="P4">P4 (Low)</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-auto justify-start text-left font-normal",
                dateRange && "text-primary"
              )}
            >
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
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
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

        {hasActiveFilters && (
          <Button variant="ghost" onClick={resetFilters} className="w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {(cardFilters.length > 0 || typeFilter || statusFilter || priorityFilter || dateRange) && (
        <div className="flex flex-wrap gap-2 pt-2">
          {cardFilters.map((filter) => (
            <Badge
              key={filter}
              className={`${getFilterColor(filter)} cursor-pointer`}
              onClick={() => toggleCardFilter(filter)}
            >
              {getFilterLabel(filter)}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          
          {typeFilter && (
            <Badge
              className={`${getTypeColor(typeFilter)} cursor-pointer`}
              onClick={() => setTypeFilter(null)}
            >
              Type: {typeFilter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          
          {statusFilter && (
            <Badge
              className={`${getStatusColor(statusFilter)} cursor-pointer`}
              onClick={() => setStatusFilter(null)}
            >
              Status: {statusFilter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          
          {priorityFilter && (
            <Badge
              className={`${getPriorityColor(priorityFilter)} cursor-pointer`}
              onClick={() => setPriorityFilter(null)}
            >
              Priority: {priorityFilter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          
          {dateRange && (
            <Badge
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
              onClick={() => setDateRange(undefined)}
            >
              Date: {dateRange.from && format(dateRange.from, "MMM dd")}
              {dateRange.to && ` - ${format(dateRange.to, "MMM dd")}`}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceRequestFiltersBar;

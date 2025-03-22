
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  Filter
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface BugFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  severityFilter: string | null;
  setSeverityFilter: (severity: string | null) => void;
  priorityFilter: string | null;
  setPriorityFilter: (priority: string | null) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  statusOptions: string[];
  severityOptions: string[];
  priorityOptions: string[];
}

const BugFilters: React.FC<BugFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  severityFilter,
  setSeverityFilter,
  priorityFilter,
  setPriorityFilter,
  hasActiveFilters,
  resetFilters,
  statusOptions,
  severityOptions,
  priorityOptions
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bugs..."
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
        
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Status
              {statusFilter && <Badge variant="secondary" className="ml-2 px-1">{statusFilter}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map(status => (
              <DropdownMenuItem 
                key={status}
                onClick={() => setStatusFilter(status === statusFilter ? null : status)}
                className={statusFilter === status ? "bg-muted" : ""}
              >
                {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              Show All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Severity Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Severity
              {severityFilter && <Badge variant="secondary" className="ml-2 px-1">{severityFilter}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {severityOptions.map(severity => (
              <DropdownMenuItem 
                key={severity}
                onClick={() => setSeverityFilter(severity === severityFilter ? null : severity)}
                className={severityFilter === severity ? "bg-muted" : ""}
              >
                {severity.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSeverityFilter(null)}>
              Show All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Priority Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Priority
              {priorityFilter && <Badge variant="secondary" className="ml-2 px-1">{priorityFilter}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {priorityOptions.map(priority => (
              <DropdownMenuItem 
                key={priority}
                onClick={() => setPriorityFilter(priority === priorityFilter ? null : priority)}
                className={priorityFilter === priority ? "bg-muted" : ""}
              >
                {priority.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPriorityFilter(null)}>
              Show All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
          {statusFilter && (
            <Badge 
              className="flex items-center gap-1 py-1.5"
            >
              Status: {statusFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setStatusFilter(null)}
              />
            </Badge>
          )}
          
          {severityFilter && (
            <Badge 
              variant="secondary"
              className="flex items-center gap-1 py-1.5"
            >
              Severity: {severityFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setSeverityFilter(null)}
              />
            </Badge>
          )}
          
          {priorityFilter && (
            <Badge 
              variant="outline"
              className="flex items-center gap-1 py-1.5"
            >
              Priority: {priorityFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setPriorityFilter(null)}
              />
            </Badge>
          )}
          
          {searchQuery && (
            <Badge 
              variant="outline"
              className="flex items-center gap-1 py-1.5"
            >
              Search: "{searchQuery}"
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default BugFilters;

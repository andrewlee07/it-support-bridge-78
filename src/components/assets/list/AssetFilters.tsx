
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  Filter, 
  Calendar, 
  ArrowUpDown
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface AssetFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  typeFilter: string | null;
  setTypeFilter: (type: string | null) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  statusOptions: string[];
  typeOptions: string[];
}

const AssetFilters: React.FC<AssetFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  hasActiveFilters,
  resetFilters,
  statusOptions,
  typeOptions
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search assets..."
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
        
        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Type
              {typeFilter && <Badge variant="secondary" className="ml-2 px-1">{typeFilter}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {typeOptions.map(type => (
              <DropdownMenuItem 
                key={type}
                onClick={() => setTypeFilter(type === typeFilter ? null : type)}
                className={typeFilter === type ? "bg-muted" : ""}
              >
                {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTypeFilter(null)}>
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
          
          {typeFilter && (
            <Badge 
              variant="secondary"
              className="flex items-center gap-1 py-1.5"
            >
              Type: {typeFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setTypeFilter(null)}
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

export default AssetFilters;

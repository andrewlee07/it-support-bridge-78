
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
}

const FILTER_OPTIONS = [
  { label: 'Incidents', value: 'incident' },
  { label: 'Bugs', value: 'bug' },
  { label: 'Tests', value: 'testCase' },
  { label: 'Backlog', value: 'backlogItem' },
  { label: 'Releases', value: 'release' },
  { label: 'Assets', value: 'asset' },
  { label: 'Changes', value: 'change' }
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedFilters,
  toggleFilter,
  clearFilters
}) => {
  return (
    <div className="border-b px-3 py-2">
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Filter by:</span>
        {FILTER_OPTIONS.map(filter => (
          <Badge 
            key={filter.value}
            variant={selectedFilters.includes(filter.value) ? "default" : "outline"}
            onClick={() => toggleFilter(filter.value)}
            className="cursor-pointer"
          >
            {filter.label}
          </Badge>
        ))}
        
        {selectedFilters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-6 px-2"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;

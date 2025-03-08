
import React from 'react';
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { SearchResult } from '../types';
import { getIconForResultType } from '../../notifications/iconHelpers';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onSelectResult: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  query,
  onSelectResult
}) => {
  return (
    <CommandList>
      {isLoading ? (
        <div className="py-6 text-center">
          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
      ) : results.length === 0 ? (
        <CommandEmpty>
          {query.length < 2 
            ? "Type at least 2 characters to search" 
            : "No results found"}
        </CommandEmpty>
      ) : (
        <CommandGroup>
          {results.map((result) => (
            <CommandItem
              key={`${result.type}-${result.id}`}
              onSelect={() => onSelectResult(result)}
              className="py-2"
            >
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {getIconForResultType(result.type)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{result.title}</div>
                  {result.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {result.description}
                    </p>
                  )}
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-muted-foreground capitalize">
                      {result.type.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {result.status && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted">
                        {result.status}
                      </span>
                    )}
                    {result.priority && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted">
                        {result.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default SearchResults;

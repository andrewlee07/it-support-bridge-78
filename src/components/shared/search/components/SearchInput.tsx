
import React from 'react';
import { Search, X } from 'lucide-react';
import { CommandInput } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandInput
        placeholder="Search across all systems..."
        value={query}
        onValueChange={setQuery}
        className="flex-1 border-0 outline-none focus:ring-0"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuery('')}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;

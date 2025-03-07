
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ReleasesSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const ReleasesSearch: React.FC<ReleasesSearchProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search releases...",
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};

export default ReleasesSearch;

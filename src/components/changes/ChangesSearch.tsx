
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

interface ChangesSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChangesSearch: React.FC<ChangesSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search change requests..."
          value={searchQuery}
          onChange={onSearchChange}
          className="pl-8"
        />
      </div>
      <Button variant="outline" size="icon" title="Filter" className="shrink-0">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChangesSearch;

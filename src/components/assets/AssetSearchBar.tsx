
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface AssetSearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
}

const AssetSearchBar: React.FC<AssetSearchBarProps> = ({ onSearch, onFilter }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search assets..."
          className="pl-8"
          onChange={handleSearchChange}
        />
      </div>
      
      <Button variant="outline" className="shrink-0" onClick={onFilter}>
        Filter
      </Button>
    </div>
  );
};

export default AssetSearchBar;

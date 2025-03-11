
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ChannelSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ChannelSearchBar: React.FC<ChannelSearchBarProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative w-full md:w-1/3">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search channels..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ChannelSearchBar;

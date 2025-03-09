
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface UserSearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  activeFilter?: 'all' | 'active' | 'inactive';
  onFilterChange?: (filter: 'all' | 'active' | 'inactive') => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  activeFilter = 'all',
  onFilterChange 
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {onFilterChange && (
        <div className="flex items-center">
          <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && onFilterChange(value as 'all' | 'active' | 'inactive')}>
            <ToggleGroupItem value="all" className="text-xs">All Users</ToggleGroupItem>
            <ToggleGroupItem value="active" className="text-xs">Active</ToggleGroupItem>
            <ToggleGroupItem value="inactive" className="text-xs">Inactive</ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default UserSearchBar;

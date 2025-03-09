
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface UserSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: 'all' | 'active' | 'inactive';
  onFilterChange: (filter: 'all' | 'active' | 'inactive') => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ 
  searchTerm, 
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('all')}
          className="flex-1 sm:flex-none"
        >
          All
        </Button>
        <Button 
          variant={activeFilter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('active')}
          className="flex-1 sm:flex-none"
        >
          Active
        </Button>
        <Button 
          variant={activeFilter === 'inactive' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('inactive')}
          className="flex-1 sm:flex-none"
        >
          Inactive
        </Button>
      </div>
    </div>
  );
};

export default UserSearchBar;

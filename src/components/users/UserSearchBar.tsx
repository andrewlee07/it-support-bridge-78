
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchBarProps {
  onChange: (searchTerm: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ onChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="md:col-span-2 relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search users..."
        className="pl-8"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default UserSearchBar;

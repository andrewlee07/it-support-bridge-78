
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from 'lucide-react';

interface UserMFASearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

const UserMFASearch: React.FC<UserMFASearchProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name, email or department..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        onClick={onRefresh} 
        size="icon" 
        title="Refresh user list"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserMFASearch;

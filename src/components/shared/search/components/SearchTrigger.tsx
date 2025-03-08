
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearchProps } from '../types';

interface SearchTriggerProps extends GlobalSearchProps {
  onClick: () => void;
}

const SearchTrigger: React.FC<SearchTriggerProps> = ({ 
  placeholder = "Search across all systems...", 
  onClick 
}) => {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-between"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Search className="mr-2 h-4 w-4" />
        <span>{placeholder}</span>
      </div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};

export default SearchTrigger;
